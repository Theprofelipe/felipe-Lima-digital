import type { AgendaMetrics } from "./types";

const cards = [
  { key: "scheduledToday", label: "Agenda do dia", detail: "horários ativos", tone: "primary" },
  { key: "confirmedToday", label: "Confirmados", detail: "inclui atendimentos em curso", tone: "positive" },
  { key: "occupancyRate", label: "Ocupação", detail: "da capacidade do dia", suffix: "%", tone: "neutral" },
  { key: "cancelledOrMissed", label: "Cancelamentos e faltas", detail: "acumulado da semana", tone: "attention" },
  { key: "waitlistCount", label: "Lista de espera", detail: "pessoas aguardando", tone: "neutral" },
] as const;

export function NexoAgendaMetrics({ metrics }: { metrics: AgendaMetrics }) {
  return (
    <section className="nexo-metrics" aria-label="Indicadores da agenda">
      <h3 className="nexo-visually-hidden">Indicadores atualizados da agenda</h3>
      {cards.map((card) => (
        <article className={`is-${card.tone}`} key={card.key}>
          <span>{card.label}</span>
          <strong aria-live="polite">{String(metrics[card.key]).padStart(2, "0")}{"suffix" in card ? card.suffix : ""}</strong>
          <small>{card.detail}</small>
        </article>
      ))}
    </section>
  );
}
