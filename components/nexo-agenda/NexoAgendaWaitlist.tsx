import { getDay, getProfessional, getService } from "./nexoAgendaLogic";
import type { ActivityEntry, AgendaService, Booking, Professional, WaitlistEntry } from "./types";

type NexoAgendaWaitlistProps = {
  waitlist: WaitlistEntry[];
  activities: ActivityEntry[];
  professionals: Professional[];
  services: AgendaService[];
  opportunity: Booking | null;
  matchingIds: string[];
  onConsider: (entry: WaitlistEntry) => void;
};

export function NexoAgendaWaitlist({ waitlist, activities, professionals, services, opportunity, matchingIds, onConsider }: NexoAgendaWaitlistProps) {
  const opportunityService = opportunity ? getService(services, opportunity.serviceId) : null;
  const opportunityProfessional = opportunity ? getProfessional(professionals, opportunity.professionalId) : null;
  const opportunityDay = opportunity ? getDay(opportunity.day) : null;

  return (
    <div className="nexo-operations-grid">
      <section className="nexo-waitlist" aria-labelledby="nexo-waitlist-title">
        <header><div><span>Lista de espera</span><h3 id="nexo-waitlist-title">Oportunidades de encaixe</h3></div><strong>{waitlist.length}</strong></header>
        {opportunity ? (
          <div className="nexo-opportunity" role="status"><span>Horário liberado</span><strong>{opportunityDay?.shortLabel}, {opportunity.startTime} · {opportunityProfessional?.name}</strong><small>{opportunityService?.name} · {matchingIds.length} {matchingIds.length === 1 ? "pessoa compatível" : "pessoas compatíveis"}</small></div>
        ) : (
          <p className="nexo-waitlist-empty-note">Cancele um horário na demonstração para comparar a disponibilidade com as preferências da lista.</p>
        )}
        <div className="nexo-waitlist-list">
          {waitlist.map((entry) => {
            const service = getService(services, entry.serviceId);
            const professional = entry.preferredProfessionalId === "Qualquer profissional" ? null : getProfessional(professionals, entry.preferredProfessionalId);
            const preferredDay = entry.preferredDay === "Qualquer dia" ? "Qualquer dia" : getDay(entry.preferredDay).shortLabel;
            const matches = matchingIds.includes(entry.id);
            return (
              <article className={matches ? "is-match" : ""} key={entry.id}>
                <span aria-hidden="true">{entry.clientName.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                <div><strong>{entry.clientName}</strong><small>{service?.name}</small><p>{professional?.name ?? "Qualquer profissional"} · {preferredDay} · {entry.preferredPeriod}</p><em>{matches ? "Compatível com a vaga liberada" : entry.createdLabel}</em></div>
                {matches && <button type="button" onClick={() => onConsider(entry)}>Considerar neste horário</button>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="nexo-activity" aria-labelledby="nexo-activity-title">
        <header><span>Movimento local</span><h3 id="nexo-activity-title">Histórico da operação</h3></header>
        <ol>
          {activities.map((activity) => <li className={`is-${activity.tone}`} key={activity.id}><i aria-hidden="true" /><div><small>{activity.tone === "attention" ? "Atenção" : activity.tone === "positive" ? "Atualização" : "Registro"}</small><strong>{activity.label}</strong><p>{activity.detail}</p></div><time>{activity.time}</time></li>)}
        </ol>
      </section>
    </div>
  );
}
