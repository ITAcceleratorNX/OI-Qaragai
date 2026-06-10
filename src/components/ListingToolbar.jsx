export function ListingToolbar({ filters, active, onChange, count, label = 'найдено' }) {
  return (
    <div className="page-filters">
      <p className="page-filters-meta">
        <b>{count}</b> {label}
      </p>
      <div className="page-filters-pills" role="tablist">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={active === f.key}
            className={'pill' + (active === f.key ? ' active' : '')}
            onClick={() => onChange(f.key)}
          >
            {f.label}
            <span className="count">{f.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
