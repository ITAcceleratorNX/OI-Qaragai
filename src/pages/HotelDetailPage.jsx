import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OQ } from '../data.js';
import { findById } from '../data/details.js';
import { useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { DetailBack } from '../components/detail/DetailBack.jsx';
import { NotFoundDetail } from '../components/detail/NotFoundDetail.jsx';
import { DetailMeta } from '../components/detail/DetailMeta.jsx';
import { ImageGallery } from '../components/detail/ImageGallery.jsx';
import { resolveMediaList } from '../lib/media.js';
import { I } from '../icons.jsx';

export function HotelDetailPage({ cart, onBurger }) {
  const { t, lang } = useTranslation();
  const { id } = useParams();
  const item = findById('hotels', id);
  const [category, setCategory] = useState('all');
  const [roomIdx, setRoomIdx] = useState(0);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [booking, setBooking] = useState(false);

  const categories = useMemo(() => {
    if (!item) return [];
    const keys = [...new Set(item.rooms.map((r) => r.category).filter(Boolean))];
    return ['all', ...keys];
  }, [item]);

  const filteredRooms = useMemo(() => {
    if (!item) return [];
    if (category === 'all') return item.rooms;
    return item.rooms.filter((r) => r.category === category);
  }, [item, category]);

  useEffect(() => {
    setRoomIdx(0);
  }, [category]);

  if (!item) {
    return (
      <PageShell cart={cart} onBurger={onBurger}>
        <NotFoundDetail sectionLabel={t('detail.hotelsSection')} />
      </PageShell>
    );
  }

  const room = filteredRooms[roomIdx] ?? filteredRooms[0];
  const roomImages = room ? resolveMediaList(room.images, lang) : [];
  const prevRoom = () =>
    setRoomIdx((i) => (i - 1 + filteredRooms.length) % filteredRooms.length);
  const nextRoom = () => setRoomIdx((i) => (i + 1) % filteredRooms.length);

  const onBook = () => {
    if (!dates.checkIn || !dates.checkOut) return;
    setBooking(true);
    window.open(OQ.mice.calculatorUrl, '_blank', 'noopener,noreferrer');
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

          {categories.length > 2 && (
            <div className="detail-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={'pill' + (category === cat ? ' active' : '')}
                  onClick={() => setCategory(cat)}
                >
                  {t(`detail.roomCategories.${cat}`)}
                </button>
              ))}
            </div>
          )}

          <div className="detail-hero-layout">
            <div className="detail-slider">
              {roomImages.length > 0 && (
                <ImageGallery images={roomImages} alt={room.name} large />
              )}
              <div className="detail-slider-toolbar">
                <button
                  type="button"
                  className="detail-slider-nav prev"
                  onClick={prevRoom}
                  aria-label={t('detail.prevRoom')}
                >
                  <I.arrowLeft size={20} />
                </button>
                <div className="detail-slider-info detail-slider-info--inline">
                  <h2>{room.name}</h2>
                  <p>{room.desc}</p>
                </div>
                <button
                  type="button"
                  className="detail-slider-nav next"
                  onClick={nextRoom}
                  aria-label={t('detail.nextRoom')}
                >
                  <I.arrowRight size={20} />
                </button>
              </div>
              <div className="detail-slider-dots">
                {filteredRooms.map((r, i) => (
                  <button
                    key={r.id || r.name}
                    type="button"
                    className={i === roomIdx ? 'active' : ''}
                    onClick={() => setRoomIdx(i)}
                    aria-label={r.name}
                  />
                ))}
              </div>
            </div>

            <aside className="detail-aside detail-aside--hero">
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
                    <a href={OQ.mice.calculatorUrl} target="_blank" rel="noopener noreferrer">
                      {t('detail.clickHere')}
                    </a>
                    .
                  </p>
                )}
              </div>
            </aside>
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
      </article>
    </PageShell>
  );
}
