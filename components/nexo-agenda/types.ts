export const BOOKING_STATUSES = [
  "Pendente",
  "Confirmado",
  "Em atendimento",
  "Concluído",
  "Cancelado",
  "Não compareceu",
] as const;

export type BookingStatus = typeof BOOKING_STATUSES[number];
export type DayId = "seg" | "ter" | "qua" | "qui" | "sex";
export type TimeSlot = "08:00" | "09:00" | "10:00" | "11:00" | "13:30" | "14:30" | "15:30" | "16:30";

export type Professional = {
  id: string;
  name: string;
  role: string;
  initials: string;
};

export type AgendaService = {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
};

export type BookingHistoryEntry = {
  id: string;
  label: string;
  detail: string;
  time: string;
};

export type Booking = {
  id: string;
  clientName: string;
  contact: string;
  serviceId: string;
  professionalId: string;
  day: DayId;
  startTime: TimeSlot;
  status: BookingStatus;
  notes: string;
  history: BookingHistoryEntry[];
};

export type WaitlistEntry = {
  id: string;
  clientName: string;
  contact: string;
  serviceId: string;
  preferredProfessionalId: string | "Qualquer profissional";
  preferredDay: DayId | "Qualquer dia";
  preferredPeriod: "Manhã" | "Tarde" | "Qualquer período";
  createdLabel: string;
};

export type ActivityEntry = {
  id: string;
  label: string;
  detail: string;
  time: string;
  tone: "neutral" | "positive" | "attention";
};

export type BookingFilters = {
  professionalId: string | "Todos";
  serviceId: string | "Todos";
  status: BookingStatus | "Todos";
  day: DayId;
};

export type BookingDraft = {
  clientName: string;
  contact: string;
  serviceId: string;
  professionalId: string;
  day: DayId;
  startTime: TimeSlot | "";
  notes: string;
};

export type BookingValidationErrors = Partial<Record<keyof BookingDraft | "conflict", string>>;

export type BookingCreationResult =
  | { ok: true; booking: Booking; message: string; errors: BookingValidationErrors }
  | { ok: false; booking: null; message: string; errors: BookingValidationErrors };

export type StatusTransitionResult = {
  booking: Booking;
  changed: boolean;
  message: string;
};

export type AgendaMetrics = {
  scheduledToday: number;
  confirmedToday: number;
  occupancyRate: number;
  cancelledOrMissed: number;
  waitlistCount: number;
};

export type OpenOpportunity = {
  bookingId: string;
  professionalId: string;
  serviceId: string;
  day: DayId;
  startTime: TimeSlot;
};
