import { TIME_SLOTS, WEEK_DAYS, getService, getStatusTone } from "./nexoAgendaLogic";
import type { AgendaService, Booking, BookingFilters, Professional, TimeSlot } from "./types";

type NexoAgendaCalendarProps = {
  bookings: Booking[];
  visibleBookings: Booking[];
  filters: BookingFilters;
  professionals: Professional[];
  services: AgendaService[];
  selectedBookingId: string | null;
  onDayChange: (day: BookingFilters["day"]) => void;
  onSelectBooking: (bookingId: string) => void;
  onSelectSlot: (professionalId: string, startTime: TimeSlot) => void;
};

export function NexoAgendaCalendar({ bookings, visibleBookings, filters, professionals, services, selectedBookingId, onDayChange, onSelectBooking, onSelectSlot }: NexoAgendaCalendarProps) {
  const day = WEEK_DAYS.find((item) => item.id === filters.day) ?? WEEK_DAYS[0];
  const dayBookings = bookings.filter((booking) => booking.day === filters.day);
  const visibleIds = new Set(visibleBookings.map((booking) => booking.id));

  return (
    <section className="nexo-calendar" aria-labelledby="nexo-calendar-title">
      <header className="nexo-calendar-heading">
        <div><span>Agenda semanal</span><h3 id="nexo-calendar-title">{day.label}, {day.dateLabel}</h3></div>
        <div className="nexo-calendar-legend" aria-label="Legenda da agenda"><span><i className="is-confirmed" />Confirmado</span><span><i className="is-pending" />Pendente</span><span><i className="is-service" />Em atendimento</span><span><i className="is-closed" />Cancelado ou falta</span><span><i className="is-free" />Disponível</span></div>
      </header>

      <div className="nexo-day-tabs" aria-label="Selecionar dia da agenda">
        {WEEK_DAYS.map((item) => (
          <button type="button" className={item.id === filters.day ? "is-active" : ""} aria-pressed={item.id === filters.day} onClick={() => onDayChange(item.id)} key={item.id}>
            <span>{item.shortLabel}</span><strong>{item.dateLabel.split(" ")[0]}</strong>
          </button>
        ))}
      </div>

      {visibleBookings.length === 0 && (
        <div className="nexo-calendar-empty-state" role="status">
          <strong>Nenhum agendamento corresponde aos filtros.</strong>
          <span>Os horários livres continuam disponíveis abaixo. Limpe os filtros para recuperar a visão completa do dia.</span>
        </div>
      )}

      <div className="nexo-calendar-board" role="grid" aria-label={`Horários de ${day.label}`}>
        <div className="nexo-calendar-grid-head" role="row">
          <span role="columnheader">Horário</span>
          {professionals.map((professional) => <span role="columnheader" key={professional.id}><i>{professional.initials}</i><b>{professional.name}</b><small>{professional.role}</small></span>)}
        </div>
        <div className="nexo-calendar-rows">
          {TIME_SLOTS.map((time) => (
            <div className="nexo-calendar-row" role="row" key={time}>
              <span role="rowheader"><time>{time}</time></span>
              {professionals.map((professional) => {
                const booking = dayBookings.find((item) => item.professionalId === professional.id && item.startTime === time);
                if (booking && visibleIds.has(booking.id)) {
                  const service = getService(services, booking.serviceId);
                  return (
                    <button
                      id={`nexo-booking-${booking.id}`}
                      className={`nexo-booking-card is-${getStatusTone(booking.status)} ${selectedBookingId === booking.id ? "is-selected" : ""}`}
                      type="button"
                      role="gridcell"
                      aria-selected={selectedBookingId === booking.id}
                      aria-label={`${booking.clientName}, ${service?.name ?? "atendimento"}, ${professional.name}, ${time}, ${booking.status}${selectedBookingId === booking.id ? ", selecionado" : ""}`}
                      data-professional={professional.name}
                      onClick={() => onSelectBooking(booking.id)}
                      key={professional.id}
                    >
                      {selectedBookingId === booking.id && <em>Selecionado</em>}
                      <span>{booking.clientName}</span><strong>{service?.name}</strong><small><b>{booking.status}</b><span>{service?.durationMinutes} min</span></small>
                    </button>
                  );
                }
                if (booking) {
                  return <div className="nexo-filtered-slot" role="gridcell" data-professional={professional.name} key={professional.id}><span>Agendamento oculto</span><small>Fora do filtro atual</small></div>;
                }
                return (
                  <button className="nexo-free-slot" type="button" role="gridcell" data-professional={professional.name} aria-label={`Horário disponível com ${professional.name} às ${time}`} onClick={() => onSelectSlot(professional.id, time)} key={professional.id}>
                    <span aria-hidden="true">+</span><strong>Disponível</strong><small>Novo agendamento</small>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
