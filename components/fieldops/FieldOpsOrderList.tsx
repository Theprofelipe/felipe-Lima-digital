import { assessDeadlineRisk } from "./fieldOpsLogic";
import type { ServiceOrder } from "./types";

type FieldOpsOrderListProps = {
  orders: ServiceOrder[];
  selectedId: string | null;
  onSelect: (orderId: string) => void;
};

function tone(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").replaceAll(" ", "-");
}

export function FieldOpsOrderList({ orders, selectedId, onSelect }: FieldOpsOrderListProps) {
  if (!orders.length) {
    return (
      <div className="fieldops-empty-state" role="status">
        <span aria-hidden="true">⌕</span>
        <strong>Nenhuma ordem encontrada</strong>
        <p>Ajuste a busca ou limpe os filtros para rever a operação completa.</p>
      </div>
    );
  }

  return (
    <div className="fieldops-order-list" aria-label="Lista de ordens de serviço">
      {orders.map((order) => {
        const risk = assessDeadlineRisk(order);
        return (
          <button
            className={selectedId === order.id ? "is-selected" : ""}
            id={`fieldops-order-${order.id}`}
            type="button"
            key={order.id}
            onClick={() => onSelect(order.id)}
            aria-pressed={selectedId === order.id}
            aria-controls="fieldops-order-details"
          >
            <span className="fieldops-order-main">
              <span className="fieldops-order-code">{order.code}</span>
              <strong>{order.service}</strong>
              <small>{order.technician} · Região {order.region}</small>
            </span>
            <span className="fieldops-order-tags">
              <i className={`is-${tone(order.status)}`}>{order.status}</i>
              <i className={`is-${tone(order.priority)}`}>{order.priority}</i>
              {risk.atRisk && <i className="is-risk">Risco · {risk.score} pts</i>}
            </span>
            <span className="fieldops-order-deadline">
              <small>Prazo</small>
              <strong>{order.deadlineLabel}</strong>
              <i aria-hidden="true">→</i>
            </span>
          </button>
        );
      })}
    </div>
  );
}
