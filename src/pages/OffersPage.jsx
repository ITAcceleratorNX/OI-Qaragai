import { useState } from 'react';
import { listingFilters } from '../data/helpers.js';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { Card } from '../components/Card.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { ListingToolbar } from '../components/ListingToolbar.jsx';
import { ListingEmpty } from '../components/ListingEmpty.jsx';
import { OfferSpotlight } from '../components/OfferSpotlight.jsx';

export function OffersPage({ cart, onBuy, onBurger }) {
  const { t } = useTranslation();
  const oq = useOQ();
  const [f, setF] = useState('Все');
  const filterKeys = listingFilters(oq.offersAll, (o) => o.category);

  const list =
    f === 'Все'
      ? oq.offersAll
      : oq.offersAll.filter((o) => o.category === f);

  const spotlight = f === 'Все' ? oq.offersAll[0] : null;
  const grid = spotlight ? list.slice(1) : list;

  const filters = filterKeys.map((key) => ({
    key,
    label: key === 'Все' ? t('filters.all') : key,
    count:
      key === 'Все'
        ? oq.offersAll.length
        : oq.offersAll.filter((o) => o.category === key).length,
  }));

  const countLabel =
    list.length === 1
      ? t('pages.offers.offerOne')
      : list.length < 5
        ? t('pages.offers.offerFew')
        : t('pages.offers.offerMany');

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('pages.offers.eyebrow')}
        title={t('pages.offers.title')}
        desc={t('pages.offers.desc')}
        image={oq.pageHero.offers}
        stats={[
          { value: oq.offersAll.length, label: t('pages.offers.statOffers') },
          { value: oq.offersMeta.priceFrom, label: t('pages.offers.statFrom') },
          { value: oq.offersMeta.maxDiscount, label: t('pages.offers.statDiscount') },
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
              title={t('pages.offers.emptyTitle')}
              desc={t('pages.offers.emptyDesc')}
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
