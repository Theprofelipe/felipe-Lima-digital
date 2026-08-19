import type { BookingHistoryEntry } from "./types";

function eventTone(entry: BookingHistoryEntry) {
  const value = `${entry.label} ${entry.detail}`.toLocaleLowerCase("pt-BR");
  if (value.includes("cancel") || value.includes("ausência") || value.includes("não compareceu")) return "attention";
  if (value.includes("confirm") || value.includes("conclu") || value.includes("iniciado")) return "positive";
  return "neutral";
}

export function NexoAgendaTimeline({ history }: { history: BookingHistoryEntry[] }) {
  return (
    <ol className="nexo-timeline" aria-label="Histórico do agendamento, do evento mais recente ao mais antigo">
      {[...history].reverse().map((entry, index) => (
        <li className={`${index === 0 ? "is-current" : ""} is-${eventTone(entry)}`} key={entry.id}>
          <i aria-hidden="true" />
          <div><strong>{entry.label}</strong><p>{entry.detail}</p></div>
          <time>{entry.time}</time>
        </li>
      ))}
    </ol>
  );
}
