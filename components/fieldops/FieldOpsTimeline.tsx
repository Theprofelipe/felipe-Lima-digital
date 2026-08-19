import type { OrderHistoryEntry } from "./types";

export function FieldOpsTimeline({ history }: { history: OrderHistoryEntry[] }) {
  return (
    <ol className="fieldops-timeline" aria-label="Histórico da ordem">
      {[...history].reverse().map((entry, index) => (
        <li className={index === 0 ? "is-current" : ""} key={entry.id}>
          <i aria-hidden="true" />
          <div><strong>{entry.label}</strong><p>{entry.detail}</p></div>
          <time>{entry.time}</time>
        </li>
      ))}
    </ol>
  );
}
