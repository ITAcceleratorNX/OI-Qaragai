import { useState } from 'react';
import { OQ } from '../data.js';
import { I } from '../icons.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

const filters = ['Все', 'Event', 'Корпоративные', 'Прошедшие'];

function EventCard({ e, large }) {
  return (
    <article className={'listing-event' + (large ? ' listing-event--lg' : '')}>
      <div className="listing-event-media">
        <img src={e.img} alt={e.title} loading="lazy" />
        {e.past && <span className="listing-event-past">Прошедшее</span>}
      </div>
      <div className="listing-event-body">
        <span
          className={
            'badge ' + (e.category === 'Event' ? 'badge-accent' : 'badge-dark')
          }
          style={{ position: 'static' }}
        >
          {e.category}
        </span>
        <h3>{e.title}</h3>
        <p>{e.desc}</p>
        <div className="listing-event-foot">
          <span className="ev-date">
            <I.calendar size={16} />
            {e.date}
          </span>
          <button
            className={
              'btn btn-sm ' + (e.cta === 'Купить билет' ? 'btn-accent' : 'btn-ghost')
            }
          >
            {e.cta}
            <I.arrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function EventsPage({ cart, onBurger }) {
  const [f, setF] = useState('Все');

  const list = OQ.eventsAll.filter((e) => {
    if (f === 'Все') return true;
    if (f === 'Прошедшие') return e.past;
    return e.category === f && !e.past;
  });

  const featured = list.find((e) => e.featured && !e.past);
  const rest = list.filter((e) => e !== featured);

  const countFor = (k) => {
    if (k === 'Все') return OQ.eventsAll.length;
    if (k === 'Прошедшие') return OQ.eventsAll.filter((e) => e.past).length;
    return OQ.eventsAll.filter((e) => e.category === k && !e.past).length;
  };

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Афиша"
        title="Все мероприятия"
        desc="События курорта, корпоративные площадки и архив прошедших мероприятий."
      />

      <section className="section page-section">
        <div className="wrap">
          <div className="page-toolbar">
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

          {featured && f !== 'Прошедшие' && (
            <div className="listing-featured">
              <EventCard e={featured} large />
            </div>
          )}

          <div className="listing-events-grid">
            {(f === 'Прошедшие' || !featured ? list : rest).map((e) => (
              <EventCard key={e.title + e.date} e={e} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
