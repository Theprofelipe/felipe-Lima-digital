import type { FieldOpsMetrics as Metrics } from "./types";

const cards = [
  { key: "open", label: "Em aberto", detail: "ordens ativas" },
  { key: "enRoute", label: "Em deslocamento", detail: "equipes em rota" },
  { key: "inService", label: "Em atendimento", detail: "execuções ativas" },
  { key: "atRisk", label: "Risco de prazo", detail: "regra demonstrativa", alert: true },
  { key: "completed", label: "Concluídas", detail: "encerradas hoje" },
] as const;

export function FieldOpsMetrics({ metrics }: { metrics: Metrics }) {
  return (
    <section className="fieldops-metrics" aria-label="Indicadores derivados das ordens de serviço">
      {cards.map((card) => (
        <article className={"alert" in card && card.alert ? "is-alert" : ""} key={card.key}>
          <span>{card.label}</span>
          <strong>{String(metrics[card.key]).padStart(2, "0")}</strong>
          <small>{card.detail}</small>
        </article>
      ))}
    </section>
  );
}
