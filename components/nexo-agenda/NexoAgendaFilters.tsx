import { DEFAULT_DAY, WEEK_DAYS, getDay } from "./nexoAgendaLogic";
import { BOOKING_STATUSES } from "./types";
import type { AgendaService, BookingFilters, Professional } from "./types";

type NexoAgendaFiltersProps = {
  filters: BookingFilters;
  resultCount: number;
  professionals: Professional[];
  services: AgendaService[];
  onChange: (filters: BookingFilters) => void;
  onReset: () => void;
};

export function NexoAgendaFilters({ filters, resultCount, professionals, services, onChange, onReset }: NexoAgendaFiltersProps) {
  const update = <Key extends keyof BookingFilters>(key: Key, value: BookingFilters[Key]) => onChange({ ...filters, [key]: value });
  const activeFilterCount = [
    filters.day !== DEFAULT_DAY,
    filters.professionalId !== "Todos",
    filters.serviceId !== "Todos",
    filters.status !== "Todos",
  ].filter(Boolean).length;
  const day = getDay(filters.day);

  return (
    <section className="nexo-filters" aria-labelledby="nexo-filters-title">
      <div className="nexo-filter-heading">
        <div><span id="nexo-filters-title">Filtros da agenda</span><small aria-live="polite">{resultCount} {resultCount === 1 ? "agendamento" : "agendamentos"} em {day.shortLabel.toLowerCase()}.</small></div>
        <button type="button" onClick={onReset} disabled={activeFilterCount === 0} aria-label={`Limpar ${activeFilterCount} ${activeFilterCount === 1 ? "filtro ativo" : "filtros ativos"}`}>Limpar filtros{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}</button>
      </div>
      <div className="nexo-filter-grid">
        <label>
          <span>Dia apresentado</span>
          <select value={filters.day} onChange={(event) => update("day", event.target.value as BookingFilters["day"])}>
            {WEEK_DAYS.map((day) => <option value={day.id} key={day.id}>{day.label} · {day.dateLabel}</option>)}
          </select>
        </label>
        <label>
          <span>Profissional</span>
          <select value={filters.professionalId} onChange={(event) => update("professionalId", event.target.value)}>
            <option>Todos</option>
            {professionals.map((professional) => <option value={professional.id} key={professional.id}>{professional.name}</option>)}
          </select>
        </label>
        <label>
          <span>Serviço</span>
          <select value={filters.serviceId} onChange={(event) => update("serviceId", event.target.value)}>
            <option>Todos</option>
            {services.map((service) => <option value={service.id} key={service.id}>{service.name}</option>)}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={filters.status} onChange={(event) => update("status", event.target.value as BookingFilters["status"])}>
            <option>Todos</option>
            {BOOKING_STATUSES.map((status) => <option key={status}>{status}</option>)}
          </select>
        </label>
      </div>
    </section>
  );
}
