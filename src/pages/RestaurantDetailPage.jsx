import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDetail, useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { DetailBack } from '../components/detail/DetailBack.jsx';
import { NotFoundDetail } from '../components/detail/NotFoundDetail.jsx';
import { ImageGallery } from '../components/detail/ImageGallery.jsx';
import { DetailMeta } from '../components/detail/DetailMeta.jsx';
import { MenuModal } from '../components/detail/MenuModal.jsx';
import { I } from '../icons.jsx';

export function RestaurantDetailPage({ cart, onBurger }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const item = useDetail('restaurants', id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '2' });
  const [sent, setSent] = useState(false);

  if (!item) {
    return (
      <PageShell cart={cart} onBurger={onBurger}>
        <NotFoundDetail sectionLabel={t('detail.restaurantsSection')} />
      </PageShell>
    );
  }

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
            <span className="eyebrow">{t('detail.restaurant')}</span>
            <h1 className="detail-title">{item.name}</h1>
          </header>

          <div className="detail-layout">
            <div className="detail-main">
              <ImageGallery images={item.gallery} alt={item.name} large />
              <p className="detail-desc">{item.description}</p>
              <DetailMeta
                items={[
                  { icon: 'fork', label: t('detail.cuisine'), value: item.cuisine },
                  { icon: 'calc', label: t('detail.avgCheck'), value: item.avgCheck },
                  { icon: 'clock', label: t('detail.hours'), value: item.hours },
                ]}
              />

              <div className="detail-contacts">
                <h3>{t('detail.contacts')}</h3>
                <ul>
                  {item.phone && (
                    <li>
                      <I.phone size={16} />
                      <a href={'tel:' + item.phone.replace(/\s/g, '')}>{item.phone}</a>
                    </li>
                  )}
                  {item.email && (
                    <li>
                      <I.mail size={16} />
                      <a href={'mailto:' + item.email}>{item.email}</a>
                    </li>
                  )}
                  {item.address && (
                    <li>
                      <I.pin size={16} />
                      <span>{item.address}</span>
                    </li>
                  )}
                </ul>
              </div>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setMenuOpen(true)}
              >
                <I.doc size={17} />
                {t('detail.viewMenu')}
              </button>
            </div>

            <aside className="detail-aside">
              <div className="detail-card">
                <h2>{t('detail.bookTable')}</h2>
                {sent ? (
                  <p className="detail-form-success">{t('detail.bookTableSuccess')}</p>
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
                    <label>
                      {t('detail.formGuests')}
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={String(n)}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button type="submit" className="btn btn-accent btn-block">
                      {t('detail.bookTable')}
                    </button>
                  </form>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>

      <MenuModal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title={item.name}
        menuPdf={item.menuPdf}
        menuPreview={item.menuPreview}
      />
    </PageShell>
  );
}
