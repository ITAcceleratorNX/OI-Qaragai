import { useState } from 'react';
import { OQ } from '../data.js';
import { Card } from '../components/Card.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { ListingToolbar } from '../components/ListingToolbar.jsx';
import { ListingEmpty } from '../components/ListingEmpty.jsx';

const TYPE_KEYS = ['Все', 'Отели', 'Рестораны', 'Развлечения', 'SPA'];
const SECTION_ORDER = ['Отели', 'Рестораны', 'Развлечения', 'SPA'];

export function GuidePage({ cart, onBuy, onBurger }) {
  const [type, setType] = useState('Все');

  const list =
    type === 'Все'
      ? OQ.thingsAll
      : OQ.thingsAll.filter((t) => t.type === type);

  const countType = (k) =>
    k === 'Все'
      ? OQ.thingsAll.length
      : OQ.thingsAll.filter((t) => t.type === k).length;

  const filters = TYPE_KEYS.map((key) => ({
    key,
    label: key,
    count: countType(key),
  }));

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Карта курорта"
        title="Чем заняться на Oi-Qaragai"
        desc="Отели, рестораны, активности и SPA — всё в одном гиде по курорту."
        image="https://oq-prod.storage.yandexcloud.kz/media-test/672781f715c9dfff7e6f26a11daef8b6.jpg"
        stats={[
          { value: OQ.thingsAll.length, label: 'объектов' },
          { value: '4', label: 'категории' },
          { value: '365', label: 'дней в году' },
        ]}
      />

      <div className="page-body">
        <div className="wrap">
          <ListingToolbar
            filters={filters}
            active={type}
            onChange={setType}
            count={list.length}
            label={
              list.length === 1
                ? 'объект'
                : list.length < 5
                  ? 'объекта'
                  : 'объектов'
            }
          />

          {list.length === 0 ? (
            <ListingEmpty
              title="Ничего не найдено"
              desc="Выберите другую категорию — на курорте есть отели, рестораны, активности и SPA."
              onReset={() => setType('Все')}
            />
          ) : type === 'Все' ? (
            <div className="listing-groups">
              {SECTION_ORDER.map((section) => {
                const items = OQ.thingsAll.filter((t) => t.type === section);
                if (!items.length) return null;
                return (
                  <section className="listing-group" key={section}>
                    <h2 className="listing-group-title">{section}</h2>
                    <div className="cards-grid cards-4 listing-cards">
                      {items.map((t) => (
                        <Card key={t.title} d={t} onBuy={onBuy} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="cards-grid cards-4 listing-cards">
              {list.map((t) => (
                <Card key={t.title} d={t} onBuy={onBuy} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
