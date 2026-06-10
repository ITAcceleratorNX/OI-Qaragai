import { Link } from 'react-router-dom';
import { OQ } from '../data.js';
import { I } from '../icons.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

export function EventsHubPage({ cart, onBurger }) {
  const upcoming = OQ.eventsEvent.filter((e) => !e.past).length;
  const archive = OQ.eventsEvent.filter((e) => e.past).length;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Афиша курорта"
        title="Мероприятия"
        desc="Выберите направление: яркие события для гостей или площадки MICE для вашего бизнеса."
        image="https://oq-prod.storage.yandexcloud.kz/media-test/9dc9a54825f5be9e69cc9dfeba062a69.jpg"
        stats={[
          { value: upcoming, label: 'событий Event' },
          { value: OQ.corporateAll.length, label: 'форматов MICE' },
          { value: archive, label: 'в архиве' },
        ]}
      />

      <div className="page-body">
        <div className="wrap">
          <div className="events-hub-grid">
            {OQ.eventsHub.portals.map((portal) => (
              <Link
                key={portal.slug}
                to={`/events/${portal.slug}`}
                className={'events-hub-card events-hub-card--' + portal.slug}
              >
                <img
                  className="events-hub-card-bg"
                  src={portal.img}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                />
                <div className="events-hub-card-scrim" aria-hidden="true" />
                <div className="events-hub-card-body">
                  <span className="events-hub-card-tag">{portal.tag}</span>
                  <h2 className="events-hub-card-title">{portal.title}</h2>
                  <p className="events-hub-card-desc">{portal.desc}</p>
                  <ul className="events-hub-card-highlights">
                    {portal.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <span className="events-hub-card-cta">
                    {portal.cta}
                    <I.arrowRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="events-hub-mice">
            <div className="events-hub-mice-copy">
              <span className="eyebrow">MICE · Для бизнеса</span>
              <h3>Нужен корпоратив или конференция?</h3>
              <p>
                Скачайте каталог площадок или рассчитайте бюджет мероприятия в
                онлайн-калькуляторе.
              </p>
            </div>
            <div className="events-hub-mice-actions">
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
      </div>
    </PageShell>
  );
}
