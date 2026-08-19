"use client";

import { useEffect, useRef } from "react";
import { getAllowedStatusTransitions, getDay, getProfessional, getService, getStatusTone } from "./nexoAgendaLogic";
import { NexoAgendaTimeline } from "./NexoAgendaTimeline";
import type { AgendaService, Booking, BookingStatus, Professional } from "./types";

type NexoAgendaDetailsProps = {
  booking: Booking;
  focusRequest: number;
  professionals: Professional[];
  services: AgendaService[];
  reminder: string | null;
  copyFeedback: string;
  onClose: () => void;
  onStatusChange: (status: BookingStatus) => void;
  onPrepareReminder: () => void;
  onCopyReminder: () => void;
};

function suggestedAction(status: BookingStatus) {
  if (status === "Pendente") return "Confirmar o horário com o cliente";
  if (status === "Confirmado") return "Iniciar o atendimento no horário previsto";
  if (status === "Em atendimento") return "Concluir o atendimento e registrar o encerramento";
  if (status === "Concluído") return "Revisar o histórico do atendimento";
  if (status === "Cancelado") return "Consultar a lista de espera para ocupar o horário";
  return "Registrar uma nova tentativa de contato, se fizer sentido";
}

function transitionLabel(status: BookingStatus) {
  if (status === "Confirmado") return "Confirmar presença";
  if (status === "Em atendimento") return "Iniciar atendimento";
  if (status === "Concluído") return "Concluir atendimento";
  if (status === "Cancelado") return "Cancelar horário";
  if (status === "Não compareceu") return "Registrar falta";
  return `Marcar como ${status}`;
}

export function NexoAgendaDetails({ booking, focusRequest, professionals, services, reminder, copyFeedback, onClose, onStatusChange, onPrepareReminder, onCopyReminder }: NexoAgendaDetailsProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const service = getService(services, booking.serviceId);
  const professional = getProfessional(professionals, booking.professionalId);
  const day = getDay(booking.day);
  const transitions = getAllowedStatusTransitions(booking.status);

  useEffect(() => {
    if (focusRequest > 0) headingRef.current?.focus();
  }, [focusRequest]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <aside className="nexo-details" id="nexo-booking-details" aria-labelledby="nexo-details-title">
      <header><div><span>Detalhes do agendamento</span><strong>{booking.id.toUpperCase()}</strong></div><button type="button" onClick={onClose} aria-label={`Fechar detalhes de ${booking.clientName}`}>×</button></header>
      <div className="nexo-details-body">
        <div className="nexo-details-title"><span className={`is-${getStatusTone(booking.status)}`}><i aria-hidden="true" />{booking.status}</span><h3 id="nexo-details-title" tabIndex={-1} ref={headingRef}>{booking.clientName}</h3><p>{service?.name}</p></div>
        <dl className="nexo-booking-facts">
          <div><dt>Serviço</dt><dd>{service?.name}</dd></div>
          <div><dt>Profissional</dt><dd>{professional?.name}</dd></div>
          <div><dt>Data</dt><dd>{day.label}, {day.dateLabel}</dd></div>
          <div><dt>Horário</dt><dd>{booking.startTime}</dd></div>
          <div><dt>Duração</dt><dd>{service?.durationMinutes} minutos</dd></div>
          <div><dt>Valor demonstrativo</dt><dd>{service ? service.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "—"}</dd></div>
        </dl>
        <section className="nexo-contact-card"><span>Contato fictício</span><strong>{booking.contact}</strong><small>Informação exibida apenas nesta sessão local.</small></section>
        <section className="nexo-detail-note"><span>Observações</span><p>{booking.notes || "Nenhuma observação registrada para este atendimento."}</p></section>
        <section className="nexo-status-flow" aria-labelledby="nexo-status-title">
          <div><span id="nexo-status-title">Ações do atendimento</span><small>Estado atual: {booking.status}</small></div>
          {transitions.length > 0 ? <div>{transitions.map((status) => <button className={status === "Cancelado" || status === "Não compareceu" ? "is-caution" : ""} type="button" onClick={() => onStatusChange(status)} key={status}>{transitionLabel(status)}</button>)}</div> : <p>O fluxo foi encerrado neste status. Mudanças contraditórias continuam bloqueadas para preservar o histórico.</p>}
        </section>
        <section className="nexo-reminder">
          <div><span>Prévia de lembrete</span><small>Nenhuma mensagem é enviada</small></div>
          {!reminder ? <button type="button" onClick={onPrepareReminder}>Preparar lembrete</button> : <><pre>{reminder}</pre><button type="button" onClick={onCopyReminder}>Copiar mensagem</button><small role="status" aria-live="polite">{copyFeedback}</small></>}
        </section>
        <section className="nexo-history"><span>Histórico do atendimento</span><NexoAgendaTimeline history={booking.history} /></section>
        <section className="nexo-next-action"><span>Próxima ação sugerida</span><strong>{suggestedAction(booking.status)}</strong></section>
      </div>
    </aside>
  );
}
