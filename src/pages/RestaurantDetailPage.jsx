import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from '../data/details.js';
import { PageShell } from '../components/PageShell.jsx';
import { DetailBack } from '../components/detail/DetailBack.jsx';
import { NotFoundDetail } from '../components/detail/NotFoundDetail.jsx';
import { ImageGallery } from '../components/detail/ImageGallery.jsx';
import { DetailMeta } from '../components/detail/DetailMeta.jsx';
import { MenuModal } from '../components/detail/MenuModal.jsx';
import { I } from '../icons.jsx';

export function RestaurantDetailPage({ cart, onBurger }) {
  const { id } = useParams();
  const item = findById('restaurants', id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '2' });
  const [sent, setSent] = useState(false);

  if (!item) {
    return (
      <PageShell cart={cart} onBurger={onBurger}>
        <NotFoundDetail sectionLabel="Рестораны" />
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
            <span className="eyebrow">Ресторан</span>
            <h1 className="detail-title">{item.name}</h1>
          </header>

          <div className="detail-layout">
            <div className="detail-main">
              <ImageGallery images={item.gallery} alt={item.name} />
              <p className="detail-desc">{item.description}</p>
              <DetailMeta
                items={[
                  { icon: 'fork', label: 'Тип кухни', value: item.cuisine },
                  { icon: 'calc', label: 'Средний чек', value: item.avgCheck },
                  { icon: 'clock', label: 'Часы работы', value: item.hours },
                ]}
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setMenuOpen(true)}
              >
                <I.doc size={17} />
                Посмотреть меню
              </button>
            </div>

            <aside className="detail-aside">
              <div className="detail-card">
                <h2>Забронировать стол</h2>
                {sent ? (
                  <p className="detail-form-success">
                    Заявка отправлена! Администратор ресторана свяжется с вами для подтверждения.
                  </p>
                ) : (
                  <form className="detail-form" onSubmit={onSubmit}>
                    <label>
                      Имя
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ваше имя"
                      />
                    </label>
                    <label>
                      Телефон
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 700 000 00 00"
                      />
                    </label>
                    <label>
                      Дата
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                      />
                    </label>
                    <label>
                      Количество гостей
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={String(n)}>
                            {n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button type="submit" className="btn btn-accent btn-block">
                      Забронировать стол
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
