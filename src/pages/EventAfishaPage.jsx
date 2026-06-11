import { useMemo, useState } from 'react';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { getDateLocale } from '../i18n/utils.js';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { ListingToolbar } from '../components/ListingToolbar.jsx';
import { ListingEmpty } from '../components/ListingEmpty.jsx';
import { EventCard } from '../components/EventCard.jsx';

const FILTER_IDS = ['all', 'upcoming', 'past'];

function sortByCalendar(events, pastFirst = false) {
  return [...events].sort((a, b) => {
    const da = a.sortDate ? new Date(a.sortDate) : new Date('2099-12-31');
    const db = b.sortDate ? new Date(b.sortDate) : new Date('2099-12-31');
    return pastFirst ? db - da : da - db;
  });
}

function monthLabel(sortDate, locale, noDateLabel) {
  if (!sortDate) return noDateLabel;
  return new Date(sortDate).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });
}

function groupPastByMonth(events, locale, noDateLabel) {
  const groups = new Map();
  for (const e of sortByCalendar(events, true)) {
    const key = monthLabel(e.sortDate, locale, noDateLabel);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(e);
  }
  return [...groups.entries()];
}

export function EventAfishaPage({ cart, onBurger }) {
  const { t, lang } = useTranslation();
  const oq = useOQ();
  const [f, setF] = useState('all');
  const locale = getDateLocale(lang);
  const noDateLabel = t('common.noDate');

  const upcoming = useMemo(
    () => sortByCalendar(oq.eventsEvent.filter((e) => !e.past)),
    [oq.eventsEvent]
  );
  const past = useMemo(
    () => sortByCalendar(oq.eventsEvent.filter((e) => e.past), true),
    [oq.eventsEvent]
  );

  const list = useMemo(() => {
    if (f === 'upcoming') return upcoming;
    if (f === 'past') return past;
    return sortByCalendar(oq.eventsEvent);
  }, [f, upcoming, past, oq.eventsEvent]);

  const featured = f !== 'past' ? upcoming.find((e) => e.featured) : null;
  const side = featured ? upcoming.filter((e) => e !== featured).slice(0, 2) : [];
  const restUpcoming = featured
    ? upcoming.filter((e) => e !== featured && !side.includes(e))
    : upcoming;

  const pastGroups = useMemo(
    () => groupPastByMonth(past, locale, noDateLabel),
    [past, locale, noDateLabel]
  );

  const countFor = (k) => {
    if (k === 'all') return oq.eventsEvent.length;
    if (k === 'past') return past.length;
    return upcoming.length;
  };

  const filters = FILTER_IDS.map((key) => ({
    key,
    label: t(`filters.${key}`),
    count: countFor(key),
  }));

  const countLabel =
    list.length === 1
      ? t('pages.eventAfisha.eventOne')
      : list.length < 5
        ? t('pages.eventAfisha.eventFew')
        : t('pages.eventAfisha.eventMany');

  const showMagazine = f === 'all' && featured;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('pages.eventAfisha.eyebrow')}
        title={t('pages.eventAfisha.title')}
        desc={t('pages.eventAfisha.desc')}
        image="https://oq-prod.storage.yandexcloud.kz/media-test/4ab09cd056b46f8a04eb02a41cc9fdc4.jpg"
        backLabel={t('pages.eventAfisha.back')}
        backTo="/events"
        stats={[
          { value: upcoming.length, label: t('pages.eventAfisha.statUpcoming') },
          { value: past.length, label: t('pages.eventAfisha.statArchive') },
          { value: oq.eventsEvent.length, label: t('pages.eventAfisha.statTotal') },
        ]}
      />

      <div className="page-body">
        <div className="wrap">
          <ListingToolbar
            filters={filters}
            active={f}
            onChange={setF}
            count={list.length}
            label={countLabel}
          />

          {list.length === 0 ? (
            <ListingEmpty
              title={t('pages.eventAfisha.emptyTitle')}
              desc={t('pages.eventAfisha.emptyDesc')}
              onReset={() => setF('all')}
            />
          ) : f === 'past' ? (
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
                  <h3 className="listing-subhead">{t('pages.eventAfisha.soon')}</h3>
                  <div className="events-page-grid">
                    {restUpcoming.map((e) => (
                      <EventCard key={e.title + e.date} e={e} />
                    ))}
                  </div>
                </div>
              )}
              {past.length > 0 && (
                <div className="events-page-more">
                  <h3 className="listing-subhead">{t('pages.eventAfisha.archiveCalendar')}</h3>
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
