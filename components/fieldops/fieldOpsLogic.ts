import type {
  FieldOpsMetrics,
  OrderFilters,
  OrderStatus,
  OrderTransition,
  RiskAssessment,
  ServiceOrder,
} from "./types";

const ORDER_STATUS_SEQUENCE: OrderStatus[] = ["Agendada", "Em deslocamento", "Em atendimento", "Concluída"];

export const EMPTY_FILTERS: OrderFilters = {
  search: "",
  status: "Todos",
  priority: "Todas",
  region: "Todas",
};

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}

export function assessDeadlineRisk(order: ServiceOrder): RiskAssessment {
  if (order.status === "Concluída") return { atRisk: false, score: 0, signals: [] };

  const signals: string[] = [];
  let score = 0;

  if (order.priority === "Urgente") {
    score += 3;
    signals.push("prioridade urgente (+3)");
  }
  if (order.hoursUntilDeadline <= 2) {
    score += 2;
    signals.push("prazo em até 2 horas (+2)");
  }
  if (order.stagnantHours >= 3) {
    score += 2;
    signals.push("sem atualização há 3 horas ou mais (+2)");
  }
  if (order.waitingMaterial && !order.materialReleased) {
    score += 2;
    signals.push("material aguardando liberação (+2)");
  }

  return { atRisk: score >= 3, score, signals };
}

export function calculateMetrics(orders: ServiceOrder[]): FieldOpsMetrics {
  return orders.reduce<FieldOpsMetrics>((metrics, order) => {
    if (order.status !== "Concluída") metrics.open += 1;
    if (order.status === "Em deslocamento") metrics.enRoute += 1;
    if (order.status === "Em atendimento") metrics.inService += 1;
    if (assessDeadlineRisk(order).atRisk) metrics.atRisk += 1;
    if (order.status === "Concluída") metrics.completed += 1;
    return metrics;
  }, { open: 0, enRoute: 0, inService: 0, atRisk: 0, completed: 0 });
}

export function filterOrders(orders: ServiceOrder[], filters: OrderFilters) {
  const query = normalize(filters.search);

  return orders.filter((order) => {
    const matchesQuery = !query || normalize(`${order.code} ${order.service}`).includes(query);
    const matchesStatus = filters.status === "Todos" || order.status === filters.status;
    const matchesPriority = filters.priority === "Todas" || order.priority === filters.priority;
    const matchesRegion = filters.region === "Todas" || order.region === filters.region;
    return matchesQuery && matchesStatus && matchesPriority && matchesRegion;
  });
}

export function getNextStatus(status: OrderStatus): OrderStatus | null {
  const index = ORDER_STATUS_SEQUENCE.indexOf(status);
  return index >= 0 && index < ORDER_STATUS_SEQUENCE.length - 1 ? ORDER_STATUS_SEQUENCE[index + 1] : null;
}

export function advanceOrder(order: ServiceOrder): OrderTransition {
  const nextStatus = getNextStatus(order.status);
  if (!nextStatus) return { order, message: `${order.code} já está concluída.`, changed: false };

  if (order.waitingMaterial && !order.materialReleased) {
    return {
      order,
      message: `Libere o material de ${order.code} antes de avançar a ordem.`,
      changed: false,
    };
  }

  const nextOrder: ServiceOrder = {
    ...order,
    status: nextStatus,
    stagnantHours: 0,
    history: [
      ...order.history,
      {
        id: `history-${order.id}-${order.history.length + 1}`,
        label: `Status alterado para ${nextStatus}`,
        detail: "Atualização registrada localmente nesta demonstração.",
        time: "Agora",
      },
    ],
  };

  return { order: nextOrder, message: `${order.code} avançou para ${nextStatus}.`, changed: true };
}

export function releaseOrderMaterial(order: ServiceOrder): OrderTransition {
  if (!order.waitingMaterial || order.materialReleased) {
    return { order, message: `${order.code} não possui material pendente.`, changed: false };
  }

  const nextOrder: ServiceOrder = {
    ...order,
    waitingMaterial: false,
    materialReleased: true,
    materials: order.materials.map((material) => ({ ...material, status: "Disponível" })),
    history: [
      ...order.history,
      {
        id: `history-${order.id}-${order.history.length + 1}`,
        label: "Material liberado",
        detail: "Pendência removida localmente; a ordem já pode avançar.",
        time: "Agora",
      },
    ],
  };

  return { order: nextOrder, message: `Material de ${order.code} liberado. A ordem pode avançar.`, changed: true };
}

export function getRecommendedAction(order: ServiceOrder) {
  if (order.waitingMaterial && !order.materialReleased) return "Liberar o material pendente";
  const nextStatus = getNextStatus(order.status);
  return nextStatus ? `Avançar para ${nextStatus}` : "Revisar o histórico do atendimento";
}
