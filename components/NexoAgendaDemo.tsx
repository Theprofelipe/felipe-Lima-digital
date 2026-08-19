"use client";

import { useMemo, useRef, useState } from "react";
import { createInitialActivities, createInitialBookings, createInitialWaitlist, professionals, services } from "./nexo-agenda/nexoAgendaData";
import {
  DEFAULT_FILTERS,
  buildReminderMessage,
  calculateAgendaMetrics,
  createActivity,
  createBooking,
  filterBookings,
  getDay,
  getService,
  getWaitlistMatches,
  updateBookingStatus,
} from "./nexo-agenda/nexoAgendaLogic";
import { NexoAgendaBookingForm } from "./nexo-agenda/NexoAgendaBookingForm";
import { NexoAgendaCalendar } from "./nexo-agenda/NexoAgendaCalendar";
import { NexoAgendaDetails } from "./nexo-agenda/NexoAgendaDetails";
import { NexoAgendaFilters } from "./nexo-agenda/NexoAgendaFilters";
import { NexoAgendaHeader } from "./nexo-agenda/NexoAgendaHeader";
import { NexoAgendaMetrics } from "./nexo-agenda/NexoAgendaMetrics";
import { NexoAgendaWaitlist } from "./nexo-agenda/NexoAgendaWaitlist";
import type { ActivityEntry, Booking, BookingCreationResult, BookingDraft, BookingFilters, BookingStatus, OpenOpportunity, TimeSlot, WaitlistEntry } from "./nexo-agenda/types";

const emptyDraft = (day: BookingFilters["day"]): BookingDraft => ({ clientName: "", contact: "", serviceId: "", professionalId: "", day, startTime: "", notes: "" });

async function copyWithFallback(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // The local fallback below keeps the demo useful when clipboard permission is unavailable.
    }
  }
  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  return copied;
}

