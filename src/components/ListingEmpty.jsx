import { I } from '../icons.jsx';

export function ListingEmpty({ title, desc, onReset }) {
  return (
    <div className="listing-empty">
      <span className="listing-empty-icon" aria-hidden="true">
        <I.search size={28} />
      </span>
      <h3>{title}</h3>
      <p>{desc}</p>
      {onReset && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={onReset}>
          Сбросить фильтры
        </button>
      )}
    </div>
  );
}
