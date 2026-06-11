import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OQ } from '../data.js';
import { listingFilters } from '../data/helpers.js';
import { I } from '../icons.jsx';
import { Logo } from './Header.jsx';
import { Card } from './Card.jsx';
import { ImageLightbox } from './ImageLightbox.jsx';

/* углы: снизу вверх — Проживание → 3D-тур */
const QUICK_ARC_ANGLES = [62, 31, 0, -31, -62];

export function QuickFab() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (!e.target.closest('.quick-fab')) setOpen(false);
    };
    const id = window.setTimeout(() => document.addEventListener('click', onClick), 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <div className={'quick-fab' + (open ? ' is-open' : '')}>
      <div className="quick-fab-pivot">
        <nav className="quick-fab-menu" aria-label="Быстрые разделы" aria-hidden={!open}>
          {OQ.quick.map((q, i) => {
            const Ic = I[q.icon];
            return (
              <Link
                className="quick-fab-item"
                to={q.href || '/guide'}
                key={q.t}
                style={{ '--arc-angle': QUICK_ARC_ANGLES[i] + 'deg', '--arc-i': i }}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                <span className="quick-fab-chip">
                  <span className="quick-fab-ic">
                    <Ic size={18} />
                  </span>
                  <span className="quick-fab-label">{q.t}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="quick-fab-toggle"
          aria-expanded={open}
          aria-label={open ? 'Скрыть быстрые разделы' : 'Быстрые разделы курорта'}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          {open ? <I.close size={22} /> : <I.menu size={22} />}
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  const { slides, interval } = OQ.hero;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goPrev = () => setActive((i) => (i - 1 + count) % count);
  const goNext = () => setActive((i) => (i + 1) % count);

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, interval);

    return () => window.clearInterval(id);
  }, [paused, count, interval]);

  return (
    <section className="hero" aria-label="Главный баннер">
      <div
        className="hero-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, i) => (
          <Link
            className={'hero-slide' + (i === active ? ' is-active' : '')}
            to={slide.href || '/guide'}
            key={slide.title}
            aria-hidden={i !== active}
            tabIndex={i === active ? 0 : -1}
          >
            <img
              src={slide.img}
              alt={slide.title}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </Link>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              className="hero-nav prev"
              aria-label="Предыдущий слайд"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goPrev();
              }}
            >
              <I.arrowLeft size={20} />
            </button>
            <button
              type="button"
              className="hero-nav next"
              aria-label="Следующий слайд"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goNext();
              }}
            >
              <I.arrowRight size={20} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export function Offers({ onBuy }) {
  return (
    <section className="section" id="offers">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Выгодно</span>
            <h2 className="h-sec">Специальные предложения</h2>
            <p>Готовые пакеты на зимний сезон — бронируйте в пару кликов.</p>
          </div>
          <Link className="link-arrow" to="/offers">
            Все предложения <I.arrowRight size={17} />
          </Link>
        </div>
        <div className="cards-grid cards-3">
          {OQ.offers.map((o, i) => (
            <Card key={i} d={o} wide onBuy={onBuy} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ThingsToDo({ onBuy }) {
  const filters = listingFilters(OQ.things, (t) => t.type);
  const [f, setF] = useState('Все');
  const list = f === 'Все' ? OQ.things : OQ.things.filter((t) => t.type === f);
  const countFor = (k) =>
    k === 'Все' ? OQ.things.length : OQ.things.filter((t) => t.type === k).length;

  return (
    <section className="section" id="tabs">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Единый гид по курорту</span>
            <h2 className="h-sec">Чем заняться?</h2>
            <p>
              Отели, рестораны, активности и SPA — всё в одном месте и в едином
              стиле карточек.
            </p>
          </div>
          <Link className="link-arrow" to="/guide">
            Открыть карту курорта <I.arrowRight size={17} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
          {filters.map((x) => (
            <button
              key={x}
              className={'pill ' + (f === x ? 'active' : '')}
              onClick={() => setF(x)}
            >
              {x}
              <span className="count">{countFor(x)}</span>
            </button>
          ))}
        </div>
        <div className="cards-grid cards-4">
          {list.map((t) => (
            <Card key={t.title} d={t} onBuy={onBuy} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Events() {
  const { featured, side, corporate } = OQ.homeEvents;

  return (
    <section className="section" id="events">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Афиша</span>
            <h2 className="h-sec">Мероприятия</h2>
            <p>События курорта и площадки для бизнеса — Event и Корпоративные.</p>
          </div>
          <Link className="link-arrow" to="/events">
            Вся афиша <I.arrowRight size={17} />
          </Link>
        </div>
        <div className="events-grid">
          {featured && (
            <div className="event-big">
              <img src={featured.img} alt={featured.title} />
              <div className="ev-body">
                <span className="badge badge-accent" style={{ position: 'static' }}>
                  Event
                </span>
                <h3>{featured.title}</h3>
                <p>{featured.desc}</p>
                <div
                  style={{
                    display: 'flex',
                    gap: 18,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="ev-date">
                    <I.calendar size={16} />
                    {featured.date}
                  </span>
                  <button className="btn btn-accent btn-sm">
                    {featured.cta}
                    <I.arrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="ev-side">
            {side && (
              <div className="event-sm">
                <img src={side.img} alt={side.title} />
                <div className="ev-body">
                  <span className="badge badge-dark" style={{ position: 'static' }}>
                    Event
                  </span>
                  <h4>{side.title}</h4>
                  <div className="date">{side.date}</div>
                </div>
              </div>
            )}
            {corporate && (
              <Link className="event-sm" to="/events/corporate">
                <img src={corporate.img} alt={corporate.title} />
                <div className="ev-body">
                  <span className="badge badge-dark" style={{ position: 'static' }}>
                    Корпоративные
                  </span>
                  <h4>{corporate.title}</h4>
                  <div className="date">{corporate.date}</div>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="biz-buttons">
          <div className="bz-txt">
            <b>Для бизнеса · MICE</b>
            <br />
            <span>Конференции, тимбилдинги и корпоративы на курорте</span>
          </div>
          <div className="bz-actions">
            <a
              className="btn btn-ghost"
              href={OQ.mice.catalogPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              <I.doc size={17} />
              Изучить возможности курорта
            </a>
            <a
              className="btn btn-accent"
              href={OQ.mice.calculatorUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <I.calc size={17} />
              Калькулятор мероприятия
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery({ onOpen }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Атмосфера</span>
            <h2 className="h-sec">Галерея курорта</h2>
            <p>Нажмите на любое фото, чтобы открыть в полном размере.</p>
          </div>
        </div>
        <div className="gallery-grid">
          {OQ.gallery.map((g, i) => (
            <div
              className={'g-item' + (g.tall ? ' tall' : '')}
              key={i}
              onClick={() => onOpen(i)}
            >
              <img src={g.img} alt={g.cap} loading="lazy" />
              <span className="g-zoom">
                <I.zoom size={17} />
              </span>
              <span className="g-cap">{g.cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Lightbox({ index, onClose, onIndex }) {
  const images = OQ.gallery.map((g) => ({ src: g.img, caption: g.cap }));
  return (
    <ImageLightbox
      images={images}
      index={index}
      onClose={onClose}
      onIndex={onIndex}
    />
  );
}

export function Rules() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="rules">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Важно знать</span>
            <h2 className="h-sec">Правила курорта</h2>
          </div>
        </div>
        <div className="rules">
          {OQ.rules.map((r, i) => {
            const isOpen = open === i;
            return (
              <div className={'acc-item' + (isOpen ? ' open' : '')} key={i}>
                <button
                  className="acc-head"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="acc-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="acc-title">{r.title}</span>
                  <span className="acc-ic">
                    <I.plus size={18} />
                  </span>
                </button>
                <div
                  className="acc-panel"
                  style={{ maxHeight: isOpen ? '260px' : 0 }}
                >
                  <div className="acc-body">{r.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AppBanner() {
  const [shotA, shotB] = OQ.app.screenshots;
  const { ios, android } = OQ.app.stores;

  return (
    <section className="section appban">
      <div className="wrap">
        <div className="appban-inner">
          <div className="appban-copy">
            <span className="eyebrow">Приложение Oi-Qaragai</span>
            <h2 className="h-sec" style={{ marginTop: 16 }}>
              Весь курорт в твоём телефоне
            </h2>
            <p>
              Управляйте вашими баллами лояльности,
              а также получайте актуальную информацию о трассах,
              подъемниках и погоде — в мобильном приложении Oi-Qaragai Mountain Resort
            </p>
            <div className="store-row">
              <a
                className="store-btn"
                href={ios.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="store-btn-icon" src={ios.icon} alt="" aria-hidden="true" />
                <span className="st">
                  <small>Загрузите в</small>
                  <b>{ios.label}</b>
                </span>
              </a>
              <a
                className="store-btn"
                href={android.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="store-btn-icon" src={android.icon} alt="" aria-hidden="true" />
                <span className="st">
                  <small>Доступно в</small>
                  <b>{android.label}</b>
                </span>
              </a>
            </div>
          </div>

          <div className="appban-phones">
            <div className="appban-phone appban-phone--back">
              <img src={shotA.src} alt={shotA.alt} loading="lazy" />
            </div>
            <div className="appban-phone appban-phone--front">
              <img src={shotB.src} alt={shotB.alt} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const c = OQ.contacts;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Logo />
            <p>{c.tagline}</p>
            <div className="soc-row">
              <a
                className="soc"
                href={OQ.contacts.instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={OQ.contacts.insta}
              >
                <I.insta size={18} />
              </a>
              <a className="soc" href="#">
                <I.play size={16} />
              </a>
              <a className="soc" href="#">
                <I.camera size={18} />
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Курорт</h5>
            <ul>
              <li>
                <Link to="/guide">Отели</Link>
              </li>
              <li>
                <Link to="/guide">Рестораны</Link>
              </li>
              <li>
                <Link to="/guide">Развлечения</Link>
              </li>
              <li>
                <Link to="/guide">SPA и Баня</Link>
              </li>
              <li>
                <a href="#">3D-тур</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Информация</h5>
            <ul>
              <li>
                <a href="#">О курорте</a>
              </li>
              <li>
                <a href="#rules">Правила</a>
              </li>
              <li>
                <Link to="/events">Мероприятия</Link>
              </li>
              <li>
                <a href="#">Вакансии</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Контакты</h5>
            <ul className="foot-contact">
              <li>
                <I.pin size={17} />
                {c.address}
              </li>
              <li>
                <I.phone size={17} />
                {c.phone}
              </li>
              <li>
                <I.mail size={17} />
                {c.email}
              </li>
              <li>
                <I.clock size={17} />
                {c.hours}
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{c.copyright}</span>
          <div className="lk">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Публичная оферта</a>
            <a href="#rules">Правила курорта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Partners() {
  return (
    <div className="partners">
      <div className="wrap">
        <div className="partners-row">
          <span className="lab">Партнёры курорта</span>
          <div className="partner-logos">
            {OQ.partners.map((p, i) => (
              <div className="partner-slot" key={i}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
