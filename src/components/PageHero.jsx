import { Link } from 'react-router-dom';
import { I } from '../icons.jsx';

export function PageHero({
  eyebrow,
  title,
  desc,
  image,
  stats,
  backLabel = 'На главную',
  backTo = '/',
}) {
  return (
    <header className={'page-hero' + (image ? ' page-hero--cover' : '')}>
      {image && (
        <>
          <img className="page-hero-bg" src={image} alt="" aria-hidden="true" />
          <div className="page-hero-scrim" aria-hidden="true" />
        </>
      )}
      <div className="wrap page-hero-inner">
        <Link className="page-back" to={backTo}>
          <I.arrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
          {backLabel}
        </Link>
        <div className="page-hero-grid">
          <div className="page-hero-copy">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="page-title">{title}</h1>
            {desc && <p className="page-desc">{desc}</p>}
          </div>
          {stats?.length > 0 && (
            <div className="page-hero-stats">
              {stats.map((s) => (
                <div className="page-stat" key={s.label}>
                  <span className="page-stat-n">{s.value}</span>
                  <span className="page-stat-l">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
