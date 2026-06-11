import { useNavigate } from 'react-router-dom';
import { I } from '../../icons.jsx';

export function DetailBack({ fallback = '/guide' }) {
  const navigate = useNavigate();

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
      Назад
    </button>
  );
}
