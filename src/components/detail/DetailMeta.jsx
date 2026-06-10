import { I } from '../../icons.jsx';

export function DetailMeta({ items }) {
  return (
    <dl className="detail-meta">
      {items.map(({ icon, label, value }) => {
        const Icon = icon ? I[icon] : null;
        return (
          <div className="detail-meta-item" key={label}>
            <dt>
              {Icon && <Icon size={16} />}
              {label}
            </dt>
            <dd>{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
