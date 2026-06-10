import { Link } from 'react-router-dom';
import { DetailBack } from './DetailBack.jsx';

export function NotFoundDetail({ sectionLabel }) {
  return (
    <div className="detail-not-found">
      <DetailBack />
      <div className="detail-not-found-card">
        <span className="eyebrow">404</span>
        <h1 className="detail-not-found-title">Услуга не найдена</h1>
        <p>
          {sectionLabel
            ? `Запрашиваемый объект в разделе «${sectionLabel}» не существует или был удалён.`
            : 'Запрашиваемый объект не существует или был удалён.'}
        </p>
        <div className="detail-not-found-actions">
          <Link className="btn btn-accent" to="/guide">
            К каталогу курорта
          </Link>
          <Link className="btn btn-ghost" to="/">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
