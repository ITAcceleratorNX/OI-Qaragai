import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { getDateLocale } from '../i18n/utils.js';
import { I } from '../icons.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

const TAB_IDS = ['bookings', 'favorites', 'settings'];

function ProfileHeroCard({ user, bookings, t, lang }) {
  const locale = getDateLocale(lang);
  return (
    <div className="profile-hero-card">
      <div className="profile-hero-glow" aria-hidden="true" />
      <div className="profile-hero-inner">
        <div className="profile-avatar" aria-hidden="true">
          <span>{user.initials}</span>
          <div className="profile-avatar-ring" />
        </div>
        <div className="profile-hero-info">
          <span className="profile-tier">
            <I.star size={13} />
            {user.tierLabel}
          </span>
          <h2>{user.name}</h2>
          <p>
            {t('profile.memberSince', { year: user.memberSince })} · {user.email}
          </p>
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <b>{user.points.toLocaleString(locale)}</b>
            <span>{t('profile.bonuses')}</span>
          </div>
          <div className="profile-stat">
            <b>{user.nights}</b>
            <span>{t('profile.nights')}</span>
          </div>
          <div className="profile-stat">
            <b>{bookings.filter((b) => b.status !== 'completed').length}</b>
            <span>{t('profile.active')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileWallet({ wallet, t, lang }) {
  const { deposit, skiPass } = wallet;
  const locale = getDateLocale(lang);
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
            <span className="profile-wallet-label">{t('profile.deposit')}</span>
            <p className="profile-wallet-balance">
              <b>{deposit.balance.toLocaleString(locale)}</b> ₸
            </p>
          </div>
        </div>
        <p className="profile-wallet-note">
          {t('profile.lastTopUp')} · {deposit.lastTopUp}
          <span>+{deposit.lastAmount} ₸</span>
        </p>
        <button type="button" className="btn btn-sm btn-accent profile-wallet-btn">
          {t('profile.topUp')}
          <I.plus size={14} />
        </button>
      </article>

      <article className="profile-wallet-card profile-wallet-card--skipass">
        <div className="profile-wallet-head">
          <span className="profile-wallet-icon profile-wallet-icon--ski" aria-hidden="true">
            <I.ski size={22} />
          </span>
          <div className="profile-wallet-skipass-top">
            <span className="profile-wallet-label">{t('profile.skiPass')}</span>
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
          <span>{t('profile.daysOf', { left: skiPass.daysLeft, total: skiPass.totalDays })}</span>
          <span>
            {skiPass.validFrom} — {skiPass.validTo}
          </span>
        </div>
        <div className="profile-wallet-skipass-foot">
          <span className="profile-wallet-pass">№ {skiPass.passNumber}</span>
          <Link className="link-arrow" to="/offers">
            {t('profile.extend')} <I.arrowRight size={14} />
          </Link>
        </div>
      </article>
    </div>
  );
}

function BookingCard({ booking, t }) {
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
            {t('profile.guests', { count: booking.guests })}
          </span>
        </div>
        <div className="profile-booking-foot">
          <span className="profile-booking-total">
            <b>{booking.total}</b> ₸
          </span>
          <button type="button" className="btn btn-sm btn-ghost">
            {t('cta.details')}
            <I.arrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function FavoritesGrid({ favorites, t }) {
  return (
    <div className="profile-fav-grid">
      {favorites.map((f) => (
        <article className="profile-fav-card" key={f.id}>
          <div className="profile-fav-media">
            <img src={f.img} alt="" loading="lazy" />
            <button type="button" className="profile-fav-heart" aria-label={t('profile.removeFavorite')}>
              <I.heart size={16} fill />
            </button>
          </div>
          <div className="profile-fav-body">
            <span>{f.type}</span>
            <h3>{f.title}</h3>
            <p>
              {t('common.from')} <b>{f.price}</b> ₸ / {f.per}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function SettingsPanel({ user, t }) {
  return (
    <div className="profile-settings">
      <div className="profile-settings-block">
        <h3>{t('profile.personalData')}</h3>
        <div className="profile-form-grid">
          <label>
            <span>{t('profile.name')}</span>
            <input type="text" defaultValue={user.name} />
          </label>
          <label>
            <span>{t('profile.phone')}</span>
            <input type="tel" defaultValue={user.phone} />
          </label>
          <label className="profile-form-full">
            <span>{t('profile.email')}</span>
            <input type="email" defaultValue={user.email} />
          </label>
        </div>
        <button type="button" className="btn btn-accent btn-sm">
          {t('profile.save')}
        </button>
      </div>

      <div className="profile-settings-block">
        <h3>{t('profile.notifications')}</h3>
        <div className="profile-toggles">
          <label className="profile-toggle">
            <span>
              <b>{t('profile.notifOffers')}</b>
              <small>{t('profile.notifOffersDesc')}</small>
            </span>
            <input type="checkbox" defaultChecked />
            <span className="profile-toggle-track" />
          </label>
          <label className="profile-toggle">
            <span>
              <b>{t('profile.notifBooking')}</b>
              <small>{t('profile.notifBookingDesc')}</small>
            </span>
            <input type="checkbox" defaultChecked />
            <span className="profile-toggle-track" />
          </label>
          <label className="profile-toggle">
            <span>
              <b>{t('profile.notifWeather')}</b>
              <small>{t('profile.notifWeatherDesc')}</small>
            </span>
            <input type="checkbox" />
            <span className="profile-toggle-track" />
          </label>
        </div>
      </div>

      <div className="profile-settings-block profile-settings-block--danger">
        <button type="button" className="btn btn-outline btn-sm profile-logout">
          <I.logout size={16} />
          {t('profile.logout')}
        </button>
      </div>
    </div>
  );
}

export function ProfilePage({ cart, onBurger }) {
  const { t, lang } = useTranslation();
  const oq = useOQ();
  const profile = oq.profile;
  const [tab, setTab] = useState('bookings');

  if (!profile) return null;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('profile.eyebrow')}
        title={t('profile.title')}
        desc={t('profile.desc')}
      />

      <section className="section page-section profile-section">
        <div className="wrap">
          <ProfileHeroCard
            user={profile.user}
            bookings={profile.bookings}
            t={t}
            lang={lang}
          />
          <ProfileWallet wallet={profile.wallet} t={t} lang={lang} />

          <div className="profile-tabs" role="tablist">
            {TAB_IDS.map((id) => {
              const Icon = I[id === 'bookings' ? 'calendar' : id === 'favorites' ? 'heart' : 'settings'];
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  className={'profile-tab' + (tab === id ? ' active' : '')}
                  onClick={() => setTab(id)}
                >
                  <Icon size={17} />
                  {t(`profile.tabs.${id}`)}
                </button>
              );
            })}
          </div>

          <div className="profile-panel" role="tabpanel">
            {tab === 'bookings' && (
              <>
                <div className="profile-panel-head">
                  <h2>{t('profile.myBookings')}</h2>
                  <Link className="btn btn-accent btn-sm" to="/offers">
                    {t('profile.newBooking')}
                    <I.plus size={15} />
                  </Link>
                </div>
                <div className="profile-bookings">
                  {profile.bookings.map((b) => (
                    <BookingCard key={b.id} booking={b} t={t} />
                  ))}
                </div>
              </>
            )}

            {tab === 'favorites' && (
              <>
                <div className="profile-panel-head">
                  <h2>{t('profile.favoritesTitle')}</h2>
                  <span className="profile-panel-count">
                    {t('profile.favoritesCount', { count: profile.favorites.length })}
                  </span>
                </div>
                <FavoritesGrid favorites={profile.favorites} t={t} />
              </>
            )}

            {tab === 'settings' && (
              <>
                <div className="profile-panel-head">
                  <h2>{t('profile.settingsTitle')}</h2>
                </div>
                <SettingsPanel user={profile.user} t={t} />
              </>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
