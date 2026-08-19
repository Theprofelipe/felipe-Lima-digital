import { ORDER_PRIORITIES, ORDER_REGIONS, ORDER_STATUSES } from "./types";
import type { OrderFilters } from "./types";

type FieldOpsFiltersProps = {
  filters: OrderFilters;
  resultCount: number;
  onChange: (filters: OrderFilters) => void;
  onReset: () => void;
};

export function FieldOpsFilters({ filters, resultCount, onChange, onReset }: FieldOpsFiltersProps) {
  const update = <Key extends keyof OrderFilters>(key: Key, value: OrderFilters[Key]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="fieldops-filters" aria-labelledby="fieldops-filters-title">
      <div className="fieldops-filter-heading">
        <div>
          <span id="fieldops-filters-title">Ordens de serviço</span>
          <small aria-live="polite">{resultCount} {resultCount === 1 ? "resultado" : "resultados"}</small>
        </div>
        <button type="button" onClick={onReset}>Limpar filtros</button>
      </div>

      <div className="fieldops-filter-grid">
        <label className="fieldops-search-field">
          <span>Buscar serviço ou código</span>
          <span><i aria-hidden="true">⌕</i><input value={filters.search} onChange={(event) => update("search", event.target.value)} placeholder="Ex.: FO-1042" /></span>
        </label>
        <label>
          <span>Status</span>
          <select value={filters.status} onChange={(event) => update("status", event.target.value as OrderFilters["status"])}>
            <option>Todos</option>
            {ORDER_STATUSES.map((status) => <option key={status}>{status}</option>)}
          </select>
        </label>
        <label>
          <span>Prioridade</span>
          <select value={filters.priority} onChange={(event) => update("priority", event.target.value as OrderFilters["priority"])}>
            <option>Todas</option>
            {ORDER_PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}
          </select>
        </label>
        <label>
          <span>Região</span>
          <select value={filters.region} onChange={(event) => update("region", event.target.value as OrderFilters["region"])}>
            <option>Todas</option>
            {ORDER_REGIONS.map((region) => <option key={region}>{region}</option>)}
          </select>
        </label>
      </div>
    </section>
  );
}