export function NexoAgendaDemo() {
  const [bookings, setBookings] = useState<Booking[]>(createInitialBookings);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(createInitialWaitlist);
  const [activities, setActivities] = useState<ActivityEntry[]>(createInitialActivities);
  const [filters, setFilters] = useState<BookingFilters>(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusRequest, setFocusRequest] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [formRequest, setFormRequest] = useState(0);
  const [draftSeed, setDraftSeed] = useState<BookingDraft>(() => emptyDraft(DEFAULT_FILTERS.day));
  const [resetPending, setResetPending] = useState(false);
  const [feedback, setFeedback] = useState("Agenda demonstrativa pronta para explorar.");
  const [opportunity, setOpportunity] = useState<OpenOpportunity | null>(null);
  const [reminder, setReminder] = useState<{ bookingId: string; value: string } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [consideredWaitlistId, setConsideredWaitlistId] = useState<string | null>(null);
  const formOriginRef = useRef<HTMLElement | null>(null);

  const visibleBookings = useMemo(() => filterBookings(bookings, filters), [bookings, filters]);
  const metrics = useMemo(() => calculateAgendaMetrics(bookings, waitlist, filters.day, professionals.length), [bookings, filters.day, waitlist]);
  const selectedBooking = selectedId ? bookings.find((booking) => booking.id === selectedId) ?? null : null;
  const opportunityBooking = opportunity ? bookings.find((booking) => booking.id === opportunity.bookingId) ?? null : null;
  const waitlistMatches = opportunityBooking ? getWaitlistMatches(waitlist, opportunityBooking) : [];

  const addActivity = (label: string, detail: string, tone: ActivityEntry["tone"] = "neutral") => setActivities((current) => createActivity(current, label, detail, tone));

  const selectBooking = (bookingId: string) => {
    setSelectedId(bookingId);
    setFocusRequest((request) => request + 1);
    setFormOpen(false);
    setReminder(null);
    setCopyFeedback("");
    setConsideredWaitlistId(null);
  };

  const closeDetails = () => {
    const previousId = selectedId;
    setSelectedId(null);
    if (previousId) requestAnimationFrame(() => document.getElementById(`nexo-booking-${previousId}`)?.focus());
  };

  const openForm = (seed: BookingDraft, waitlistId: string | null = null) => {
    formOriginRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDraftSeed(seed);
    setFormRequest((request) => request + 1);
    setFormOpen(true);
    setSelectedId(null);
    setConsideredWaitlistId(waitlistId);
  };

  const closeForm = () => {
    const origin = formOriginRef.current;
    setFormOpen(false);
    setConsideredWaitlistId(null);
    requestAnimationFrame(() => { if (origin?.isConnected) origin.focus(); });
  };

  const openAvailableSlot = (professionalId: string, startTime: TimeSlot) => openForm({ ...emptyDraft(filters.day), professionalId, startTime });

  const submitBooking = (draft: BookingDraft): BookingCreationResult => {
    const result = createBooking(bookings, draft, services);
    setFeedback(result.message);
    if (!result.ok) return result;
    setBookings((current) => [...current, result.booking]);
    setFilters({ ...DEFAULT_FILTERS, day: result.booking.day });
    setSelectedId(result.booking.id);
    setFocusRequest((request) => request + 1);
    setFormOpen(false);
    const service = getService(services, result.booking.serviceId);
    if (consideredWaitlistId) {
      setWaitlist((current) => current.filter((entry) => entry.id !== consideredWaitlistId));
      setOpportunity(null);
      addActivity("Vaga preenchida pela lista de espera", `${result.booking.clientName} · ${service?.name} · ${result.booking.startTime}`, "positive");
    } else {
      addActivity("Agendamento criado", `${result.booking.clientName} · ${service?.name} · ${result.booking.startTime}`, "positive");
    }
    setConsideredWaitlistId(null);
    return result;
  };

  const changeStatus = (status: BookingStatus) => {
    if (!selectedBooking) return;
    const result = updateBookingStatus(selectedBooking, status);
    setFeedback(result.message);
    if (!result.changed) return;
    setBookings((current) => current.map((booking) => booking.id === result.booking.id ? result.booking : booking));
    setReminder(null);
    if (status === "Cancelado") {
      setOpportunity({ bookingId: result.booking.id, professionalId: result.booking.professionalId, serviceId: result.booking.serviceId, day: result.booking.day, startTime: result.booking.startTime });
      addActivity("Horário cancelado", `${result.booking.clientName} · ${getDay(result.booking.day).shortLabel}, ${result.booking.startTime}`, "attention");
    } else {
      addActivity("Status atualizado", `${result.booking.clientName} · ${status}`, "positive");
    }
  };

  const prepareReminder = () => {
    if (!selectedBooking) return;
    setReminder({ bookingId: selectedBooking.id, value: buildReminderMessage(selectedBooking, services, professionals) });
    setCopyFeedback("");
    addActivity("Lembrete preparado", `${selectedBooking.clientName} · nenhuma mensagem enviada`, "neutral");
    setFeedback("Prévia de lembrete preparada localmente.");
  };

  const copyReminder = async () => {
    if (!selectedBooking || reminder?.bookingId !== selectedBooking.id) return;
    const copied = await copyWithFallback(reminder.value);
    setCopyFeedback(copied ? "Mensagem copiada para a área de transferência." : "Não foi possível copiar automaticamente. Selecione o texto manualmente.");
  };

  const considerWaitlist = (entry: WaitlistEntry) => {
    if (!opportunity) return;
    openForm({ clientName: entry.clientName, contact: entry.contact, serviceId: entry.serviceId, professionalId: opportunity.professionalId, day: opportunity.day, startTime: opportunity.startTime, notes: "Cliente selecionado a partir da lista de espera fictícia." }, entry.id);
    setFeedback(`A reserva de ${entry.clientName} foi pré-preenchida para a vaga de ${opportunity.startTime}. Revise e confirme os dados.`);
  };

  const resetDemo = () => {
    setBookings(createInitialBookings());
    setWaitlist(createInitialWaitlist());
    setActivities(createInitialActivities());
    setFilters(DEFAULT_FILTERS);
    setSelectedId(null);
    setFocusRequest(0);
    setFormOpen(false);
    setDraftSeed(emptyDraft(DEFAULT_FILTERS.day));
    setOpportunity(null);
    setReminder(null);
    setCopyFeedback("");
    setConsideredWaitlistId(null);
    formOriginRef.current = null;
    setResetPending(false);
    setFeedback("Demonstração restaurada ao estado inicial.");
  };

  return (
    <div className="nexo-demo-shell">
      <NexoAgendaHeader resetPending={resetPending} onRequestReset={() => setResetPending(true)} onConfirmReset={resetDemo} onCancelReset={() => setResetPending(false)} />
      <div className="nexo-demo-content">
        <div className="nexo-demo-heading"><div><span>Visão operacional</span><h2>Agenda da Casa Lume</h2><p>Horários, confirmações e oportunidades em uma única rotina demonstrativa.</p></div><button type="button" onClick={() => openForm(emptyDraft(filters.day))}><span aria-hidden="true">+</span>Novo agendamento</button></div>
        <p className="nexo-feedback" role="status" aria-live="polite"><i aria-hidden="true" />{feedback}</p>
        <NexoAgendaMetrics metrics={metrics} />
        <NexoAgendaFilters filters={filters} resultCount={visibleBookings.length} professionals={professionals} services={services} onChange={setFilters} onReset={() => { setFilters(DEFAULT_FILTERS); setFeedback("Filtros restaurados para a visão inicial da agenda."); }} />
        <div className={`nexo-workspace ${selectedBooking || formOpen ? "has-panel" : ""}`}>
          <NexoAgendaCalendar bookings={bookings} visibleBookings={visibleBookings} filters={filters} professionals={professionals} services={services} selectedBookingId={selectedId} onDayChange={(day) => setFilters((current) => ({ ...current, day }))} onSelectBooking={selectBooking} onSelectSlot={openAvailableSlot} />
          {selectedBooking && <NexoAgendaDetails booking={selectedBooking} focusRequest={focusRequest} professionals={professionals} services={services} reminder={reminder?.bookingId === selectedBooking.id ? reminder.value : null} copyFeedback={copyFeedback} onClose={closeDetails} onStatusChange={changeStatus} onPrepareReminder={prepareReminder} onCopyReminder={copyReminder} />}
          <NexoAgendaBookingForm key={formRequest} open={formOpen} draftSeed={draftSeed} professionals={professionals} services={services} onClose={closeForm} onSubmit={submitBooking} />
        </div>
        <NexoAgendaWaitlist waitlist={waitlist} activities={activities} professionals={professionals} services={services} opportunity={opportunityBooking} matchingIds={waitlistMatches.map((entry) => entry.id)} onConsider={considerWaitlist} />
      </div>
    </div>
  );
}
