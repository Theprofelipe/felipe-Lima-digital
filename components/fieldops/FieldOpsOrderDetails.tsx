"use client";

import { useEffect, useRef } from "react";
import { assessDeadlineRisk, getNextStatus, getRecommendedAction } from "./fieldOpsLogic";
import { FieldOpsTimeline } from "./FieldOpsTimeline";
import { ORDER_STATUSES } from "./types";
import type { ServiceOrder } from "./types";

type FieldOpsOrderDetailsProps = {
  order: ServiceOrder;
  focusRequest: number;
  onClose: () => void;
  onAdvance: () => void;
  onReleaseMaterial: () => void;
};

export function FieldOpsOrderDetails({ order, focusRequest, onClose, onAdvance, onReleaseMaterial }: FieldOpsOrderDetailsProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const risk = assessDeadlineRisk(order);
  const nextStatus = getNextStatus(order.status);

  useEffect(() => {
    if (focusRequest > 0) headingRef.current?.focus();
  }, [focusRequest]);

  return (
    <aside className="fieldops-details" id="fieldops-order-details" aria-labelledby="fieldops-details-title">
      <header>
        <div><span>Detalhes da ordem</span><strong>{order.code}</strong></div>
        <button type="button" onClick={onClose} aria-label={`Fechar detalhes de ${order.code}`}>×</button>
      </header>

      <div className="fieldops-details-body">
        <div className="fieldops-details-title">
          <span>{order.status}</span>
          <h3 id="fieldops-details-title" tabIndex={-1} ref={headingRef}>{order.service}</h3>
          <p>{order.description}</p>
        </div>

        <dl className="fieldops-order-facts">
          <div><dt>Equipe</dt><dd>{order.technician}</dd></div>
          <div><dt>Região</dt><dd>{order.region}</dd></div>
          <div><dt>Prioridade</dt><dd>{order.priority}</dd></div>
          <div><dt>Prazo</dt><dd>{order.deadlineLabel}</dd></div>
        </dl>

        <section className={`fieldops-risk-card ${risk.atRisk ? "is-active" : ""}`}>
          <div><span>Regra de risco transparente</span><strong>{risk.atRisk ? `Risco identificado · ${risk.score} pontos` : "Sem risco no momento"}</strong></div>
          {risk.signals.length > 0
            ? <ul>{risk.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul>
            : <p>Nenhum sinal da regra demonstrativa está ativo para esta ordem.</p>}
          <small>A ordem entra em risco ao somar 3 pontos ou mais.</small>
        </section>

        <section className="fieldops-progress" aria-label="Progresso do atendimento">
          <span>Progresso do atendimento</span>
          <ol>
            {ORDER_STATUSES.map((status, index) => {
              const currentIndex = ORDER_STATUSES.indexOf(order.status);
              return <li className={index < currentIndex ? "is-complete" : index === currentIndex ? "is-current" : ""} key={status}><i>{index < currentIndex ? "✓" : index + 1}</i><span>{status}</span></li>;
            })}
          </ol>
        </section>

        <section className="fieldops-operational-grid">
          <div>
            <span>Checklist</span>
            <ul className="fieldops-checklist">{order.checklist.map((item) => <li className={item.complete ? "is-complete" : ""} key={item.id}><i aria-hidden="true">{item.complete ? "✓" : ""}</i>{item.label}</li>)}</ul>
          </div>
          <div>
            <span>Materiais</span>
            <ul className="fieldops-materials">{order.materials.map((item) => <li key={item.id}><span>{item.label}</span><small className={item.status === "Disponível" ? "is-ready" : ""}>{item.status}</small></li>)}</ul>
          </div>
        </section>

        <section className="fieldops-note"><span>Observações</span><p>{order.notes}</p></section>

        <section className="fieldops-history"><span>Histórico da operação</span><FieldOpsTimeline history={order.history} /></section>

        <section className="fieldops-next-action">
          <span>Próxima ação recomendada</span>
          <strong>{getRecommendedAction(order)}</strong>
          <div>
            {order.waitingMaterial && !order.materialReleased && <button className="fieldops-release-button" type="button" onClick={onReleaseMaterial}>Liberar material</button>}
            {nextStatus && <button className="fieldops-advance-button" type="button" onClick={onAdvance}>Avançar para {nextStatus} <i aria-hidden="true">→</i></button>}
            {!nextStatus && <span className="fieldops-complete-note"><i aria-hidden="true">✓</i> Atendimento encerrado</span>}
          </div>
        </section>
      </div>
    </aside>
  );
}
