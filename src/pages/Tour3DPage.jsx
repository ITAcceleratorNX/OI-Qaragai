import { I } from '../icons.jsx';
import { useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { TOUR_3D_URL } from '../data/liveCameras.js';

export function Tour3DPage({ cart, onBurger }) {
  const { t } = useTranslation();

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('pages.tour3d.eyebrow')}
        title={t('pages.tour3d.title')}
        desc={t('pages.tour3d.desc')}
      />

      <section className="section page-section">
        <div className="wrap">
          <div className="tour3d-card">
            <div className="tour3d-frame">
              <iframe
                src={TOUR_3D_URL}
                title={t('pages.tour3d.title')}
                allow="autoplay; fullscreen; gyroscope; accelerometer; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="tour3d-foot">
              <p>{t('pages.tour3d.hint')}</p>
              <a
                className="btn btn-ghost"
                href={TOUR_3D_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('pages.tour3d.openFull')}
                <I.arrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
