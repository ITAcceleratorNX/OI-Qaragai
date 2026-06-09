import { useState, useRef } from 'react';
import { OQ } from '../data.js';
import { I } from '../icons.jsx';

export const Logo = ({ onClick }) => (
  <a href="#top" className="logo" onClick={onClick}>
    <span className="mark">
      OI·<b>QARAGAI</b>
    </span>
    <span className="sub">Mountain Resort</span>
  </a>
);

export function TopBar() {
  const c = OQ.contacts;
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="topbar-l">
          <a className="topbar-item" href={'tel:' + c.phone.replace(/\s/g, '')}>
            <I.phone size={14} />
            {c.phone}
          </a>
          <a className="topbar-item" href="#">
            <I.insta size={14} />
            {c.insta}
          </a>
        </div>
        <div className="topbar-r">
          <a className="topbar-item hide-xs" href="#">
            <I.camera size={14} />
            Камеры
          </a>
          <a className="topbar-item hide-xs" href="#">
            <I.cube size={14} />
            3D-тур
          </a>
          <span className="topbar-item weather">
            <I.cloud size={14} />
            <span className="dot"></span>
            Курорт открыт · <b>{c.weather}</b>
          </span>
        </div>
      </div>
    </div>
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
                    <a href="#tabs" onClick={onClose}>
                      {it}
                    </a>
                  </li>
                ))}
                <li>
                  <a className="more" href="#tabs" onClick={onClose}>
                    {col.more} →
                  </a>
                </li>
              </ul>
            </div>
          );
        })}
        <div className="mega-foot">
          <span className="note">
            Единая экосистема курорта — выберите, чем заняться сегодня
          </span>
          <a className="link-arrow" href="#tabs" onClick={onClose}>
            Открыть полный гид <I.arrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header({ cart, onBurger }) {
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
          <nav className="desk-nav" style={{ display: 'flex', gap: 4 }}>
            <button
              className={'nav-link ' + (mega ? 'open' : '')}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              onClick={() => setMega((m) => !m)}
            >
              Чем заняться?
              <I.chevDown size={15} className="chev" />
            </button>
            <a className="nav-link" href="#offers">
              Спецпредложения
            </a>
          </nav>
        </div>

        <Logo onClick={() => setMega(false)} />

        <div className="h-right">
          <div className="desk-nav" style={{ position: 'relative' }}>
            <button
              className="lang"
              onClick={() => setLangOpen((o) => !o)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
            >
              {lang}
              <I.chevDown size={13} />
            </button>
            {langOpen && (
              <div className="lang-menu">
                {['KZ', 'RU', 'EN'].map((l) => (
                  <button
                    key={l}
                    className={l === lang ? 'sel' : ''}
                    onMouseDown={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                  >
                    {l === 'KZ' ? 'Қазақша' : l === 'RU' ? 'Русский' : 'English'}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="icon-btn"
            onClick={() => setSearch((s) => !s)}
            aria-label="Поиск"
          >
            <I.search size={19} />
          </button>
          <button className="icon-btn" aria-label="Корзина">
            <I.cart size={19} />
            {cart > 0 && <span className="cart-badge">{cart}</span>}
          </button>
          <button className="icon-btn h-only-desk" aria-label="Аккаунт">
            <I.user size={19} />
          </button>
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
                    <a key={i} href="#tabs" onClick={onClose}>
                      {it}
                    </a>
                  ))}
                  <a
                    href="#tabs"
                    onClick={onClose}
                    style={{ color: 'var(--accent)', fontWeight: 700 }}
                  >
                    {col.more} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="drawer-foot">
          <a className="btn btn-accent btn-block" href="#offers" onClick={onClose}>
            Забронировать
          </a>
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
            <a href="#" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <I.insta size={15} style={{ color: 'var(--accent)' }} />
              {OQ.contacts.insta}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
