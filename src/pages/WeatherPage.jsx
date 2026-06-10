import { OQ } from '../data.js';
import { I } from '../icons.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

const { city, resort, forecast } = OQ.weather;

function WeatherCard({ title, data, accent }) {
  const Icon = data.condition === 'Ясно' ? I.sun : I.cloud;
  return (
    <article className={'weather-card' + (accent ? ' weather-card--accent' : '')}>
      <div className="weather-card-head">
        <h2>{title}</h2>
        {accent && data.open && (
          <span className="weather-open">
            <span className="dot" />
            Открыт
          </span>
        )}
      </div>
      <div className="weather-card-main">
        <Icon size={36} />
        <div>
          <p className="weather-temp">{data.temp}</p>
          <p className="weather-condition">{data.condition}</p>
        </div>
      </div>
      <dl className="weather-meta">
        <div>
          <dt>Ветер</dt>
          <dd>{data.wind}</dd>
        </div>
        <div>
          <dt>Влажность</dt>
          <dd>{data.humidity}</dd>
        </div>
        {data.lifts && (
          <div>
            <dt>Подъёмники</dt>
            <dd>{data.lifts}</dd>
          </div>
        )}
        {data.slopes && (
          <div>
            <dt>Трассы</dt>
            <dd>{data.slopes}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

export function WeatherPage({ cart, onBurger }) {
  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Прогноз"
        title="Погода"
        desc="Актуальные условия в Алматы и на курорте OI·QARAGAI — температура, ветер и статус трасс."
      />

      <section className="section page-section">
        <div className="wrap">
          <div className="weather-grid">
            <WeatherCard title={city.name} data={city} />
            <WeatherCard title={`OI·QARAGAI · ${resort.name}`} data={resort} accent />
          </div>

          <h3 className="weather-forecast-title">Прогноз на 7 дней</h3>
          <div className="weather-forecast">
            {forecast.map((row) => {
              const Icon = row.icon === 'sun' ? I.sun : I.cloud;
              return (
                <div className="weather-forecast-row" key={row.day}>
                  <span className="weather-forecast-day">{row.day}</span>
                  <Icon size={20} />
                  <span className="weather-forecast-temps">
                    <span>{row.city}</span>
                    <span className="weather-forecast-sep">/</span>
                    <span>{row.resort}</span>
                  </span>
                  <span className="weather-forecast-labels">
                    <span>город</span>
                    <span>курорт</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
