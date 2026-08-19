import type {
  ActivityEntry,
  AgendaMetrics,
  AgendaService,
  Booking,
  BookingCreationResult,
  BookingDraft,
  BookingFilters,
  BookingStatus,
  BookingValidationErrors,
  DayId,
  Professional,
  StatusTransitionResult,
  WaitlistEntry,
} from "./types";

export const WEEK_DAYS = [
  { id: "seg", shortLabel: "Seg", label: "Segunda-feira", dateLabel: "18 ago" },
  { id: "ter", shortLabel: "Ter", label: "Terça-feira", dateLabel: "19 ago" },
  { id: "qua", shortLabel: "Qua", label: "Quarta-feira", dateLabel: "20 ago" },
  { id: "qui", shortLabel: "Qui", label: "Quinta-feira", dateLabel: "21 ago" },
  { id: "sex", shortLabel: "Sex", label: "Sexta-feira", dateLabel: "22 ago" },
] as const;

export const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "13:30", "14:30", "15:30", "16:30"] as const;

export const DEFAULT_DAY: DayId = "qua";

export const DEFAULT_FILTERS: BookingFilters = {
  professionalId: "Todos",
  serviceId: "Todos",
  status: "Todos",
  day: DEFAULT_DAY,
};

const ALLOWED_STATUS_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  Pendente: ["Confirmado", "Cancelado"],
  Confirmado: ["Em atendimento", "Cancelado", "Não compareceu"],
  "Em atendimento": ["Concluído"],
  Concluído: [],
  Cancelado: [],
  "Não compareceu": [],
};

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getStatusTone(status: BookingStatus) {
  return status.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").replaceAll(" ", "-");
}

export function getDay(dayId: DayId) {
  return WEEK_DAYS.find((day) => day.id === dayId) ?? WEEK_DAYS[0];
}

export function getService(services: AgendaService[], serviceId: string) {
  return services.find((service) => service.id === serviceId) ?? null;
}

export function getProfessional(professionals: Professional[], professionalId: string) {
  return professionals.find((professional) => professional.id === professionalId) ?? null;
}

export function filterBookings(bookings: Booking[], filters: BookingFilters) {
  return bookings.filter((booking) => {
    const professionalMatches = filters.professionalId === "Todos" || booking.professionalId === filters.professionalId;
    const serviceMatches = filters.serviceId === "Todos" || booking.serviceId === filters.serviceId;
    const statusMatches = filters.status === "Todos" || booking.status === filters.status;
    return booking.day === filters.day && professionalMatches && serviceMatches && statusMatches;
  });
}

export function hasBookingConflict(
  bookings: Booking[],
  draft: Pick<BookingDraft, "day" | "startTime" | "professionalId" | "serviceId">,
  services: AgendaService[],
  ignoredBookingId?: string,
) {
  return Boolean(findBookingConflict(bookings, draft, services, ignoredBookingId));
}

export function findBookingConflict(
  bookings: Booking[],
  draft: Pick<BookingDraft, "day" | "startTime" | "professionalId" | "serviceId">,
  services: AgendaService[],
  ignoredBookingId?: string,
) {
  if (!draft.startTime) return null;
  const candidateService = getService(services, draft.serviceId);
  if (!candidateService) return null;

  const candidateStart = timeToMinutes(draft.startTime);
  const candidateEnd = candidateStart + candidateService.durationMinutes;

  return bookings.find((booking) => {
    if (booking.id === ignoredBookingId || booking.day !== draft.day || booking.professionalId !== draft.professionalId) return false;
    if (booking.status === "Cancelado" || booking.status === "Não compareceu") return false;
    const existingService = getService(services, booking.serviceId);
    if (!existingService) return false;
    const existingStart = timeToMinutes(booking.startTime);
    const existingEnd = existingStart + existingService.durationMinutes;
    return candidateStart < existingEnd && existingStart < candidateEnd;
  }) ?? null;
}

export function validateBookingDraft(draft: BookingDraft, bookings: Booking[], services: AgendaService[]) {
  const errors: BookingValidationErrors = {};
  if (!draft.clientName.trim()) errors.clientName = "Informe o nome do cliente.";
  if (!draft.contact.trim()) errors.contact = "Informe um contato fictício para a demonstração.";
  if (!draft.serviceId) errors.serviceId = "Selecione um serviço.";
  if (!draft.professionalId) errors.professionalId = "Selecione um profissional.";
  if (!draft.day) errors.day = "Selecione uma data.";
  if (!draft.startTime) errors.startTime = "Selecione um horário.";
  if (draft.startTime && draft.serviceId && draft.professionalId) {
    const conflict = findBookingConflict(bookings, draft, services);
    const conflictService = conflict ? getService(services, conflict.serviceId) : null;
    if (conflict) errors.conflict = `Este profissional já possui um atendimento de ${conflictService?.name ?? "serviço registrado"} às ${conflict.startTime}, com duração de ${conflictService?.durationMinutes ?? "outra"} minutos. O novo horário se sobrepõe a essa reserva.`;
  }
  return errors;
}

