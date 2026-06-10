import { useState } from 'react';
import { OQ } from '../data.js';
import { Card } from '../components/Card.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { ListingToolbar } from '../components/ListingToolbar.jsx';
import { ListingEmpty } from '../components/ListingEmpty.jsx';
import { OfferSpotlight } from '../components/OfferSpotlight.jsx';

const FILTER_KEYS = ['Все', 'Пакеты', 'SPA', 'Ски-пасс', 'Активности'];

export function OffersPage({ cart, onBuy, onBurger }) {
  const [f, setF] = useState('Все');

  const list =
    f === 'Все'
      ? OQ.offersAll
      : OQ.offersAll.filter((o) => o.category === f);

  const spotlight = f === 'Все' ? OQ.offersAll[0] : null;
  const grid = spotlight ? list.slice(1) : list;

  const filters = FILTER_KEYS.map((key) => ({
    key,
    label: key,
    count:
      key === 'Все'
        ? OQ.offersAll.length
        : OQ.offersAll.filter((o) => o.category === key).length,
  }));

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Выгодно"
        title="Все предложения"
        desc="Готовые пакеты на зимний сезон — от уикенда в шале до SPA и ски-пассов."
        image="https://oq-prod.storage.yandexcloud.kz/media-test/766b42f1e7f3533af60e997a726f61d5.jpg"
        stats={[
          { value: OQ.offersAll.length, label: 'предложений' },
          { value: '12 000 ₸', label: 'от' },
          { value: '−25%', label: 'макс. скидка' },
        ]}
      />

      <div className="page-body">
        <div className="wrap">
          <ListingToolbar
            filters={filters}
            active={f}
            onChange={setF}
            count={list.length}
            label={list.length === 1 ? 'предложение' : list.length < 5 ? 'предложения' : 'предложений'}
          />

          {list.length === 0 ? (
            <ListingEmpty
              title="Нет предложений в этой категории"
              desc="Попробуйте другой фильтр — у нас есть пакеты, SPA, ски-пассы и активности."
              onReset={() => setF('Все')}
            />
          ) : (
            <div className="listing-stack">
              {spotlight && (
                <OfferSpotlight offer={spotlight} onBuy={onBuy} />
              )}
              <div className="cards-grid cards-3 listing-cards">
                {grid.map((o) => (
                  <Card key={o.title} d={o} wide onBuy={onBuy} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
