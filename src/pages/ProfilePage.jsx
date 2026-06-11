import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { getDateLocale } from '../i18n/utils.js';
import { I } from '../icons.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

function ProfileHeroCard({ profile, t, lang }) {
  const u = profile.user;
  const locale = getDateLocale(lang);
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
          <p>{t('pages.profile.memberSince', { year: u.memberSince, email: u.email })}</p>
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <b>{u.points.toLocaleString(locale)}</b>
            <span>{t('pages.profile.bonuses')}</span>
          </div>
          <div className="profile-stat">
            <b>{u.nights}</b>
            <span>{t('pages.profile.nights')}</span>
          </div>
          <div className="profile-stat">
            <b>{profile.bookings.filter((b) => b.status !== 'completed').length}</b>
            <span>{t('pages.profile.active')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileWallet({ profile, t, lang }) {
  const { deposit, skiPass } = profile.wallet;
  const passUsed = skiPass.totalDays - skiPass.daysLeft;
  const passProgress = Math.round((passUsed / skiPass.totalDays) * 100);
  const locale = getDateLocale(lang);

  return (
    <div className="profile-wallet">
      <article className="profile-wallet-card profile-wallet-card--deposit">
        <div className="profile-wallet-head">
          <span className="profile-wallet-icon" aria-hidden="true">
            <I.wallet size={22} />
          </span>
          <div>
            <span className="profile-wallet-label">{t('pages.profile.deposit')}</span>
            <p className="profile-wallet-balance">
              <b>{deposit.balance.toLocaleString(locale)}</b> ₸
            </p>
          </div>
        </div>
        <p className="profile-wallet-note">
          {t('pages.profile.lastTopUp')} {deposit.lastTopUp}
          <span>+{deposit.lastAmount} ₸</span>
        </p>
        <button type="button" className="btn btn-sm btn-accent profile-wallet-btn">
          {t('pages.profile.topUp')}
          <I.plus size={14} />
        </button>
      </article>

      <article className="profile-wallet-card profile-wallet-card--skipass">
        <div className="profile-wallet-head">
          <span className="profile-wallet-icon profile-wallet-icon--ski" aria-hidden="true">
            <I.ski size={22} />
          </span>
          <div className="profile-wallet-skipass-top">
            <span className="profile-wallet-label">{t('pages.profile.skiPass')}</span>
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
          <span>{t('pages.profile.daysOf', { left: skiPass.daysLeft, total: skiPass.totalDays })}</span>
          <span>
            {skiPass.validFrom} — {skiPass.validTo}
          </span>
        </div>
        <div className="profile-wallet-skipass-foot">
          <span className="profile-wallet-pass">№ {skiPass.passNumber}</span>
          <Link className="link-arrow" to="/offers">
            {t('pages.profile.extend')} <I.arrowRight size={14} />
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
            {t('pages.profile.guests', { count: booking.guests })}
          </span>
        </div>
        <div className="profile-booking-foot">
          <span className="profile-booking-total">
            <b>{booking.total}</b> ₸
          </span>
          <button type="button" className="btn btn-sm btn-ghost">
            {t('pages.profile.details')}
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
            <button type="button" className="profile-fav-heart" aria-label={t('pages.profile.removeFavorite')}>
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
        <h3>{t('pages.profile.personalData')}</h3>
        <div className="profile-form-grid">
          <label>
            <span>{t('pages.profile.name')}</span>
            <input type="text" defaultValue={user.name} />
          </label>
          <label>
            <span>{t('pages.profile.phone')}</span>
            <input type="tel" defaultValue={user.phone} />
          </label>
          <label className="profile-form-full">
            <span>{t('pages.profile.email')}</span>
            <input type="email" defaultValue={user.email} />
          </label>
        </div>
        <button type="button" className="btn btn-accent btn-sm">
          {t('pages.profile.save')}
        </button>
      </div>

      <div className="profile-settings-block">
        <h3>{t('pages.profile.notifications')}</h3>
        <div className="profile-toggles">
          <label className="profile-toggle">
            <span>
              <b>{t('pages.profile.promoNotif')}</b>
              <small>{t('pages.profile.promoNotifDesc')}</small>
            </span>
            <input type="checkbox" defaultChecked />
            <span className="profile-toggle-track" />
          </label>
          <label className="profile-toggle">
            <span>
              <b>{t('pages.profile.bookingNotif')}</b>
              <small>{t('pages.profile.bookingNotifDesc')}</small>
            </span>
            <input type="checkbox" defaultChecked />
            <span className="profile-toggle-track" />
          </label>
          <label className="profile-toggle">
            <span>
              <b>{t('pages.profile.weatherNotif')}</b>
              <small>{t('pages.profile.weatherNotifDesc')}</small>
            </span>
            <input type="checkbox" />
            <span className="profile-toggle-track" />
          </label>
        </div>
      </div>

      <div className="profile-settings-block profile-settings-block--danger">
        <button type="button" className="btn btn-outline btn-sm profile-logout">
          <I.logout size={16} />
          {t('pages.profile.logout')}
        </button>
      </div>
    </div>
  );
}

const TAB_IDS = ['bookings', 'favorites', 'settings'];
const TAB_ICONS = { bookings: 'calendar', favorites: 'heart', settings: 'settings' };

export function ProfilePage({ cart, onBurger }) {
  const oq = useOQ();
  const { t, lang } = useTranslation();
  const [tab, setTab] = useState('bookings');
  const profile = oq.profile;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('pages.profile.eyebrow')}
        title={t('pages.profile.title')}
        desc={t('pages.profile.desc')}
      />

      <section className="section page-section profile-section">
        <div className="wrap">
          <ProfileHeroCard profile={profile} t={t} lang={lang} />
          <ProfileWallet profile={profile} t={t} lang={lang} />

          <div className="profile-tabs" role="tablist">
            {TAB_IDS.map((id) => {
              const Icon = I[TAB_ICONS[id]];
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
                  {t(`pages.profile.tabs.${id}`)}
                </button>
              );
            })}
          </div>

          <div className="profile-panel" role="tabpanel">
            {tab === 'bookings' && (
              <>
                <div className="profile-panel-head">
                  <h2>{t('pages.profile.myBookings')}</h2>
                  <Link className="btn btn-accent btn-sm" to="/offers">
                    {t('pages.profile.newBooking')}
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
                  <h2>{t('pages.profile.favorites')}</h2>
                  <span className="profile-panel-count">
                    {t('pages.profile.favoritesCount', { count: profile.favorites.length })}
                  </span>
                </div>
                <FavoritesGrid favorites={profile.favorites} t={t} />
              </>
            )}

            {tab === 'settings' && (
              <>
                <div className="profile-panel-head">
                  <h2>{t('pages.profile.settings')}</h2>
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
