import { Link } from 'react-router-dom';
import { I } from '../icons.jsx';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

export function EventsHubPage({ cart, onBurger }) {
  const { t } = useTranslation();
  const oq = useOQ();
  const upcoming = oq.eventsEvent.filter((e) => !e.past).length;
  const archive = oq.eventsEvent.filter((e) => e.past).length;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('pages.events.eyebrow')}
        title={t('pages.events.title')}
        desc={t('pages.events.desc')}
        image={oq.pageHero.eventsHub}
        stats={[
          { value: upcoming, label: t('pages.events.statUpcoming') },
          { value: oq.corporateAll.length, label: t('pages.events.statMice') },
          { value: archive, label: t('pages.events.statArchive') },
        ]}
      />

      <div className="page-body">
        <div className="wrap">
          <div className="events-hub-grid">
            {oq.eventsHub.portals.map((portal) => (
              <Link
                key={portal.slug}
                to={`/events/${portal.slug}`}
                className={'events-hub-card events-hub-card--' + portal.slug}
              >
                <img
                  className="events-hub-card-bg"
                  src={portal.img}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                />
                <div className="events-hub-card-scrim" aria-hidden="true" />
                <div className="events-hub-card-body">
                  <span className="events-hub-card-tag">{portal.tag}</span>
                  <h2 className="events-hub-card-title">{portal.title}</h2>
                  <p className="events-hub-card-desc">{portal.desc}</p>
                  <ul className="events-hub-card-highlights">
                    {portal.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <span className="events-hub-card-cta">
                    {portal.cta}
                    <I.arrowRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="events-hub-mice">
            <div className="events-hub-mice-copy">
              <span className="eyebrow">{t('pages.events.miceEyebrow')}</span>
              <h3>{t('pages.events.miceTitle')}</h3>
              <p>{t('pages.events.miceDesc')}</p>
            </div>
            <div className="events-hub-mice-actions">
              <a
                className="btn btn-ghost"
                href={oq.mice.catalogPdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                <I.doc size={17} />
                {t('sections.events.catalog')}
              </a>
              <a
                className="btn btn-accent"
                href={oq.mice.calculatorUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <I.calc size={17} />
                {t('sections.events.calculator')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
