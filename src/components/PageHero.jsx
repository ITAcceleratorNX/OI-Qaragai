import { Link } from 'react-router-dom';
import { I } from '../icons.jsx';

export function PageHero({ eyebrow, title, desc, backLabel = 'На главную', backTo = '/' }) {
  return (
    <header className="page-hero">
      <div className="wrap">
        <Link className="page-back" to={backTo}>
          <I.arrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
          {backLabel}
        </Link>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="page-title">{title}</h1>
        {desc && <p className="page-desc">{desc}</p>}
      </div>
    </header>
  );
}
