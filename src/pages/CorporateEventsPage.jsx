import { I } from '../icons.jsx';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

function CorporateCard({ e }) {
  return (
    <article className="corp-card">
      <img src={e.img} alt={e.title} loading="lazy" />
      <div className="corp-card-body">
        <span className="badge badge-dark" style={{ position: 'static' }}>
          MICE
        </span>
        <h3>{e.title}</h3>
        <p>{e.desc}</p>
        <div className="corp-card-foot">
          <span className="ev-date">
            <I.calendar size={16} />
            {e.date}
          </span>
          <button className="btn btn-sm btn-ghost">
            {e.cta}
            <I.arrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function CorporateEventsPage({ cart, onBurger }) {
  const { t } = useTranslation();
  const oq = useOQ();
  const { mice, corporateAll } = oq;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('pages.corporate.eyebrow')}
        title={t('pages.corporate.title')}
        desc={t('pages.corporate.desc')}
        image={oq.pageHero.corporate}
        backLabel={t('pages.corporate.back')}
        backTo="/events"
        stats={mice.stats}
      />

      <div className="page-body">
        <div className="wrap">
          <section className="corp-cta-panel" aria-label={t('pages.corporate.ctaTitle')}>
            <div className="corp-cta-panel-glow" aria-hidden="true" />
            <div className="corp-cta-panel-inner">
              <div className="corp-cta-panel-copy">
                <span className="corp-cta-panel-eyebrow">{t('pages.corporate.ctaEyebrow')}</span>
                <h2>{t('pages.corporate.ctaTitle')}</h2>
                <p>{t('pages.corporate.ctaDesc')}</p>
              </div>
              <div className="corp-cta-panel-actions">
                <a
                  className="corp-cta-btn corp-cta-btn--catalog"
                  href={mice.catalogPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="corp-cta-btn-icon">
                    <I.doc size={22} />
                  </span>
                  <span className="corp-cta-btn-text">
                    <strong>{t('pages.corporate.catalogStrong')}</strong>
                    <small>{t('pages.corporate.catalogSmall')}</small>
                  </span>
                  <I.arrowRight size={18} className="corp-cta-btn-arrow" />
                </a>
                <a
                  className="corp-cta-btn corp-cta-btn--calc"
                  href={mice.calculatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="corp-cta-btn-icon">
                    <I.calc size={22} />
                  </span>
                  <span className="corp-cta-btn-text">
                    <strong>{t('pages.corporate.calcStrong')}</strong>
                    <small>{t('pages.corporate.calcSmall')}</small>
                  </span>
                  <I.arrowRight size={18} className="corp-cta-btn-arrow" />
                </a>
              </div>
            </div>
          </section>

          <section className="corp-features">
            {mice.features.map((f) => (
              <div key={f.title} className="corp-feature">
                <span className="corp-feature-n">{f.n}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </section>

          <div className="corp-offerings-head">
            <h3 className="listing-subhead">{t('pages.corporate.formatsTitle')}</h3>
          </div>

          <div className="corp-grid">
            {corporateAll.map((e) => (
              <CorporateCard key={e.title} e={e} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
