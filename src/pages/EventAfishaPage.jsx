import { useMemo, useState } from 'react';
import { OQ } from '../data.js';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { ListingToolbar } from '../components/ListingToolbar.jsx';
import { ListingEmpty } from '../components/ListingEmpty.jsx';
import { EventCard } from '../components/EventCard.jsx';

const FILTER_KEYS = ['Все', 'Предстоящие', 'Прошедшие'];

function sortByCalendar(events, pastFirst = false) {
  return [...events].sort((a, b) => {
    const da = a.sortDate ? new Date(a.sortDate) : new Date('2099-12-31');
    const db = b.sortDate ? new Date(b.sortDate) : new Date('2099-12-31');
    return pastFirst ? db - da : da - db;
  });
}

function monthLabel(sortDate) {
  if (!sortDate) return 'Без даты';
  return new Date(sortDate).toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });
}

function groupPastByMonth(events) {
  const groups = new Map();
  for (const e of sortByCalendar(events, true)) {
    const key = monthLabel(e.sortDate);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(e);
  }
  return [...groups.entries()];
}

export function EventAfishaPage({ cart, onBurger }) {
  const [f, setF] = useState('Все');

  const upcoming = useMemo(
    () => sortByCalendar(OQ.eventsEvent.filter((e) => !e.past)),
    []
  );
  const past = useMemo(
    () => sortByCalendar(OQ.eventsEvent.filter((e) => e.past), true),
    []
  );

  const list = useMemo(() => {
    if (f === 'Предстоящие') return upcoming;
    if (f === 'Прошедшие') return past;
    return sortByCalendar(OQ.eventsEvent);
  }, [f, upcoming, past]);

  const featured = f !== 'Прошедшие' ? upcoming.find((e) => e.featured) : null;
  const side = featured ? upcoming.filter((e) => e !== featured).slice(0, 2) : [];
  const restUpcoming = featured
    ? upcoming.filter((e) => e !== featured && !side.includes(e))
    : upcoming;

  const pastGroups = useMemo(() => groupPastByMonth(past), [past]);

  const countFor = (k) => {
    if (k === 'Все') return OQ.eventsEvent.length;
    if (k === 'Прошедшие') return past.length;
    return upcoming.length;
  };

  const filters = FILTER_KEYS.map((key) => ({
    key,
    label: key,
    count: countFor(key),
  }));

  const showMagazine = f === 'Все' && featured;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Event"
        title="Афиша событий"
        desc="Концерты, фестивали и активности курорта — предстоящие и архив прошедших по календарю."
        image="https://oq-prod.storage.yandexcloud.kz/media-test/4ab09cd056b46f8a04eb02a41cc9fdc4.jpg"
        backLabel="Мероприятия"
        backTo="/events"
        stats={[
          { value: upcoming.length, label: 'предстоящих' },
          { value: past.length, label: 'в архиве' },
          { value: OQ.eventsEvent.length, label: 'всего' },
        ]}
      />

      <div className="page-body">
        <div className="wrap">
          <ListingToolbar
            filters={filters}
            active={f}
            onChange={setF}
            count={list.length}
            label={list.length === 1 ? 'событие' : list.length < 5 ? 'события' : 'событий'}
          />

          {list.length === 0 ? (
            <ListingEmpty
              title="Событий не найдено"
              desc="Попробуйте другой фильтр или загляните позже — афиша обновляется регулярно."
              onReset={() => setF('Все')}
            />
          ) : f === 'Прошедшие' ? (
            <div className="events-calendar">
              {pastGroups.map(([month, items]) => (
                <section key={month} className="events-calendar-month">
                  <h3 className="events-calendar-label">
                    <span className="events-calendar-dot" aria-hidden="true" />
                    {month}
                  </h3>
                  <div className="events-page-grid">
                    {items.map((e) => (
                      <EventCard key={e.title + e.date} e={e} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : showMagazine ? (
            <div className="listing-stack">
              <div className="events-grid events-page-hero">
                <EventCard e={featured} variant="big" />
                <div className="ev-side">
                  {side.map((e) => (
                    <EventCard key={e.title + e.date} e={e} />
                  ))}
                </div>
              </div>
              {restUpcoming.length > 0 && (
                <div className="events-page-more">
                  <h3 className="listing-subhead">Скоро на курорте</h3>
                  <div className="events-page-grid">
                    {restUpcoming.map((e) => (
                      <EventCard key={e.title + e.date} e={e} />
                    ))}
                  </div>
                </div>
              )}
              {past.length > 0 && (
                <div className="events-page-more">
                  <h3 className="listing-subhead">Архив по календарю</h3>
                  <div className="events-calendar">
                    {pastGroups.map(([month, items]) => (
                      <section key={month} className="events-calendar-month">
                        <h4 className="events-calendar-label events-calendar-label--sm">
                          <span className="events-calendar-dot" aria-hidden="true" />
                          {month}
                        </h4>
                        <div className="events-page-grid">
                          {items.map((e) => (
                            <EventCard key={e.title + e.date} e={e} />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="events-page-grid">
              {list.map((e) => (
                <EventCard key={e.title + e.date} e={e} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
