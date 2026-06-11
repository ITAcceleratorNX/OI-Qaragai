import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { I } from '../icons.jsx';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { Logo } from './Header.jsx';
import { Card } from './Card.jsx';
import { ImageLightbox } from './ImageLightbox.jsx';

/* углы: снизу вверх — Проживание → 3D-тур */
const QUICK_ARC_ANGLES = [62, 31, 0, -31, -62];

const THING_FILTER_IDS = ['all', 'hotels', 'restaurants', 'fun', 'spa'];

export function QuickFab() {
  const { t } = useTranslation();
  const oq = useOQ();
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
        <nav className="quick-fab-menu" aria-label={t('quickFab.nav')} aria-hidden={!open}>
          {oq.quick.map((q, i) => {
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
          aria-label={open ? t('quickFab.hide') : t('quickFab.show')}
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
  const { t, lang } = useTranslation();
  const { slides, interval } = useOQ().hero;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goPrev = () => setActive((i) => (i - 1 + count) % count);
  const goNext = () => setActive((i) => (i + 1) % count);

  useEffect(() => {
    setActive(0);
  }, [lang]);

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
    <section className="hero" aria-label={t('hero.aria')}>
      <div
        className="hero-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, i) => (
          <Link
            className={'hero-slide' + (i === active ? ' is-active' : '')}
            to={slide.href || '/guide'}
            key={slide.img}
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
              aria-label={t('hero.prev')}
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
              aria-label={t('hero.next')}
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
  const { t } = useTranslation();
  const oq = useOQ();
  return (
    <section className="section" id="offers">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{t('sections.offers.eyebrow')}</span>
            <h2 className="h-sec">{t('sections.offers.title')}</h2>
            <p>{t('sections.offers.desc')}</p>
          </div>
          <Link className="link-arrow" to="/offers">
            {t('sections.offers.link')} <I.arrowRight size={17} />
          </Link>
        </div>
        <div className="cards-grid cards-3">
          {oq.offers.map((o, i) => (
            <Card key={i} d={o} wide onBuy={onBuy} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ThingsToDo({ onBuy }) {
  const { t } = useTranslation();
  const oq = useOQ();
  const [f, setF] = useState('all');
  const list =
    f === 'all' ? oq.things : oq.things.filter((item) => item.typeKey === f);
  const countFor = (k) =>
    k === 'all'
      ? oq.things.length
      : oq.things.filter((item) => item.typeKey === k).length;

  return (
    <section className="section" id="tabs">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{t('sections.things.eyebrow')}</span>
            <h2 className="h-sec">{t('sections.things.title')}</h2>
            <p>{t('sections.things.desc')}</p>
          </div>
          <Link className="link-arrow" to="/guide">
            {t('sections.things.link')} <I.arrowRight size={17} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
          {THING_FILTER_IDS.map((x) => (
            <button
              key={x}
              className={'pill ' + (f === x ? 'active' : '')}
              onClick={() => setF(x)}
            >
              {t(`filters.${x}`)}
              <span className="count">{countFor(x)}</span>
            </button>
          ))}
        </div>
        <div className="cards-grid cards-4">
          {list.map((item) => (
            <Card key={item.title} d={item} onBuy={onBuy} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Events() {
  const { t } = useTranslation();
  const oq = useOQ();
  return (
    <section className="section" id="events">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{t('sections.events.eyebrow')}</span>
            <h2 className="h-sec">{t('sections.events.title')}</h2>
            <p>{t('sections.events.desc')}</p>
          </div>
          <Link className="link-arrow" to="/events">
            {t('sections.events.link')} <I.arrowRight size={17} />
          </Link>
        </div>
        <div className="events-grid">
          <div className="event-big">
            <img src="https://oq-prod.storage.yandexcloud.kz/media-test/9dc9a54825f5be9e69cc9dfeba062a69.jpg" alt={t('sections.events.newYearTitle')} />
            <div className="ev-body">
              <span className="badge badge-accent" style={{ position: 'static' }}>
                {t('sections.events.badgeEvent')}
              </span>
              <h3>{t('sections.events.newYearTitle')}</h3>
              <p>{t('sections.events.newYearDesc')}</p>
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
                  {t('sections.events.newYearDate')}
                </span>
                <button className="btn btn-accent btn-sm">
                  {t('sections.events.buyTicket')}
                  <I.arrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
          <div className="ev-side">
            <div className="event-sm">
              <img src="https://oq-prod.storage.yandexcloud.kz/media-test/4ab09cd056b46f8a04eb02a41cc9fdc4.jpg" alt={t('sections.events.freerideTitle')} />
              <div className="ev-body">
                <span className="badge badge-dark" style={{ position: 'static' }}>
                  {t('sections.events.badgeEvent')}
                </span>
                <h4>{t('sections.events.freerideTitle')}</h4>
                <div className="date">{t('sections.events.freerideDate')}</div>
              </div>
            </div>
            <Link className="event-sm" to="/events/corporate">
              <img src="https://oq-prod.storage.yandexcloud.kz/media-test/c625a507521f98262ca3793138f93c1a.png" alt={t('sections.events.corporateTitle')} />
              <div className="ev-body">
                <span className="badge badge-dark" style={{ position: 'static' }}>
                  {t('sections.events.badgeCorporate')}
                </span>
                <h4>{t('sections.events.corporateTitle')}</h4>
                <div className="date">{t('sections.events.corporateDate')}</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="biz-buttons">
          <div className="bz-txt">
            <b>{t('sections.events.bizTitle')}</b>
            <br />
            <span>{t('sections.events.bizDesc')}</span>
          </div>
          <div className="bz-actions">
            <a
              className="btn btn-ghost"
              href={oq.mice.catalogPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              <I.doc size={17} />
              {t('sections.events.catalog')}
            </a>
            <a
              className="btn btn-accent"
              href={oq.mice.calculatorUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <I.calc size={17} />
              {t('sections.events.calculator')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery({ onOpen }) {
  const { t } = useTranslation();
  const oq = useOQ();
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{t('sections.gallery.eyebrow')}</span>
            <h2 className="h-sec">{t('sections.gallery.title')}</h2>
            <p>{t('sections.gallery.desc')}</p>
          </div>
        </div>
        <div className="gallery-grid">
          {oq.gallery.map((g, i) => (
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
  const images = useOQ().gallery.map((g) => ({ src: g.img, caption: g.cap }));
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
  const { t } = useTranslation();
  const oq = useOQ();
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="rules">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{t('sections.rules.eyebrow')}</span>
            <h2 className="h-sec">{t('sections.rules.title')}</h2>
          </div>
        </div>
        <div className="rules">
          {oq.rules.map((r, i) => {
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
  const { t } = useTranslation();
  const oq = useOQ();
  const [shotA, shotB] = oq.app.screenshots;
  const { ios, android } = oq.app.stores;

  return (
    <section className="section appban">
      <div className="wrap">
        <div className="appban-inner">
          <div className="appban-copy">
            <span className="eyebrow">{t('sections.app.eyebrow')}</span>
            <h2 className="h-sec" style={{ marginTop: 16 }}>
              {t('sections.app.title')}
            </h2>
            <p>{t('sections.app.desc')}</p>
            <div className="store-row">
              <a
                className="store-btn"
                href={ios.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="store-btn-icon" src={ios.icon} alt="" aria-hidden="true" />
                <span className="st">
                  <small>{t('sections.app.iosSmall')}</small>
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
                  <small>{t('sections.app.androidSmall')}</small>
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
  const { t } = useTranslation();
  const oq = useOQ();
  const c = oq.contacts;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Logo />
            <p>{t('footer.desc')}</p>
            <div className="soc-row">
              <a
                className="soc"
                href={oq.contacts.instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={oq.contacts.insta}
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
            <h5>{t('footer.resort')}</h5>
            <ul>
              <li>
                <Link to="/guide">{t('footer.hotels')}</Link>
              </li>
              <li>
                <Link to="/guide">{t('footer.restaurants')}</Link>
              </li>
              <li>
                <Link to="/guide">{t('footer.fun')}</Link>
              </li>
              <li>
                <Link to="/guide">{t('footer.spa')}</Link>
              </li>
              <li>
                <a href="#">{t('footer.tour3d')}</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>{t('footer.info')}</h5>
            <ul>
              <li>
                <a href="#">{t('footer.about')}</a>
              </li>
              <li>
                <a href="#rules">{t('footer.rules')}</a>
              </li>
              <li>
                <Link to="/events">{t('footer.events')}</Link>
              </li>
              <li>
                <a href="#">{t('footer.jobs')}</a>
              </li>
              <li>
                <a href="#">{t('footer.contactLink')}</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>{t('footer.contacts')}</h5>
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
                {t('footer.hours')}
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t('footer.copyright')}</span>
          <div className="lk">
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.offer')}</a>
            <a href="#rules">{t('footer.rulesLink')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Partners() {
  const { t } = useTranslation();
  const oq = useOQ();
  return (
    <div className="partners">
      <div className="wrap">
        <div className="partners-row">
          <span className="lab">{t('sections.partners.label')}</span>
          <div className="partner-logos">
            {oq.partners.map((p, i) => (
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
