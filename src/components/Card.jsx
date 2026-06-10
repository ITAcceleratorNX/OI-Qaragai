import { I } from '../icons.jsx';

export function Card({ d, wide, onBuy }) {
  const buy = d.cta === 'Купить';

  return (
    <article className={'card' + (wide ? ' offer' : '')}>
      <div className="card-media">
        {d.badge && (
          <div className="card-tags">
            <span
              className={
                'badge ' +
                (d.badgeType === 'accent' ? 'badge-accent' : 'badge-dark')
              }
            >
              {d.badge}
            </span>
          </div>
        )}
        <img src={d.img} alt={d.title} loading="lazy" />
        {d.typeLabel && <span className="badge-type">{d.typeLabel}</span>}
        {d.tag && !d.typeLabel && <span className="badge-type">{d.tag}</span>}
      </div>
      <div className="card-body">
        <h3>{d.title}</h3>
        {d.meta && (
          <div className="card-meta">
            {d.meta.map((m, i) => {
              const Mi = I[m.ic];
              return (
                <span className="mi" key={i}>
                  <Mi size={15} />
                  {m.t}
                </span>
              );
            })}
          </div>
        )}
        <p className="card-desc">{d.desc}</p>
        <div className="card-foot">
          {d.price ? (
            <div className="price">
              <span className="from">от</span>
              <span className="val">
                <b>{d.price}</b> ₸
              </span>
              {d.per && <span className="per">/ {d.per}</span>}
            </div>
          ) : (
            <div className="price">
              <span className="from">Курорт Oi-Qaragai</span>
              <span className="val" style={{ fontSize: 15 }}>
                По запросу
              </span>
            </div>
          )}
          <button
            className={'btn btn-sm ' + (buy ? 'btn-accent' : 'btn-ghost')}
            onClick={() => buy && onBuy && onBuy(d.title)}
          >
            {d.cta}
            {buy && <I.arrowRight size={15} />}
          </button>
        </div>
      </div>
    </article>
  );
}
