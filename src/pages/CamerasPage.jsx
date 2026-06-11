import { useState } from 'react';
import { I } from '../icons.jsx';
import { useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import {
  LIVE_CAMERAS,
  cameraPlayerUrl,
  cameraTitle,
} from '../data/liveCameras.js';

export function CamerasPage({ cart, onBurger }) {
  const { lang, t } = useTranslation();
  const [active, setActive] = useState(LIVE_CAMERAS[0]);

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('pages.cameras.eyebrow')}
        title={t('pages.cameras.title')}
        desc={t('pages.cameras.desc')}
        stats={[
          { value: LIVE_CAMERAS.length, label: t('pages.cameras.statCameras') },
          { value: '24/7', label: t('pages.cameras.statLive') },
          { value: '1820 м', label: t('pages.cameras.statAltitude') },
        ]}
      />

      <section className="section page-section">
        <div className="wrap">
          <div className="cam-player-card">
            <div className="cam-player-head">
              <span className="cam-live-badge">
                <span className="dot" aria-hidden="true" />
                LIVE
              </span>
              <h2>{cameraTitle(active, lang)}</h2>
            </div>
            <div className="cam-player">
              <iframe
                key={active.id}
                src={cameraPlayerUrl(active)}
                title={cameraTitle(active, lang)}
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <h3 className="cam-grid-title">{t('pages.cameras.allCameras')}</h3>
          <div className="cam-grid">
            {LIVE_CAMERAS.map((cam) => {
              const isActive = cam.id === active.id;
              return (
                <button
                  key={cam.id}
                  className={'cam-tile' + (isActive ? ' cam-tile--active' : '')}
                  onClick={() => {
                    setActive(cam);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  aria-pressed={isActive}
                >
                  <span className="cam-tile-media">
                    <img src={cam.preview} alt="" loading="lazy" />
                    <span className="cam-live-badge cam-live-badge--tile">
                      <span className="dot" aria-hidden="true" />
                      LIVE
                    </span>
                    <span className="cam-tile-play" aria-hidden="true">
                      <I.camera size={18} />
                    </span>
                  </span>
                  <span className="cam-tile-name">{cameraTitle(cam, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
