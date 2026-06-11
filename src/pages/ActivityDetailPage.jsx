import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from '../data/details.js';
import { useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { DetailBack } from '../components/detail/DetailBack.jsx';
import { NotFoundDetail } from '../components/detail/NotFoundDetail.jsx';
import { ImageGallery } from '../components/detail/ImageGallery.jsx';
import { I } from '../icons.jsx';

export function ActivityDetailPage({ cart, onBurger, onBuy }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const item = findById('activities', id);
  const [tariffIdx, setTariffIdx] = useState(0);
  const [visitDate, setVisitDate] = useState('');

  if (!item) {
    return (
      <PageShell cart={cart} onBurger={onBurger}>
        <NotFoundDetail sectionLabel={t('detail.activitiesSection')} />
      </PageShell>
    );
  }

  const { safety } = item;
  const tariff = item.priceList[tariffIdx] ?? item.priceList[0];
  const gallery =
    item.gallery?.length > 0
      ? item.gallery
      : item.media?.src
        ? [item.media.src]
        : [];

  const onPurchase = () => {
    if (!visitDate || !tariff) return;
    onBuy?.({
      id: `${item.id}-${tariff.name}`,
      title: `${item.name} · ${tariff.name}`,
      price: tariff.price,
      img: gallery[0],
      category: t('detail.activity'),
      per: tariff.unit,
    });
  };

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <article className="detail-page">
        <div className="wrap">
          <DetailBack />
          <header className="detail-header">
            <span className="eyebrow">{t('detail.activity')}</span>
            <h1 className="detail-title">{item.name}</h1>
          </header>

          <div className="detail-safety">
            <h2>
              <I.ski size={22} />
              {t('detail.safetyTitle')}
            </h2>
            <div className="detail-safety-grid">
              <div className="detail-safety-item">
                <span className="detail-safety-label">{t('detail.safetyAge')}</span>
                <span className="detail-safety-value">{safety.age}</span>
              </div>
              <div className="detail-safety-item">
                <span className="detail-safety-label">{t('detail.safetyHeight')}</span>
                <span className="detail-safety-value">
                  {safety.height.min} – {safety.height.max} {t('detail.safetyCm')}
                </span>
              </div>
              <div className="detail-safety-item">
                <span className="detail-safety-label">{t('detail.safetyWeight')}</span>
                <span className="detail-safety-value">
                  {safety.weight.min} – {safety.weight.max} {t('detail.safetyKg')}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-layout">
            <div className="detail-main">
              {item.media?.type === 'video' ? (
                <div className="detail-media-hero detail-media-hero--large">
                  <video src={item.media.src} controls poster={item.media.poster} />
                </div>
              ) : (
                <ImageGallery images={gallery} alt={item.name} large />
              )}
              <p className="detail-desc">{item.description}</p>

              <div className="detail-pricelist">
                <h2>{t('detail.priceList')}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>{t('detail.service')}</th>
                      <th>{t('detail.priceCol')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.priceList.map((row, i) => (
                      <tr
                        key={row.name}
                        className={i === tariffIdx ? 'is-selected' : ''}
                        onClick={() => setTariffIdx(i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setTariffIdx(i);
                          }
                        }}
                      >
                        <td>{row.name}</td>
                        <td>
                          <b>{row.price}</b> ₸{' '}
                          <span className="per">/ {row.unit}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="detail-aside">
              <div className="detail-card detail-card--price">
                <span className="detail-price-label">{t('common.from')}</span>
                <span className="detail-price-val">
                  <b>{tariff?.price}</b> ₸
                </span>
                <span className="detail-price-per">/ {tariff?.unit}</span>
              </div>

              <div className="detail-card">
                <h2>{t('detail.selectTariff')}</h2>
                <p className="detail-selected-tariff">{tariff?.name}</p>
                <label>
                  {t('detail.visitDate')}
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    required
                  />
                </label>
                <button
                  type="button"
                  className="btn btn-accent btn-block"
                  onClick={onPurchase}
                  disabled={!visitDate}
                >
                  {t('detail.buyTicket')}
                  <I.arrowRight size={16} />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
