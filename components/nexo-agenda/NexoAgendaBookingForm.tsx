"use client";

import { useEffect, useRef, useState } from "react";
import { TIME_SLOTS, WEEK_DAYS, getDay, getProfessional, getService } from "./nexoAgendaLogic";
import type { AgendaService, BookingCreationResult, BookingDraft, BookingValidationErrors, Professional } from "./types";

type NexoAgendaBookingFormProps = {
  open: boolean;
  draftSeed: BookingDraft;
  professionals: Professional[];
  services: AgendaService[];
  onClose: () => void;
  onSubmit: (draft: BookingDraft) => BookingCreationResult;
};

export function NexoAgendaBookingForm({ open, draftSeed, professionals, services, onClose, onSubmit }: NexoAgendaBookingFormProps) {
  const [draft, setDraft] = useState<BookingDraft>(draftSeed);
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [closePending, setClosePending] = useState(false);
  const firstControlRef = useRef<HTMLSelectElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const hasMeaningfulData = [draft.clientName, draft.contact, draft.serviceId, draft.professionalId, draft.startTime, draft.notes]
    .some((value) => value.trim().length > 0);

  useEffect(() => {
    if (open) firstControlRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (closePending) continueButtonRef.current?.focus();
  }, [closePending]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || document.querySelector(".nexo-reset-confirmation")) return;
      if (closePending) setClosePending(false);
      else if (hasMeaningfulData) setClosePending(true);
      else onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [closePending, hasMeaningfulData, onClose, open]);

  if (!open) return null;

  const day = getDay(draft.day);
  const service = getService(services, draft.serviceId);
  const professional = getProfessional(professionals, draft.professionalId);

  const requestClose = () => {
    if (hasMeaningfulData) setClosePending(true);
    else onClose();
  };

  const update = <Key extends keyof BookingDraft>(key: Key, value: BookingDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, conflict: undefined }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = onSubmit(draft);
    if (!result.ok) setErrors(result.errors);
  };

  const errorSummary = Object.entries(errors).find(([key, value]) => key !== "conflict" && Boolean(value))?.[1] ?? errors.conflict;

  return (
    <aside className="nexo-booking-panel" role="dialog" aria-modal="false" aria-labelledby="nexo-booking-form-title" aria-describedby="nexo-booking-form-description">
      <header><div><span>Novo agendamento</span><h3 id="nexo-booking-form-title">Reservar horário</h3></div><button type="button" onClick={requestClose} aria-label="Fechar formulário de agendamento">×</button></header>
      <form onSubmit={submit} noValidate>
        <p id="nexo-booking-form-description">Organize a reserva com dados fictícios. Nada será enviado ou armazenado.</p>
        <div className="nexo-form-context" aria-live="polite">
          <span><small>Data</small><strong>{day.shortLabel}, {day.dateLabel}</strong></span>
          <span><small>Horário</small><strong>{draft.startTime || "A definir"}</strong></span>
          <span><small>Atendimento</small><strong>{service?.name ?? professional?.name ?? "Selecione o serviço"}</strong></span>
        </div>
        {closePending && (
          <div className="nexo-discard-confirmation" role="alertdialog" aria-labelledby="nexo-discard-title" aria-describedby="nexo-discard-description">
            <div><strong id="nexo-discard-title">Descartar este preenchimento?</strong><p id="nexo-discard-description">Os dados digitados ou o horário selecionado serão perdidos.</p></div>
            <div><button ref={continueButtonRef} type="button" onClick={() => setClosePending(false)}>Continuar editando</button><button type="button" onClick={onClose}>Descartar</button></div>
          </div>
        )}
        {errorSummary && <div className="nexo-form-alert" role="alert"><strong>Não foi possível criar o agendamento.</strong><span>{errorSummary}</span></div>}
        <div className="nexo-form-grid">
          <label><span>Serviço <i>*</i></span><select ref={firstControlRef} value={draft.serviceId} onChange={(event) => update("serviceId", event.target.value)} aria-invalid={Boolean(errors.serviceId)} aria-describedby={errors.serviceId ? "nexo-error-service" : undefined}><option value="">Selecione</option>{services.map((item) => <option value={item.id} key={item.id}>{item.name} · {item.durationMinutes} min</option>)}</select>{errors.serviceId && <small id="nexo-error-service">{errors.serviceId}</small>}</label>
          <label><span>Profissional <i>*</i></span><select value={draft.professionalId} onChange={(event) => update("professionalId", event.target.value)} aria-invalid={Boolean(errors.professionalId)} aria-describedby={errors.professionalId ? "nexo-error-professional" : undefined}><option value="">Selecione</option>{professionals.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select>{errors.professionalId && <small id="nexo-error-professional">{errors.professionalId}</small>}</label>
          <label><span>Data <i>*</i></span><select value={draft.day} onChange={(event) => update("day", event.target.value as BookingDraft["day"])}>{WEEK_DAYS.map((item) => <option value={item.id} key={item.id}>{item.label} · {item.dateLabel}</option>)}</select></label>
          <label><span>Horário <i>*</i></span><select value={draft.startTime} onChange={(event) => update("startTime", event.target.value as BookingDraft["startTime"])} aria-invalid={Boolean(errors.startTime || errors.conflict)} aria-describedby={errors.startTime ? "nexo-error-time" : errors.conflict ? "nexo-conflict-description" : undefined}><option value="">Selecione</option>{TIME_SLOTS.map((time) => <option key={time}>{time}</option>)}</select>{errors.startTime && <small id="nexo-error-time">{errors.startTime}</small>}</label>
          <label className="is-wide"><span>Nome do cliente <i>*</i></span><input value={draft.clientName} onChange={(event) => update("clientName", event.target.value)} aria-invalid={Boolean(errors.clientName)} aria-describedby={errors.clientName ? "nexo-error-client" : undefined} placeholder="Ex.: Cliente de demonstração" />{errors.clientName && <small id="nexo-error-client">{errors.clientName}</small>}</label>
          <label className="is-wide"><span>Contato fictício <i>*</i></span><input value={draft.contact} onChange={(event) => update("contact", event.target.value)} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "nexo-error-contact" : undefined} placeholder="Ex.: Canal fictício · referência 11" />{errors.contact && <small id="nexo-error-contact">{errors.contact}</small>}</label>
          <label className="is-wide"><span>Observação opcional</span><textarea value={draft.notes} onChange={(event) => update("notes", event.target.value)} rows={3} placeholder="Preferências ou contexto fictício do atendimento" /></label>
        </div>
        {errors.conflict && <div className="nexo-conflict-note" id="nexo-conflict-description" role="alert"><strong>Conflito de agenda</strong><span>{errors.conflict}</span></div>}
        <div className="nexo-form-actions"><button type="button" onClick={requestClose}>Cancelar</button><button type="submit">Criar agendamento <span aria-hidden="true">→</span></button></div>
      </form>
    </aside>
  );
}
