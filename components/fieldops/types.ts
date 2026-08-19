export const ORDER_STATUSES = ["Agendada", "Em deslocamento", "Em atendimento", "Concluída"] as const;
export const ORDER_PRIORITIES = ["Baixa", "Normal", "Alta", "Urgente"] as const;
export const ORDER_REGIONS = ["Centro", "Leste", "Norte", "Oeste", "Sul"] as const;

export type OrderStatus = typeof ORDER_STATUSES[number];
export type OrderPriority = typeof ORDER_PRIORITIES[number];
export type OrderRegion = typeof ORDER_REGIONS[number];

export type ChecklistItem = {
  id: string;
  label: string;
  complete: boolean;
};

export type MaterialItem = {
  id: string;
  label: string;
  status: "Disponível" | "Aguardando liberação";
};

export type OrderHistoryEntry = {
  id: string;
  label: string;
  detail: string;
  time: string;
};

export type ServiceOrder = {
  id: string;
  code: string;
  service: string;
  description: string;
  technician: string;
  region: OrderRegion;
  priority: OrderPriority;
  status: OrderStatus;
  deadlineLabel: string;
  hoursUntilDeadline: number;
  stagnantHours: number;
  waitingMaterial: boolean;
  materialReleased: boolean;
  notes: string;
  checklist: ChecklistItem[];
  materials: MaterialItem[];
  history: OrderHistoryEntry[];
};

export type OrderFilters = {
  search: string;
  status: OrderStatus | "Todos";
  priority: OrderPriority | "Todas";
  region: OrderRegion | "Todas";
};

export type FieldOpsMetrics = {
  open: number;
  enRoute: number;
  inService: number;
  atRisk: number;
  completed: number;
};

export type RiskAssessment = {
  atRisk: boolean;
  score: number;
  signals: string[];
};

export type OrderTransition = {
  order: ServiceOrder;
  message: string;
  changed: boolean;
};
