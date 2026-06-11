import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { I } from '../icons.jsx';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

function normalizeImages(images) {
  return images.map((item) =>
    typeof item === 'string' ? { src: item, caption: '' } : { src: item.src, caption: item.caption || '' }
  );
}

export function ImageLightbox({ images, index, onClose, onIndex, alt = '' }) {
  const { t } = useTranslation();
  const items = normalizeImages(images);
  const count = items.length;
  const cur = items[index] ?? items[0];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && count > 1) onIndex((index + 1) % count);
      if (e.key === 'ArrowLeft' && count > 1) onIndex((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count, index, onClose, onIndex]);

  if (!cur) return null;

  return createPortal(
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={t('lightbox.aria')}>

      <div className="lb-topbar" onClick={(e) => e.stopPropagation()}>
        <span className="lb-counter-placeholder" />
        {count > 1 && (
          <span className="lb-counter">{index + 1} / {count}</span>
        )}
        <button type="button" className="lb-close" onClick={onClose} aria-label={t('common.close')}>
          <I.close size={16} />
          {t('common.close')}
        </button>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="lb-nav lb-prev"
            onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + count) % count); }}
            aria-label={t('lightbox.prev')}
          >
            <I.arrowLeft size={20} />
          </button>
          <button
            type="button"
            className="lb-nav lb-next"
            onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % count); }}
            aria-label={t('lightbox.next')}
          >
            <I.arrowRight size={20} />
          </button>
        </>
      )}

      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        <img className="lb-img" src={cur.src} alt={cur.caption || alt} />
        {cur.caption && <p className="lb-caption">{cur.caption}</p>}
      </div>

    </div>,
    document.body
  );
}
