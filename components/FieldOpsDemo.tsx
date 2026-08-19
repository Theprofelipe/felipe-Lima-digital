"use client";

import { useMemo, useState } from "react";
import { createInitialOrders } from "./fieldops/fieldOpsData";
import { FieldOpsFilters } from "./fieldops/FieldOpsFilters";
import { EMPTY_FILTERS, advanceOrder, calculateMetrics, filterOrders, releaseOrderMaterial } from "./fieldops/fieldOpsLogic";
import { FieldOpsMetrics } from "./fieldops/FieldOpsMetrics";
import { FieldOpsOrderDetails } from "./fieldops/FieldOpsOrderDetails";
import { FieldOpsOrderList } from "./fieldops/FieldOpsOrderList";
import type { OrderFilters, OrderTransition, ServiceOrder } from "./fieldops/types";

export function FieldOpsDemo() {
  const [orders, setOrders] = useState<ServiceOrder[]>(createInitialOrders);
  const [filters, setFilters] = useState<OrderFilters>(EMPTY_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusRequest, setFocusRequest] = useState(0);
  const [feedback, setFeedback] = useState("Painel demonstrativo pronto.");
  const visibleOrders = useMemo(() => filterOrders(orders, filters), [filters, orders]);
  const metrics = useMemo(() => calculateMetrics(orders), [orders]);
  const selectedOrder = selectedId ? orders.find((order) => order.id === selectedId) ?? null : null;

  const selectOrder = (orderId: string) => {
    setSelectedId(orderId);
    setFocusRequest((request) => request + 1);
  };

  const closeDetails = () => {
    const previousId = selectedId;
    setSelectedId(null);
    if (previousId) requestAnimationFrame(() => document.getElementById(`fieldops-order-${previousId}`)?.focus());
  };

  const applyTransition = (transition: (order: ServiceOrder) => OrderTransition) => {
    if (!selectedOrder) return;
    const result = transition(selectedOrder);
    setFeedback(result.message);
    if (result.changed) setOrders((current) => current.map((order) => order.id === result.order.id ? result.order : order));
  };

  const resetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setFeedback("Filtros removidos. Todas as ordens estão visíveis.");
  };

  const resetDemo = () => {
    setOrders(createInitialOrders());
    setFilters(EMPTY_FILTERS);
    setSelectedId(null);
    setFeedback("Demonstração restaurada ao estado inicial.");
  };

  return (
    <div className="fieldops-demo-shell">
      <div className="fieldops-demo-topbar">
        <div><span className="fieldops-live-dot" aria-hidden="true" />Painel operacional</div>
        <div><span>Dados fictícios</span><button type="button" onClick={resetDemo}>Restaurar demonstração</button></div>
      </div>

      <div className="fieldops-demo-content">
        <div className="fieldops-demo-heading">
          <div><span>Visão geral · Hoje</span><h2>Operação em campo</h2><p>Acompanhe ordens, prioridades e próximos passos em uma única visão.</p></div>
          <div><i aria-hidden="true" />Atualização local</div>
        </div>

        <FieldOpsMetrics metrics={metrics} />
        <FieldOpsFilters filters={filters} resultCount={visibleOrders.length} onChange={setFilters} onReset={resetFilters} />

        <div className={`fieldops-workspace ${selectedOrder ? "has-details" : ""}`}>
          <FieldOpsOrderList orders={visibleOrders} selectedId={selectedId} onSelect={selectOrder} />
          {selectedOrder && (
            <FieldOpsOrderDetails
              order={selectedOrder}
              focusRequest={focusRequest}
              onClose={closeDetails}
              onAdvance={() => applyTransition(advanceOrder)}
              onReleaseMaterial={() => applyTransition(releaseOrderMaterial)}
            />
          )}
        </div>
        <p className="fieldops-feedback" role="status" aria-live="polite">{feedback}</p>
      </div>
    </div>
  );
}
