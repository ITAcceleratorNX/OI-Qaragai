import { useState } from 'react';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { Card } from '../components/Card.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { ListingToolbar } from '../components/ListingToolbar.jsx';
import { ListingEmpty } from '../components/ListingEmpty.jsx';

const FILTER_IDS = ['all', 'hotels', 'restaurants', 'fun', 'spa'];
const SECTION_IDS = ['hotels', 'restaurants', 'fun', 'spa'];

export function GuidePage({ cart, onBuy, onBurger }) {
  const { t } = useTranslation();
  const oq = useOQ();
  const [type, setType] = useState('all');

  const list =
    type === 'all'
      ? oq.thingsAll
      : oq.thingsAll.filter((item) => item.typeKey === type);

  const countType = (k) =>
    k === 'all'
      ? oq.thingsAll.length
      : oq.thingsAll.filter((item) => item.typeKey === k).length;

  const filters = FILTER_IDS.map((key) => ({
    key,
    label: t(`filters.${key}`),
    count: countType(key),
  }));

  const countLabel =
    list.length === 1
      ? t('pages.guide.objectOne')
      : list.length < 5
        ? t('pages.guide.objectFew')
        : t('pages.guide.objectMany');

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('pages.guide.eyebrow')}
        title={t('pages.guide.title')}
        desc={t('pages.guide.desc')}
        image={oq.pageHero.guide}
        stats={[
          { value: oq.thingsAll.length, label: t('pages.guide.statObjects') },
          { value: '4', label: t('pages.guide.statCategories') },
          { value: oq.mice.stats[2].value, label: t('pages.guide.statDays') },
        ]}
      />

      <div className="page-body">
        <div className="wrap">
          <ListingToolbar
            filters={filters}
            active={type}
            onChange={setType}
            count={list.length}
            label={countLabel}
          />

          {list.length === 0 ? (
            <ListingEmpty
              title={t('pages.guide.emptyTitle')}
              desc={t('pages.guide.emptyDesc')}
              onReset={() => setType('all')}
            />
          ) : type === 'all' ? (
            <div className="listing-groups">
              {SECTION_IDS.map((section) => {
                const items = oq.thingsAll.filter((item) => item.typeKey === section);
                if (!items.length) return null;
                return (
                  <section className="listing-group" key={section}>
                    <h2 className="listing-group-title">{t(`types.${section}`)}</h2>
                    <div className="cards-grid cards-4 listing-cards">
                      {items.map((item) => (
                        <Card key={item.title} d={item} onBuy={onBuy} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="cards-grid cards-4 listing-cards">
              {list.map((item) => (
                <Card key={item.title} d={item} onBuy={onBuy} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
