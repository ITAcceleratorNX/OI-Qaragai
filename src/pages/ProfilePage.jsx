import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  profileUser,
  profileBookings,
  profileFavorites,
  profileWallet,
} from '../data/profile.js';
import { I } from '../icons.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

const TABS = [
  { id: 'bookings', label: 'Бронирования', icon: 'calendar' },
  { id: 'favorites', label: 'Избранное', icon: 'heart' },
  { id: 'settings', label: 'Настройки', icon: 'settings' },
];

function ProfileHeroCard() {
  const u = profileUser;
  return (
    <div className="profile-hero-card">
      <div className="profile-hero-glow" aria-hidden="true" />
      <div className="profile-hero-inner">
        <div className="profile-avatar" aria-hidden="true">
          <span>{u.initials}</span>
          <div className="profile-avatar-ring" />
        </div>
        <div className="profile-hero-info">
          <span className="profile-tier">
            <I.star size={13} />
            {u.tierLabel}
          </span>
          <h2>{u.name}</h2>
          <p>
            Участник с {u.memberSince} · {u.email}
          </p>
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <b>{u.points.toLocaleString('ru-RU')}</b>
            <span>бонусов</span>
          </div>
          <div className="profile-stat">
            <b>{u.nights}</b>
            <span>ночей</span>
          </div>
          <div className="profile-stat">
            <b>{profileBookings.filter((b) => b.status !== 'completed').length}</b>
            <span>активных</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileWallet() {
  const { deposit, skiPass } = profileWallet;
  const passUsed = skiPass.totalDays - skiPass.daysLeft;
  const passProgress = Math.round((passUsed / skiPass.totalDays) * 100);

  return (
    <div className="profile-wallet">
      <article className="profile-wallet-card profile-wallet-card--deposit">
        <div className="profile-wallet-head">
          <span className="profile-wallet-icon" aria-hidden="true">
            <I.wallet size={22} />
          </span>
          <div>
            <span className="profile-wallet-label">Депозитный счёт</span>
            <p className="profile-wallet-balance">
              <b>{deposit.balance.toLocaleString('ru-RU')}</b> ₸
            </p>
          </div>
        </div>
        <p className="profile-wallet-note">
          Последнее пополнение · {deposit.lastTopUp}
          <span>+{deposit.lastAmount} ₸</span>
        </p>
        <button type="button" className="btn btn-sm btn-accent profile-wallet-btn">
          Пополнить
          <I.plus size={14} />
        </button>
      </article>

      <article className="profile-wallet-card profile-wallet-card--skipass">
        <div className="profile-wallet-head">
          <span className="profile-wallet-icon profile-wallet-icon--ski" aria-hidden="true">
            <I.ski size={22} />
          </span>
          <div className="profile-wallet-skipass-top">
            <span className="profile-wallet-label">Ски-пасс</span>
            <span className={'profile-wallet-status profile-wallet-status--' + skiPass.status}>
              {skiPass.statusLabel}
            </span>
          </div>
        </div>
        <h3 className="profile-wallet-skipass-title">{skiPass.type}</h3>
        <div className="profile-wallet-progress" aria-hidden="true">
          <div className="profile-wallet-progress-bar" style={{ width: passProgress + '%' }} />
        </div>
        <div className="profile-wallet-skipass-meta">
          <span>
            <b>{skiPass.daysLeft}</b> из {skiPass.totalDays} дней
          </span>
          <span>
            {skiPass.validFrom} — {skiPass.validTo}
          </span>
        </div>
        <div className="profile-wallet-skipass-foot">
          <span className="profile-wallet-pass">№ {skiPass.passNumber}</span>
          <Link className="link-arrow" to="/offers">
            Продлить <I.arrowRight size={14} />
          </Link>
        </div>
      </article>
    </div>
  );
}

function BookingCard({ booking }) {
  return (
    <article className={'profile-booking profile-booking--' + booking.status}>
      <div className="profile-booking-media">
        <img src={booking.img} alt="" loading="lazy" />
      </div>
      <div className="profile-booking-body">
        <div className="profile-booking-top">
          <span className={'profile-status profile-status--' + booking.status}>
            {booking.statusLabel}
          </span>
          <span className="profile-booking-id">#{booking.id}</span>
        </div>
        <h3>{booking.title}</h3>
        <div className="profile-booking-meta">
          <span>
            <I.calendar size={15} />
            {booking.dates}
          </span>
          <span>
            <I.user size={15} />
            {booking.guests} гостя
          </span>
        </div>
        <div className="profile-booking-foot">
          <span className="profile-booking-total">
            <b>{booking.total}</b> ₸
          </span>
          <button type="button" className="btn btn-sm btn-ghost">
            Подробнее
            <I.arrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function FavoritesGrid() {
  return (
    <div className="profile-fav-grid">
      {profileFavorites.map((f) => (
        <article className="profile-fav-card" key={f.id}>
          <div className="profile-fav-media">
            <img src={f.img} alt="" loading="lazy" />
            <button type="button" className="profile-fav-heart" aria-label="Убрать из избранного">
              <I.heart size={16} fill />
            </button>
          </div>
          <div className="profile-fav-body">
            <span>{f.type}</span>
            <h3>{f.title}</h3>
            <p>
              от <b>{f.price}</b> ₸ / {f.per}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function SettingsPanel() {
  const u = profileUser;
  return (
    <div className="profile-settings">
      <div className="profile-settings-block">
        <h3>Личные данные</h3>
        <div className="profile-form-grid">
          <label>
            <span>Имя</span>
            <input type="text" defaultValue={u.name} />
          </label>
          <label>
            <span>Телефон</span>
            <input type="tel" defaultValue={u.phone} />
          </label>
          <label className="profile-form-full">
            <span>Email</span>
            <input type="email" defaultValue={u.email} />
          </label>
        </div>
        <button type="button" className="btn btn-accent btn-sm">
          Сохранить изменения
        </button>
      </div>

      <div className="profile-settings-block">
        <h3>Уведомления</h3>
        <div className="profile-toggles">
          <label className="profile-toggle">
            <span>
              <b>Акции и спецпредложения</b>
              <small>Скидки, пакеты и сезонные предложения</small>
            </span>
            <input type="checkbox" defaultChecked />
            <span className="profile-toggle-track" />
          </label>
          <label className="profile-toggle">
            <span>
              <b>Напоминания о бронировании</b>
              <small>За 3 дня до заезда и в день выезда</small>
            </span>
            <input type="checkbox" defaultChecked />
            <span className="profile-toggle-track" />
          </label>
          <label className="profile-toggle">
            <span>
              <b>Погода на курорте</b>
              <small>Утренний прогноз и статус трасс</small>
            </span>
            <input type="checkbox" />
            <span className="profile-toggle-track" />
          </label>
        </div>
      </div>

      <div className="profile-settings-block profile-settings-block--danger">
        <button type="button" className="btn btn-outline btn-sm profile-logout">
          <I.logout size={16} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export function ProfilePage({ cart, onBurger }) {
  const [tab, setTab] = useState('bookings');

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Личный кабинет"
        title="Профиль"
        desc="Бронирования, избранное и настройки — всё для комфортного отдыха на OI·QARAGAI."
      />

      <section className="section page-section profile-section">
        <div className="wrap">
          <ProfileHeroCard />
          <ProfileWallet />

          <div className="profile-tabs" role="tablist">
            {TABS.map((t) => {
              const Icon = I[t.icon];
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  className={'profile-tab' + (tab === t.id ? ' active' : '')}
                  onClick={() => setTab(t.id)}
                >
                  <Icon size={17} />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="profile-panel" role="tabpanel">
            {tab === 'bookings' && (
              <>
                <div className="profile-panel-head">
                  <h2>Мои бронирования</h2>
                  <Link className="btn btn-accent btn-sm" to="/offers">
                    Новое бронирование
                    <I.plus size={15} />
                  </Link>
                </div>
                <div className="profile-bookings">
                  {profileBookings.map((b) => (
                    <BookingCard key={b.id} booking={b} />
                  ))}
                </div>
              </>
            )}

            {tab === 'favorites' && (
              <>
                <div className="profile-panel-head">
                  <h2>Избранное</h2>
                  <span className="profile-panel-count">{profileFavorites.length} объекта</span>
                </div>
                <FavoritesGrid />
              </>
            )}

            {tab === 'settings' && (
              <>
                <div className="profile-panel-head">
                  <h2>Настройки</h2>
                </div>
                <SettingsPanel />
              </>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
