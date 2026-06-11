import { I } from '../icons.jsx';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

export function EventCard({ e, variant }) {
  const { t } = useTranslation();
  const isBig = variant === 'big';
  const isPast = e.past;
  const isBuy = e.ctaKey === 'buyTicket';

  if (isBig) {
    return (
      <article className={'event-big' + (isPast ? ' event-past' : '')}>
        <img src={e.img} alt={e.title} loading="eager" />
        <div className="ev-body">
          <span className="badge badge-accent" style={{ position: 'static' }}>
            {t('common.eventBadge')}
          </span>
          <h3>{e.title}</h3>
          <p>{e.desc}</p>
          <div className="listing-event-foot">
            <span className="ev-date">
              <I.calendar size={16} />
              {e.date}
            </span>
            <button className={'btn btn-sm ' + (isBuy ? 'btn-accent' : 'btn-ghost')}>
              {e.cta}
              <I.arrowRight size={15} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={'event-sm' + (isPast ? ' event-past' : '')}>
      <img src={e.img} alt={e.title} loading="lazy" />
      {isPast && <span className="event-past-badge">{t('common.pastEvent')}</span>}
      <div className="ev-body">
        <span className="badge badge-accent" style={{ position: 'static' }}>
          {t('common.eventBadge')}
        </span>
        <h4>{e.title}</h4>
        <div className="date">{e.date}</div>
      </div>
    </article>
  );
}
