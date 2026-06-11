import { Link } from 'react-router-dom';
import { I } from '../icons.jsx';
import { getDetailPath } from '../data/details.js';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

export function Card({ d, wide, onBuy }) {
  const { t } = useTranslation();
  const buy = d.ctaKey === 'buy';
  const detailPath =
    d.id && d.typeKey ? getDetailPath(d.typeKey, d.id) : null;
  const goDetail =
    detailPath &&
    (d.ctaKey === 'details' || d.ctaKey === 'menu' || d.ctaKey === 'buy');

  const media = (
    <div className="card-media">
      {d.badge && (
        <div className="card-tags">
          <span
            className={
              'badge ' + (d.badgeType === 'accent' ? 'badge-accent' : 'badge-dark')
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
  );

  return (
    <article className={'card' + (wide ? ' offer' : '')}>
      {detailPath ? (
        <Link className="card-media-link" to={detailPath}>
          {media}
        </Link>
      ) : (
        media
      )}
      <div className="card-body">
        {detailPath ? (
          <h3>
            <Link className="card-title-link" to={detailPath}>
              {d.title}
            </Link>
          </h3>
        ) : (
          <h3>{d.title}</h3>
        )}
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
              <span className="from">{t('common.from')}</span>
              <span className="val">
                <b>{d.price}</b> ₸
              </span>
              {d.per && <span className="per">/ {d.per}</span>}
            </div>
          ) : (
            <div className="price">
              <span className="from">{t('common.resortName')}</span>
              <span className="val" style={{ fontSize: 15 }}>
                {t('common.onRequest')}
              </span>
            </div>
          )}
          {goDetail ? (
            <Link
              className={'btn btn-sm ' + (buy ? 'btn-accent' : 'btn-ghost')}
              to={detailPath}
            >
              {d.cta}
              <I.arrowRight size={15} />
            </Link>
          ) : (
            <button
              className={'btn btn-sm ' + (buy ? 'btn-accent' : 'btn-ghost')}
              onClick={() =>
                buy &&
                onBuy &&
                onBuy({
                  id: d.id || d.title,
                  title: d.title,
                  price: d.price,
                  img: d.img,
                  category: d.tag || d.typeLabel || d.category || t('common.service'),
                  per: d.per,
                })
              }
            >
              {d.cta}
              {buy && <I.arrowRight size={15} />}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
