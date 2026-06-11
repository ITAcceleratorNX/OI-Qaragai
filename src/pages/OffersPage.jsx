import { useState } from 'react';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { Card } from '../components/Card.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { ListingToolbar } from '../components/ListingToolbar.jsx';
import { ListingEmpty } from '../components/ListingEmpty.jsx';
import { OfferSpotlight } from '../components/OfferSpotlight.jsx';

const FILTER_IDS = ['all', 'packages', 'spa', 'activities'];

export function OffersPage({ cart, onBuy, onBurger }) {
  const { t } = useTranslation();
  const oq = useOQ();
  const [f, setF] = useState('all');

  const list =
    f === 'all'
      ? oq.offersAll
      : oq.offersAll.filter((o) => o.categoryKey === f);

  const spotlight = f === 'all' ? oq.offersAll[0] : null;
  const grid = spotlight ? list.slice(1) : list;

  const filters = FILTER_IDS.map((key) => ({
    key,
    label: t(`filters.${key}`),
    count:
      key === 'all'
        ? oq.offersAll.length
        : oq.offersAll.filter((o) => o.categoryKey === key).length,
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
        image="https://oq-prod.storage.yandexcloud.kz/media-test/3cbc915db86b87188ea60419d4c0b89b.jpg"
        stats={[
          { value: oq.offersAll.length, label: t('pages.offers.statOffers') },
          { value: '12 000 ₸', label: t('pages.offers.statFrom') },
          { value: '−25%', label: t('pages.offers.statDiscount') },
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
              onReset={() => setF('all')}
            />
          ) : (
            <div className="listing-stack">
              {spotlight && <OfferSpotlight offer={spotlight} onBuy={onBuy} />}
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