export function createBooking(
  bookings: Booking[],
  draft: BookingDraft,
  services: AgendaService[],
  bookingId = `na-${2200 + bookings.length + 1}`,
): BookingCreationResult {
  const errors = validateBookingDraft(draft, bookings, services);
  if (Object.keys(errors).length > 0) {
    return { ok: false, booking: null, message: errors.conflict ?? "Revise os campos indicados antes de criar o agendamento.", errors };
  }

  const booking: Booking = {
    id: bookingId,
    clientName: draft.clientName.trim(),
    contact: draft.contact.trim(),
    serviceId: draft.serviceId,
    professionalId: draft.professionalId,
    day: draft.day,
    startTime: draft.startTime as Booking["startTime"],
    status: "Pendente",
    notes: draft.notes.trim(),
    history: [{ id: `history-${bookingId}-1`, label: "Agendamento criado", detail: "Novo horário incluído localmente nesta demonstração.", time: "Agora" }],
  };

  const day = getDay(booking.day);
  return { ok: true, booking, message: `Agendamento de ${booking.clientName} criado para ${day.shortLabel}, ${day.dateLabel}, às ${booking.startTime}. Status inicial: Pendente.`, errors: {} };
}

export function getAllowedStatusTransitions(status: BookingStatus) {
  return ALLOWED_STATUS_TRANSITIONS[status];
}

export function updateBookingStatus(booking: Booking, nextStatus: BookingStatus): StatusTransitionResult {
  if (!ALLOWED_STATUS_TRANSITIONS[booking.status].includes(nextStatus)) {
    return {
      booking,
      changed: false,
      message: `A mudança de ${booking.status} para ${nextStatus} não faz parte deste fluxo demonstrativo.`,
    };
  }

  const nextBooking: Booking = {
    ...booking,
    status: nextStatus,
    history: [
      ...booking.history,
      {
        id: `history-${booking.id}-${booking.history.length + 1}`,
        label: `Status alterado para ${nextStatus}`,
        detail: `Fluxo avançado de ${booking.status} para ${nextStatus} somente no estado local.`,
        time: "Agora",
      },
    ],
  };

  return { booking: nextBooking, changed: true, message: `${booking.clientName} agora está com status ${nextStatus}.` };
}

export function calculateAgendaMetrics(
  bookings: Booking[],
  waitlist: WaitlistEntry[],
  day: DayId,
  professionalCount: number,
): AgendaMetrics {
  const dayBookings = bookings.filter((booking) => booking.day === day);
  const activeDayBookings = dayBookings.filter((booking) => booking.status !== "Cancelado" && booking.status !== "Não compareceu");
  const totalCapacity = Math.max(professionalCount * TIME_SLOTS.length, 1);

  return {
    scheduledToday: activeDayBookings.length,
    confirmedToday: activeDayBookings.filter((booking) => ["Confirmado", "Em atendimento", "Concluído"].includes(booking.status)).length,
    occupancyRate: Math.round((activeDayBookings.length / totalCapacity) * 100),
    cancelledOrMissed: bookings.filter((booking) => booking.status === "Cancelado" || booking.status === "Não compareceu").length,
    waitlistCount: waitlist.length,
  };
}

export function buildReminderMessage(
  booking: Booking,
  services: AgendaService[],
  professionals: Professional[],
) {
  const service = getService(services, booking.serviceId);
  const professional = getProfessional(professionals, booking.professionalId);
  const day = getDay(booking.day);

  return [
    `Olá, ${booking.clientName}! Tudo bem?`,
    `Passando para lembrar o seu horário de ${service?.name ?? "atendimento"} na Casa Lume.`,
    `${day.label}, ${day.dateLabel}, às ${booking.startTime}, com ${professional?.name ?? "a nossa equipe"}.`,
    "Se precisar ajustar a reserva, entre em contato pelo canal oficial do estabelecimento.",
    "Prévia local — nenhuma mensagem foi enviada.",
  ].join("\n");
}

export function getWaitlistMatches(waitlist: WaitlistEntry[], booking: Booking) {
  const period = timeToMinutes(booking.startTime) < 12 * 60 ? "Manhã" : "Tarde";
  return waitlist.filter((entry) => {
    const serviceMatches = entry.serviceId === booking.serviceId;
    const professionalMatches = entry.preferredProfessionalId === "Qualquer profissional" || entry.preferredProfessionalId === booking.professionalId;
    const dayMatches = entry.preferredDay === "Qualquer dia" || entry.preferredDay === booking.day;
    const periodMatches = entry.preferredPeriod === "Qualquer período" || entry.preferredPeriod === period;
    return serviceMatches && professionalMatches && dayMatches && periodMatches;
  });
}

export function createActivity(
  activities: ActivityEntry[],
  label: string,
  detail: string,
  tone: ActivityEntry["tone"] = "neutral",
) {
  return [{ id: `activity-live-${activities.length + 1}`, label, detail, time: "Agora", tone }, ...activities];
}
