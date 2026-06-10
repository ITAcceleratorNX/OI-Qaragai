import { OQ } from '../data.js';
import { I } from '../icons.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

function CorporateCard({ e }) {
  return (
    <article className="corp-card">
      <img src={e.img} alt={e.title} loading="lazy" />
      <div className="corp-card-body">
        <span className="badge badge-dark" style={{ position: 'static' }}>
          MICE
        </span>
        <h3>{e.title}</h3>
        <p>{e.desc}</p>
        <div className="corp-card-foot">
          <span className="ev-date">
            <I.calendar size={16} />
            {e.date}
          </span>
          <button className="btn btn-sm btn-ghost">
            {e.cta}
            <I.arrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function CorporateEventsPage({ cart, onBurger }) {
  const { mice, corporateAll } = OQ;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Корпоративные"
        title="MICE на курорте"
        desc="Конференции, тимбилдинги и корпоративы в горах — полный сервис от идеи до реализации."
        image="https://oq-prod.storage.yandexcloud.kz/media-test/c625a507521f98262ca3793138f93c1a.png"
        backLabel="Мероприятия"
        backTo="/events"
        stats={mice.stats}
      />

      <div className="page-body">
        <div className="wrap">
          <section className="corp-cta-panel" aria-label="Действия для бизнеса">
            <div className="corp-cta-panel-glow" aria-hidden="true" />
            <div className="corp-cta-panel-inner">
              <div className="corp-cta-panel-copy">
                <span className="corp-cta-panel-eyebrow">Начните планирование</span>
                <h2>Всё для вашего мероприятия — в одном месте</h2>
                <p>
                  Изучите возможности курорта в MICE-каталоге или рассчитайте
                  бюджет в интерактивном калькуляторе за несколько минут.
                </p>
              </div>
              <div className="corp-cta-panel-actions">
                <a
                  className="corp-cta-btn corp-cta-btn--catalog"
                  href={mice.catalogPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="corp-cta-btn-icon">
                    <I.doc size={22} />
                  </span>
                  <span className="corp-cta-btn-text">
                    <strong>Изучить возможности курорта</strong>
                    <small>MICE-каталог · PDF</small>
                  </span>
                  <I.arrowRight size={18} className="corp-cta-btn-arrow" />
                </a>
                <a
                  className="corp-cta-btn corp-cta-btn--calc"
                  href={mice.calculatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="corp-cta-btn-icon">
                    <I.calc size={22} />
                  </span>
                  <span className="corp-cta-btn-text">
                    <strong>Калькулятор мероприятия</strong>
                    <small>Рассчитать бюджет онлайн</small>
                  </span>
                  <I.arrowRight size={18} className="corp-cta-btn-arrow" />
                </a>
              </div>
            </div>
          </section>

          <section className="corp-features">
            {mice.features.map((f) => (
              <div key={f.title} className="corp-feature">
                <span className="corp-feature-n">{f.n}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </section>

          <div className="corp-offerings-head">
            <h3 className="listing-subhead">Форматы мероприятий</h3>
            <p className="corp-offerings-desc">
              Площадки, кейтеринг и полный MICE-сервис — круглый год.
            </p>
          </div>

          <div className="corp-grid">
            {corporateAll.map((e) => (
              <CorporateCard key={e.title} e={e} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
