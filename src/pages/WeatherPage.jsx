import { I } from '../icons.jsx';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';

const SUN_ICONS = new Set(['sun']);
const RAIN_ICONS = new Set(['rain']);

function weatherIcon(data) {
  if (SUN_ICONS.has(data.icon)) return I.sun;
  if (RAIN_ICONS.has(data.icon)) return I.cloud;
  return I.cloud;
}

function WeatherCard({ title, data, accent, t }) {
  const Icon = weatherIcon(data);
  return (
    <article className={'weather-card' + (accent ? ' weather-card--accent' : '')}>
      <div className="weather-card-head">
        <h2>{title}</h2>
        {accent && data.open && (
          <span className="weather-open">
            <span className="dot" />
            {t('weather.open')}
          </span>
        )}
      </div>
      <div className="weather-card-main">
        <Icon size={36} />
        <div>
          <p className="weather-temp">{data.temp}</p>
          {data.day && <p className="weather-day">{data.day}</p>}
          <p className="weather-condition">{data.condition}</p>
        </div>
      </div>
      <dl className="weather-meta">
        {data.precipitation && (
          <div>
            <dt>{t('weather.precipitation')}</dt>
            <dd>{data.precipitation}</dd>
          </div>
        )}
        <div>
          <dt>{t('weather.humidity')}</dt>
          <dd>{data.humidity}</dd>
        </div>
        <div>
          <dt>{t('weather.wind')}</dt>
          <dd>{data.wind}</dd>
        </div>
        {data.lifts && (
          <div>
            <dt>{t('weather.lifts')}</dt>
            <dd>{data.lifts}</dd>
          </div>
        )}
        {data.slopes && (
          <div>
            <dt>{t('weather.slopes')}</dt>
            <dd>{data.slopes}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

export function WeatherPage({ cart, onBurger }) {
  const { t } = useTranslation();
  const { city, resort, forecast } = useOQ().weather;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow={t('weather.eyebrow')}
        title={t('weather.title')}
        desc={t('weather.desc')}
      />

      <section className="section page-section">
        <div className="wrap">
          <div className="weather-grid">
            <WeatherCard title={city.name} data={city} t={t} />
            <WeatherCard
              title={`OI·QARAGAI · ${resort.name}`}
              data={resort}
              accent
              t={t}
            />
          </div>

          <h3 className="weather-forecast-title">{t('weather.forecast')}</h3>
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
                    <span>{city.name}</span>
                    <span>{t('weather.resort')}</span>
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
