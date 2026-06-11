import { I } from '../icons.jsx';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

export function OfferSpotlight({ offer, onBuy }) {
  const { t } = useTranslation();
  return (
    <article className="offer-spotlight">
      <div className="offer-spotlight-media">
        <img src={offer.img} alt={offer.title} />
        {offer.badge && (
          <span
            className={
              'badge ' + (offer.badgeType === 'accent' ? 'badge-accent' : 'badge-dark')
            }
            style={{ position: 'absolute', top: 20, left: 20, zIndex: 2 }}
          >
            {offer.badge}
          </span>
        )}
      </div>
      <div className="offer-spotlight-body">
        <span className="offer-spotlight-tag">{offer.tag || offer.category}</span>
        <h2>{offer.title}</h2>
        <p>{offer.desc}</p>
        <div className="offer-spotlight-foot">
          <div className="price">
            <span className="from">{t('common.from')}</span>
            <span className="val">
              <b>{offer.price}</b> ₸
            </span>
            {offer.per && <span className="per">/ {offer.per}</span>}
          </div>
          <button
            className="btn btn-accent"
            onClick={() => onBuy && onBuy(offer)}
          >
            {offer.cta}
            <I.arrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
