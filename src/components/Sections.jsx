import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OQ } from '../data.js';
import { I } from '../icons.jsx';
import { Logo } from './Header.jsx';
import { Card } from './Card.jsx';

export function Hero() {
  const { slides, interval } = OQ.hero;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [paused, slides.length, interval]);

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
            <div className="hero-slide-cap">
              <span className="hero-slide-title">{slide.title}</span>
              {slide.detail && (
                <span className="hero-slide-detail">{slide.detail}</span>
              )}
            </div>
          </Link>
        ))}

        <div className="hero-dots" role="tablist" aria-label="Слайды баннера">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              role="tab"
              className={i === active ? 'active' : ''}
              aria-selected={i === active}
              aria-label={slide.title}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuickEntries() {
  return (
    <div className="wrap quick">
      <div className="quick-grid">
        {OQ.quick.map((q, i) => {
          const Ic = I[q.icon];
          return (
            <Link className="quick-item" to="/guide" key={i}>
              <span className="quick-ic">
                <Ic size={25} />
              </span>
              <span className="quick-txt">
                <span className="t">{q.t}</span>
                <span className="d">{q.d}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
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
  const filters = ['Все', 'Отели', 'Рестораны', 'Развлечения', 'SPA'];
  const [f, setF] = useState('Все');
  const list = f === 'Все' ? OQ.things : OQ.things.filter((t) => t.type === f);
  const countFor = (k) =>
    k === 'Все' ? OQ.things.length : OQ.things.filter((t) => t.type === k).length;

  return (
    <section className="section section-alt" id="tabs">
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
          <div className="event-big">
            <img src="https://oq-prod.storage.yandexcloud.kz/media-test/9dc9a54825f5be9e69cc9dfeba062a69.jpg" alt="Новогодняя ночь" />
            <div className="ev-body">
              <span className="badge badge-accent" style={{ position: 'static' }}>
                Event
              </span>
              <h3>Новогодняя ночь в горах</h3>
              <p>
                Гала-ужин, живая музыка, фейерверк над склоном и ночное катание
                до рассвета.
              </p>
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
                  31 декабря, 20:00
                </span>
                <button className="btn btn-accent btn-sm">
                  Купить билет
                  <I.arrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
          <div className="ev-side">
            <div className="event-sm">
              <img src="https://oq-prod.storage.yandexcloud.kz/media-test/4ab09cd056b46f8a04eb02a41cc9fdc4.jpg" alt="Фрирайд" />
              <div className="ev-body">
                <span className="badge badge-dark" style={{ position: 'static' }}>
                  Event
                </span>
                <h4>Кубок по фрирайду</h4>
                <div className="date">14–16 февраля · соревнования</div>
              </div>
            </div>
            <div className="event-sm">
              <img src="https://oq-prod.storage.yandexcloud.kz/media-test/c625a507521f98262ca3793138f93c1a.png" alt="Корпоратив" />
              <div className="ev-body">
                <span className="badge badge-dark" style={{ position: 'static' }}>
                  Корпоративные
                </span>
                <h4>Зимний корпоратив</h4>
                <div className="date">MICE · до 300 гостей</div>
              </div>
            </div>
          </div>
        </div>

        <div className="biz-buttons">
          <div className="bz-txt">
            <b>Для бизнеса · MICE</b>
            <br />
            <span>Конференции, тимбилдинги и корпоративы на курорте</span>
          </div>
          <div className="bz-actions">
            <a className="btn btn-ghost" href="#">
              <I.doc size={17} />
              Изучить возможности курорта
            </a>
            <a
              className="btn btn-accent"
              href="https://oiqaragai.avm8.io/"
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
    <section className="section section-alt">
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
  const g = OQ.gallery;
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % g.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + g.length) % g.length);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [index, g.length, onClose, onIndex]);

  const cur = g[index];
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose}>
          <I.close size={20} />
        </button>
        <button
          className="lb-nav lb-prev"
          onClick={() => onIndex((index - 1 + g.length) % g.length)}
        >
          <I.arrowLeft size={22} />
        </button>
        <img className="lb-img" src={cur.img} alt={cur.cap} />
        <button
          className="lb-nav lb-next"
          onClick={() => onIndex((index + 1) % g.length)}
        >
          <I.arrowRight size={22} />
        </button>
        <div className="lb-cap">
          <b>{cur.cap}</b>
          <span>
            {index + 1} / {g.length}
          </span>
        </div>
        <div className="lb-thumbs">
          {g.map((t, i) => (
            <img
              key={i}
              src={t.img}
              className={i === index ? 'sel' : ''}
              onClick={() => onIndex(i)}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
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

const QR = () => (
  <svg viewBox="0 0 29 29" shapeRendering="crispEdges">
    {(() => {
      const cells = [];
      const s =
        '111111101010111111100000101110100000110111010110110111011011101011011011101100000101010011111110101010101010100000001000111010010110111011001101011001000100101001110011111001101110000000011110010111111101011001010001010000010100110110111110100101111010100010001010010111000100111010101110101101111101110100010100000010101111010110110100010001110101011111';
      let k = 0;
      for (let y = 0; y < 17; y++)
        for (let x = 0; x < 17; x++) {
          if (s[k++] === '1')
            cells.push(
              <rect key={x + '-' + y} x={x + 1} y={y + 1} width="1" height="1" fill="currentColor" />
            );
        }
      return cells;
    })()}
  </svg>
);

export function AppBanner() {
  return (
    <section className="appban">
      <div
        className="appban-bg"
        style={{ backgroundImage: 'url(/images/app-bg.jpg)' }}
      ></div>
      <div className="wrap">
        <div className="appban-inner">
          <div>
            <span className="eyebrow">Приложение Oi-Qaragai</span>
            <h2 style={{ marginTop: 16 }}>Весь курорт в твоём телефоне</h2>
            <p>
              Ски-пассы, бронирование, веб-камеры, карта склонов и push о свежем
              снеге — в одном приложении.
            </p>
            <div className="store-row">
              <a className="store-btn" href="#">
                <I.apple size={26} />
                <span className="st">
                  <small>Загрузите в</small>
                  <b>App Store</b>
                </span>
              </a>
              <a className="store-btn" href="#">
                <I.play size={24} />
                <span className="st">
                  <small>Доступно в</small>
                  <b>Google Play</b>
                </span>
              </a>
            </div>
          </div>
          <div className="app-qr">
            <div className="qr">
              <QR />
            </div>
            <span>Наведите камеру, чтобы скачать</span>
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
            <p>
              Всесезонный горный курорт в часе езды от Алматы. Катание, отдых и
              события круглый год.
            </p>
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
                Ежедневно, 08:00 – 23:00
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Oi-Qaragai Mountain Resort. Все права защищены.</span>
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
