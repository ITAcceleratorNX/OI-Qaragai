import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OQ } from '../data.js';
import { I } from '../icons.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

export const Logo = ({ onClick }) => (
  <Link to="/" className="logo" onClick={onClick}>
    <img
      src="/images/header-logo-with-name.svg"
      alt="OI·QARAGAI Mountain Resort"
      className="logo-img"
      height={44}
    />
  </Link>
);

export function TopBar() {
  const c = OQ.contacts;
  return (
    <div className="topbar">
      <div className="wrap topbar-wrap">
        <div className="topbar-l">
          <a className="topbar-item" href="#">
            <I.camera size={14} />
            Камеры
          </a>
          <a className="topbar-item" href="#">
            <I.cube size={14} />
            3D-тур
          </a>
        </div>
        <div className="topbar-r">
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
  { code: 'KZ', flag: '🇰🇿', name: 'Қазақша' },
  { code: 'RU', flag: '🇷🇺', name: 'Русский' },
  { code: 'EN', flag: '🇬🇧', name: 'English' },
];

function LangLabel({ code }) {
  const item = LANGS.find((l) => l.code === code);
  if (!item) return null;
  return (
    <>
      <span className="lang-flag" aria-hidden="true">
        {item.flag}
      </span>
      <span className="lang-code">{item.code}</span>
    </>
  );
}

function LangSwitcher({ lang, setLang, langOpen, setLangOpen }) {
  const current = LANGS.find((l) => l.code === lang);
  return (
    <div className="lang-wrap">
      <button
        className="lang"
        onClick={() => setLangOpen((o) => !o)}
        onBlur={() => setTimeout(() => setLangOpen(false), 150)}
        aria-label={current ? `Язык: ${current.name}` : 'Язык'}
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
  const { city, resort } = OQ.weather;
  return (
    <>
      <Link to="/weather" className="weather-widget" aria-label="Погода">
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
      <Link to="/weather" className="weather-widget weather-widget--compact show-mobile" aria-label="Погода">
        <I.cloud size={18} />
        <b>{resort.temp}</b>
      </Link>
    </>
  );
}

function MegaMenu({ onClose }) {
  return (
    <div className="mega-wrap" onMouseLeave={onClose}>
      <div className="mega" role="menu">
        {OQ.mega.map((col) => {
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
          <span className="note">
            Единая экосистема курорта — выберите, чем заняться сегодня
          </span>
          <Link className="link-arrow" to="/guide" onClick={onClose}>
            Открыть полный гид <I.arrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Header({ cart, onBurger }) {
  const { pathname } = useLocation();
  const [mega, setMega] = useState(false);
  const [lang, setLang] = useState('RU');
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
          <button className="burger icon-btn" onClick={onBurger} aria-label="Меню">
            <I.menu size={20} />
            <span className="h-only-desk">Меню</span>
          </button>
          <LangSwitcher
            lang={lang}
            setLang={setLang}
            langOpen={langOpen}
            setLangOpen={setLangOpen}
          />
          <nav className="desk-nav h-main-nav">
            <button
              className={'nav-link ' + (mega ? 'open' : '')}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              onClick={() => setMega((m) => !m)}
            >
              Чем заняться?
              <I.chevDown size={15} className="chev" />
            </button>
            <Link className="nav-link" to="/offers">
              Спецпредложения
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
            aria-label="Поиск"
          >
            <I.search size={19} />
          </button>
          <Link
            className={'icon-btn' + (pathname === '/cart' ? ' active' : '')}
            to="/cart"
            aria-label="Корзина"
          >
            <I.cart size={19} />
            {cart > 0 && <span className="cart-badge">{cart}</span>}
          </Link>
          <Link
            className={'icon-btn' + (pathname === '/profile' ? ' active' : '')}
            to="/profile"
            aria-label="Аккаунт"
          >
            <I.user size={19} />
          </Link>
        </div>
      </div>

      <div className={'search-bar ' + (search ? 'open' : '')}>
        <div className="search-inner">
          <I.search size={20} />
          <input
            placeholder="Поиск по курорту: отели, рестораны, ски-пасс, события…"
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
          {OQ.mega.map((col, idx) => {
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
              Профиль
            </Link>
            <Link className="drawer-account-link" to="/cart" onClick={onClose}>
              <I.cart size={18} />
              Корзина
            </Link>
          </div>
          <Link className="btn btn-accent btn-block" to="/offers" onClick={onClose}>
            Забронировать
          </Link>
          <div style={{ display: 'flex', gap: 18, color: 'var(--muted)', fontSize: 14 }}>
            <a
              href={'tel:' + OQ.contacts.phone.replace(/\s/g, '')}
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
            >
              <I.phone size={15} style={{ color: 'var(--accent)' }} />
              {OQ.contacts.phone}
            </a>
          </div>
          <div style={{ display: 'flex', gap: 18, color: 'var(--muted)', fontSize: 14 }}>
            <a
              href={OQ.contacts.instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
            >
              <I.insta size={15} style={{ color: 'var(--accent)' }} />
              {OQ.contacts.insta}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
