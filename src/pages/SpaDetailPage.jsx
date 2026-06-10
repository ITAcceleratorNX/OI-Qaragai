import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from '../data/details.js';
import { PageShell } from '../components/PageShell.jsx';
import { DetailBack } from '../components/detail/DetailBack.jsx';
import { NotFoundDetail } from '../components/detail/NotFoundDetail.jsx';
import { ImageGallery } from '../components/detail/ImageGallery.jsx';
import { DetailMeta } from '../components/detail/DetailMeta.jsx';

export function SpaDetailPage({ cart, onBurger }) {
  const { id } = useParams();
  const item = findById('spa', id);
  const [form, setForm] = useState({ name: '', phone: '', date: '' });
  const [sent, setSent] = useState(false);

  if (!item) {
    return (
      <PageShell cart={cart} onBurger={onBurger}>
        <NotFoundDetail sectionLabel="SPA" />
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
            <span className="eyebrow">SPA и Баня</span>
            <h1 className="detail-title">{item.name}</h1>
          </header>

          <div className="detail-layout">
            <div className="detail-main">
              <ImageGallery images={item.gallery} alt={item.name} />
              <p className="detail-desc">{item.description}</p>
              <div className="detail-effect">
                <h3>Эффект процедуры</h3>
                <p>{item.effect}</p>
              </div>
              <DetailMeta
                items={[
                  { icon: 'clock', label: 'Длительность', value: `${item.duration} мин` },
                  { icon: 'calc', label: 'Стоимость', value: `${item.price} ₸` },
                ]}
              />
            </div>

            <aside className="detail-aside">
              <div className="detail-card detail-card--price">
                <span className="detail-price-label">стоимость</span>
                <span className="detail-price-val">
                  <b>{item.price}</b> ₸
                </span>
                <span className="detail-price-per">{item.duration} мин</span>
              </div>

              <div className="detail-card">
                <h2>Записаться на сеанс</h2>
                {sent ? (
                  <p className="detail-form-success">
                    Заявка принята! SPA-администратор подтвердит время по SMS.
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
                      Желаемая дата
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                      />
                    </label>
                    <button type="submit" className="btn btn-accent btn-block">
                      Записаться на сеанс
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
