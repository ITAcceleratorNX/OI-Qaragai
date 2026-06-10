import { useState } from 'react';
import { OQ } from '../data.js';
import { I } from '../icons.jsx';
import { Card } from '../components/Card.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

const typeFilters = ['Все', 'Отели', 'Рестораны', 'Развлечения', 'SPA'];

export function GuidePage({ cart, onBuy, onBurger }) {
  const [zone, setZone] = useState('all');
  const [type, setType] = useState('Все');

  const list = OQ.thingsAll.filter((t) => {
    const zoneOk = zone === 'all' || t.zone === zone;
    const typeOk = type === 'Все' || t.type === type;
    return zoneOk && typeOk;
  });

  const countType = (k) =>
    k === 'Все'
      ? OQ.thingsAll.filter((t) => zone === 'all' || t.zone === zone).length
      : OQ.thingsAll.filter(
          (t) =>
            t.type === k && (zone === 'all' || t.zone === zone)
        ).length;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Карта курорта"
        title="Чем заняться на Oi-Qaragai"
        desc="Интерактивная карта зон курорта и полный каталог отелей, ресторанов, активностей и SPA."
      />

      <section className="section page-section">
        <div className="wrap">
          <div className="resort-map">
            <img
              className="resort-map-bg"
              src="https://oq-prod.storage.yandexcloud.kz/media-test/672781f715c9dfff7e6f26a11daef8b6.jpg"
              alt=""
              aria-hidden="true"
            />
            <div className="resort-map-overlay" aria-hidden="true" />
            <div className="resort-map-ui">
              <span className="resort-map-label">Карта курорта</span>
              <span className="resort-map-hint">Выберите зону на карте</span>
            </div>
            {OQ.mapZones.map((z) => {
              const Ic = I[z.icon];
              const active = zone === z.id;
              return (
                <button
                  key={z.id}
                  type="button"
                  className={'map-pin' + (active ? ' active' : '')}
                  style={{ left: z.x + '%', top: z.y + '%' }}
                  onClick={() => setZone(z.id)}
                  aria-pressed={active}
                >
                  <span className="map-pin-dot">
                    <Ic size={16} />
                  </span>
                  <span className="map-pin-label">{z.label}</span>
                </button>
              );
            })}
          </div>

          <div className="page-toolbar">
            {typeFilters.map((x) => (
              <button
                key={x}
                className={'pill ' + (type === x ? 'active' : '')}
                onClick={() => setType(x)}
              >
                {x}
                <span className="count">{countType(x)}</span>
              </button>
            ))}
          </div>

          <p className="page-result">
            {list.length}{' '}
            {list.length === 1
              ? 'объект'
              : list.length < 5
                ? 'объекта'
                : 'объектов'}
            {zone !== 'all' &&
              ` в зоне «${OQ.mapZones.find((z) => z.id === zone)?.label}»`}
          </p>

          <div className="cards-grid cards-4">
            {list.map((t) => (
              <Card key={t.title} d={t} onBuy={onBuy} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
