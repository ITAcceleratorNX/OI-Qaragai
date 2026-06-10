import { useState } from 'react';
import { OQ } from '../data.js';
import { Card } from '../components/Card.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

const filters = ['Все', 'Пакеты', 'SPA', 'Ски-пасс', 'Активности'];

export function OffersPage({ cart, onBuy, onBurger }) {
  const [f, setF] = useState('Все');
  const list =
    f === 'Все'
      ? OQ.offersAll
      : OQ.offersAll.filter((o) => o.category === f);
  const countFor = (k) =>
    k === 'Все'
      ? OQ.offersAll.length
      : OQ.offersAll.filter((o) => o.category === k).length;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Выгодно"
        title="Все предложения"
        desc="Пакеты, SPA, ски-пассы и активности — готовые варианты для отдыха в горах."
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
          <div className="cards-grid cards-3">
            {list.map((o) => (
              <Card key={o.title} d={o} wide onBuy={onBuy} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
