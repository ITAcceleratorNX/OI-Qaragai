import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from '../data/details.js';
import { useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { DetailBack } from '../components/detail/DetailBack.jsx';
import { NotFoundDetail } from '../components/detail/NotFoundDetail.jsx';
import { DetailMeta } from '../components/detail/DetailMeta.jsx';
import { I } from '../icons.jsx';

export function HotelDetailPage({ cart, onBurger }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const item = findById('hotels', id);
  const [roomIdx, setRoomIdx] = useState(0);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [booking, setBooking] = useState(false);

  if (!item) {
    return (
      <PageShell cart={cart} onBurger={onBurger}>
        <NotFoundDetail sectionLabel={t('detail.hotelsSection')} />
      </PageShell>
    );
  }

  const room = item.rooms[roomIdx];
  const prevRoom = () => setRoomIdx((i) => (i - 1 + item.rooms.length) % item.rooms.length);
  const nextRoom = () => setRoomIdx((i) => (i + 1) % item.rooms.length);

  const onBook = () => {
    if (!dates.checkIn || !dates.checkOut) return;
    setBooking(true);
    window.open('https://oiqaragai.avm8.io/', '_blank', 'noopener,noreferrer');
  };

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <article className="detail-page">
        <div className="wrap">
          <DetailBack />
          <header className="detail-header">
            <span className="eyebrow">{t('detail.accommodation')}</span>
            <h1 className="detail-title">{item.name}</h1>
          </header>

          <div className="detail-layout">
            <div className="detail-main">
              <div className="detail-slider">
                <div className="detail-slider-media">
                  <img src={room.img} alt={room.name} />
                  <button type="button" className="detail-slider-nav prev" onClick={prevRoom} aria-label={t('detail.prevRoom')}>
                    <I.arrowLeft size={20} />
                  </button>
                  <button type="button" className="detail-slider-nav next" onClick={nextRoom} aria-label={t('detail.nextRoom')}>
                    <I.arrowRight size={20} />
                  </button>
                </div>
                <div className="detail-slider-info">
                  <h2>{room.name}</h2>
                  <p>{room.desc}</p>
                  <div className="detail-slider-dots">
                    {item.rooms.map((r, i) => (
                      <button
                        key={r.name}
                        type="button"
                        className={i === roomIdx ? 'active' : ''}
                        onClick={() => setRoomIdx(i)}
                        aria-label={r.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="detail-desc">{item.description}</p>

              <DetailMeta
                items={[
                  { icon: 'user', label: t('detail.capacity'), value: item.capacity },
                  {
                    icon: 'calc',
                    label: t('detail.pricePerNight'),
                    value: `${t('common.from')} ${item.pricePerNight} ₸`,
                  },
                ]}
              />

              <div className="detail-amenities">
                <h3>{t('detail.amenities')}</h3>
                <ul>
                  {item.amenities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="detail-aside">
              <div className="detail-card detail-card--price">
                <span className="detail-price-label">{t('common.from')}</span>
                <span className="detail-price-val">
                  <b>{item.pricePerNight}</b> ₸
                </span>
                <span className="detail-price-per">{t('detail.perDay')}</span>
              </div>

              <div className="detail-card">
                <h2>{t('detail.stayDates')}</h2>
                <div className="detail-form detail-form--dates">
                  <label>
                    {t('detail.checkIn')}
                    <input
                      type="date"
                      value={dates.checkIn}
                      onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                    />
                  </label>
                  <label>
                    {t('detail.checkOut')}
                    <input
                      type="date"
                      value={dates.checkOut}
                      min={dates.checkIn || undefined}
                      onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn-accent btn-block"
                  onClick={onBook}
                  disabled={!dates.checkIn || !dates.checkOut}
                >
                  {t('detail.bookRoom')}
                  <I.arrowRight size={16} />
                </button>
                {booking && (
                  <p className="detail-form-hint">
                    {t('detail.bookingHint')}{' '}
                    <a href="https://oiqaragai.avm8.io/" target="_blank" rel="noopener noreferrer">
                      {t('detail.clickHere')}
                    </a>
                    .
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
