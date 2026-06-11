import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from '../data/details.js';
import { useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { DetailBack } from '../components/detail/DetailBack.jsx';
import { NotFoundDetail } from '../components/detail/NotFoundDetail.jsx';
import { ImageGallery } from '../components/detail/ImageGallery.jsx';
import { DetailMeta } from '../components/detail/DetailMeta.jsx';
import { I } from '../icons.jsx';

export function SpaDetailPage({ cart, onBurger }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const item = findById('spa', id);
  const tariffs = item?.tariffs?.length ? item.tariffs : [];
  const [tariffIdx, setTariffIdx] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', date: '' });
  const [sent, setSent] = useState(false);

  if (!item) {
    return (
      <PageShell cart={cart} onBurger={onBurger}>
        <NotFoundDetail sectionLabel={t('detail.spaSection')} />
      </PageShell>
    );
  }

  const tariff = tariffs[tariffIdx] ?? {
    name: `${item.duration} мин`,
    price: item.price,
    duration: item.duration,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <article className="detail-page">
        <div className="wrap">
          <DetailBack />
          <header className="detail-header">
            <span className="eyebrow">{t('detail.spaSection')}</span>
            <h1 className="detail-title">{item.name}</h1>
            {item.category && (
              <span className="detail-category-pill">
                {t(`detail.spaCategories.${item.category}`)}
              </span>
            )}
          </header>

          <div className="detail-layout">
            <div className="detail-main">
              <ImageGallery images={item.gallery} alt={item.name} large />
              <p className="detail-desc">{item.description}</p>
              <div className="detail-effect">
                <h3>{t('detail.spaEffect')}</h3>
                <p>{item.effect}</p>
              </div>

              {tariffs.length > 1 && (
                <div className="detail-filters">
                  {tariffs.map((tr, i) => (
                    <button
                      key={tr.id || tr.name}
                      type="button"
                      className={'pill' + (tariffIdx === i ? ' active' : '')}
                      onClick={() => setTariffIdx(i)}
                    >
                      {tr.name}
                    </button>
                  ))}
                </div>
              )}

              <DetailMeta
                items={[
                  {
                    icon: 'clock',
                    label: t('detail.duration'),
                    value: `${tariff.duration} ${t('detail.minutes')}`,
                  },
                  {
                    icon: 'calc',
                    label: t('detail.cost'),
                    value: `${tariff.price} ₸`,
                  },
                ]}
              />
            </div>

            <aside className="detail-aside">
              <div className="detail-card detail-card--price">
                <span className="detail-price-label">{t('detail.cost')}</span>
                <span className="detail-price-val">
                  <b>{tariff.price}</b> ₸
                </span>
                <span className="detail-price-per">
                  {tariff.duration} {t('detail.minutes')}
                </span>
              </div>

              <div className="detail-card">
                <h2>{t('detail.bookSpa')}</h2>
                {sent ? (
                  <p className="detail-form-success">{t('detail.bookSpaSuccess')}</p>
                ) : (
                  <form className="detail-form" onSubmit={onSubmit}>
                    <label>
                      {t('detail.formName')}
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t('detail.formNamePlaceholder')}
                      />
                    </label>
                    <label>
                      {t('detail.formPhone')}
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 700 000 00 00"
                      />
                    </label>
                    <label>
                      {t('detail.formDate')}
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                      />
                    </label>
                    <button type="submit" className="btn btn-accent btn-block">
                      {t('detail.bookSpa')}
                      <I.arrowRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
