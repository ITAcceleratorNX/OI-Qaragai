import { Link } from 'react-router-dom';
import { DetailBack } from './DetailBack.jsx';
import { useTranslation } from '../../i18n/LanguageProvider.jsx';

export function NotFoundDetail({ sectionLabel }) {
  const { t } = useTranslation();
  return (
    <div className="detail-not-found">
      <DetailBack />
      <div className="detail-not-found-card">
        <span className="eyebrow">404</span>
        <h1 className="detail-not-found-title">{t('detail.notFoundTitle')}</h1>
        <p>
          {sectionLabel
            ? t('detail.notFoundDescSection', { section: sectionLabel })
            : t('detail.notFoundDesc')}
        </p>
        <div className="detail-not-found-actions">
          <Link className="btn btn-accent" to="/guide">
            {t('detail.toGuide')}
          </Link>
          <Link className="btn btn-ghost" to="/">
            {t('detail.toHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
