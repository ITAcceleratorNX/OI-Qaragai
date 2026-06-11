import { useNavigate } from 'react-router-dom';
import { I } from '../../icons.jsx';
import { useTranslation } from '../../i18n/LanguageProvider.jsx';

export function DetailBack({ fallback = '/guide' }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button type="button" className="page-back" onClick={goBack}>
      <I.arrowLeft size={16} />
      {t('detail.back')}
    </button>
  );
}
