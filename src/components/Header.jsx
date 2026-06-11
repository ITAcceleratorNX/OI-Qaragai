import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { I } from '../icons.jsx';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import { useTheme } from '../theme/ThemeProvider.jsx';

export const Logo = ({ onClick }) => {
  const { theme } = useTheme();
  const src =
    theme === 'dark'
      ? '/images/header-logo-for-dark.svg'
      : '/images/header-logo-with-name.svg';

  return (
    <Link to="/" className="logo" onClick={onClick}>
      <img
        src={src}
        alt="OI·QARAGAI Mountain Resort"
        className="logo-img"
        height={44}
      />
    </Link>
  );
};

export function TopBar() {
  const oq = useOQ();
  const { t } = useTranslation();
  const c = oq.contacts;
  const { resort } = oq.weather;
  return (
    <div className="topbar">
      <div className="wrap topbar-wrap">
        <div className="topbar-l">
          <a className="topbar-item" href="#">
            <I.camera size={14} />
            {t('header.cameras')}
          </a>
          <a className="topbar-item" href="#">
            <I.cube size={14} />
            {t('header.tour3d')}
          </a>
        </div>
        <div className="topbar-r">
          <Link
            to="/weather"
            className={
              'topbar-status status-badge' + (resort.open ? '' : ' status-badge--closed')
            }
            aria-label={t('header.statusAria')}
            title={
              resort.open
                ? t('header.statusTitle', { lifts: resort.lifts, slopes: resort.slopes })
                : t('header.statusClosed')
            }
          >
            <span className="dot" aria-hidden="true" />
            <span className="topbar-status-text">
              {resort.open ? t('header.statusOpen') : t('header.statusClosed')}
            </span>
            {resort.open && (
              <span className="topbar-status-meta hide-xs">
                · {resort.lifts} · {resort.slopes}
              </span>
            )}
          </Link>
          <a className="topbar-item" href={'tel:' + c.phone.replace(/\s/g, '')}>
            <I.phone size={14} />
            {c.phone}
          </a>
          <a
            className="topbar-insta icon-btn"
            href={c.instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${c.insta}`}
          >
            <I.insta size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

const LANGS = [
  { code: 'KZ', flag: '/images/flags/kz.png', name: 'Қазақша' },
  { code: 'RU', flag: '/images/flags/ru.png', name: 'Русский' },
  { code: 'EN', flag: '/images/flags/us.png', name: 'English' },
];

function LangLabel({ code }) {
  const item = LANGS.find((l) => l.code === code);
  if (!item) return null;
  return (
    <>
      <img className="lang-flag" src={item.flag} alt="" aria-hidden="true" />
      <span className="lang-code">{item.code}</span>
    </>
  );
}

function LangSwitcher({ lang, setLang, langOpen, setLangOpen, t }) {
  const current = LANGS.find((l) => l.code === lang);
  return (
    <div className="lang-wrap">
      <button
        className="lang"
        onClick={() => setLangOpen((o) => !o)}
        onBlur={() => setTimeout(() => setLangOpen(false), 150)}
        aria-label={current ? t('header.languageLabel', { name: current.name }) : t('header.language')}
      >
        <LangLabel code={lang} />
        <I.chevDown size={13} />
      </button>
      {langOpen && (
        <div className="lang-menu">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={l.code === lang ? 'sel' : ''}
              onMouseDown={() => {
                setLang(l.code);
                setLangOpen(false);
              }}
              aria-label={l.name}
            >
              <LangLabel code={l.code} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function WeatherWidget() {
  const oq = useOQ();
  const { t } = useTranslation();
  const { city, resort } = oq.weather;
  return (
    <>
      <Link to="/weather" className="weather-widget" aria-label={t('header.weather')}>
        <span className="weather-loc">
          <span className="weather-name">{city.name}</span>
          <b>{city.temp}</b>
        </span>
        <span className="weather-divider" aria-hidden="true" />
        <span className="weather-loc">
          <span className="weather-name">{resort.name}</span>
          <b>{resort.temp}</b>
        </span>
      </Link>
      <Link to="/weather" className="weather-widget weather-widget--compact show-mobile" aria-label={t('header.weather')}>
        <I.cloud size={18} />
        <b>{resort.temp}</b>
      </Link>
    </>
  );
}

function MegaMenu({ onClose }) {
  const oq = useOQ();
  const { t } = useTranslation();
  return (
    <div className="mega-wrap" onMouseLeave={onClose}>
      <div className="mega" role="menu">
        {oq.mega.map((col) => {
          const Ic = I[col.icon];
          return (
            <div className="mega-col" key={col.key}>
              <h4>
                <Ic size={16} />
                {col.title}
              </h4>
              <ul>
                {col.items.map((it, i) => (
                  <li key={i}>
                    <Link to="/guide" onClick={onClose}>
                      {it}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className="more" to="/guide" onClick={onClose}>
                    {col.more} →
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
        <div className="mega-foot">
          <span className="note">{t('header.megaNote')}</span>
          <Link className="link-arrow" to="/guide" onClick={onClose}>
            {t('header.megaCta')} <I.arrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Header({ cart, onBurger }) {
  const { pathname } = useLocation();
  const { lang, setLang, t } = useTranslation();
  const [mega, setMega] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const megaTimer = useRef();
  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMega(false), 120);
  };

  return (
    <header className="header" id="top">
      <div className="wrap">
        <div className="h-left">
          <button className="burger icon-btn" onClick={onBurger} aria-label={t('header.menu')}>
            <I.menu size={20} />
            <span className="h-only-desk">{t('header.menu')}</span>
          </button>
          <LangSwitcher
            lang={lang}
            setLang={setLang}
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            t={t}
          />
          <nav className="desk-nav h-main-nav">
            <button
              className={'nav-link ' + (mega ? 'open' : '')}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              onClick={() => setMega((m) => !m)}
            >
              {t('header.thingsToDo')}
              <I.chevDown size={15} className="chev" />
            </button>
            <Link className="nav-link" to="/offers">
              {t('header.offers')}
            </Link>
          </nav>
        </div>

        <Logo onClick={() => setMega(false)} />

        <div className="h-right">
          <WeatherWidget />
          <ThemeToggle />
          <button
            className="icon-btn"
            onClick={() => setSearch((s) => !s)}
            aria-label={t('header.search')}
          >
            <I.search size={19} />
          </button>
          <Link
            className={'icon-btn' + (pathname === '/cart' ? ' active' : '')}
            to="/cart"
            aria-label={t('header.cart')}
          >
            <I.cart size={19} />
            {cart > 0 && <span className="cart-badge">{cart}</span>}
          </Link>
          <Link
            className={'icon-btn' + (pathname === '/profile' ? ' active' : '')}
            to="/profile"
            aria-label={t('header.account')}
          >
            <I.user size={19} />
          </Link>
        </div>
      </div>

      <div className={'search-bar ' + (search ? 'open' : '')}>
        <div className="search-inner">
          <I.search size={20} />
          <input
            placeholder={t('header.searchPlaceholder')}
            autoFocus={search}
          />
          <button className="icon-btn" onClick={() => setSearch(false)}>
            <I.close size={18} />
          </button>
        </div>
      </div>

      {mega && (
        <div onMouseEnter={openMega} onMouseLeave={closeMega}>
          <MegaMenu onClose={() => setMega(false)} />
        </div>
      )}
    </header>
  );
}

export function MobileDrawer({ open, onClose }) {
  const oq = useOQ();
  const { t } = useTranslation();
  const [sec, setSec] = useState(null);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.left = '0';
    style.right = '0';
    style.width = '100%';
    style.overflow = 'hidden';

    return () => {
      style.position = prev.position;
      style.top = prev.top;
      style.left = prev.left;
      style.right = prev.right;
      style.width = prev.width;
      style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  if (!open) return null;
  return (
    <>
      <div className="drawer-back" onClick={onClose}></div>
      <aside className="drawer">
        <div className="drawer-head">
          <Logo onClick={onClose} />
          <button className="icon-btn" onClick={onClose}>
            <I.close size={20} />
          </button>
        </div>
        <div className="drawer-body">
          {oq.mega.map((col, idx) => {
            const Ic = I[col.icon];
            const isOpen = sec === idx;
            return (
              <div className={'drawer-sec ' + (isOpen ? 'open' : '')} key={col.key}>
                <button onClick={() => setSec(isOpen ? null : idx)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Ic size={18} style={{ color: 'var(--accent)' }} />
                    {col.title}
                  </span>
                  <I.chevDown size={18} className="chev" />
                </button>
                <div
                  className="drawer-sub"
                  style={{
                    maxHeight: isOpen ? (col.items.length + 1) * 46 + 'px' : 0,
                  }}
                >
                  {col.items.map((it, i) => (
                    <Link key={i} to="/guide" onClick={onClose}>
                      {it}
                    </Link>
                  ))}
                  <Link
                    to="/guide"
                    onClick={onClose}
                    style={{ color: 'var(--accent)', fontWeight: 700 }}
                  >
                    {col.more} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="drawer-foot">
          <div className="drawer-account">
            <Link className="drawer-account-link" to="/profile" onClick={onClose}>
              <I.user size={18} />
              {t('header.profile')}
            </Link>
            <Link className="drawer-account-link" to="/cart" onClick={onClose}>
              <I.cart size={18} />
              {t('header.cart')}
            </Link>
          </div>
          <Link className="btn btn-accent btn-block" to="/offers" onClick={onClose}>
            {t('header.book')}
          </Link>
          <div style={{ display: 'flex', gap: 18, color: 'var(--muted)', fontSize: 14 }}>
            <a
              href={'tel:' + oq.contacts.phone.replace(/\s/g, '')}
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
            >
              <I.phone size={15} style={{ color: 'var(--accent)' }} />
              {oq.contacts.phone}
            </a>
          </div>
          <div style={{ display: 'flex', gap: 18, color: 'var(--muted)', fontSize: 14 }}>
            <a
              href={oq.contacts.instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
            >
              <I.insta size={15} style={{ color: 'var(--accent)' }} />
              {oq.contacts.insta}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
