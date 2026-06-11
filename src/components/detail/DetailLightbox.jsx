import { useEffect } from 'react';
import { I } from '../../icons.jsx';

export function DetailLightbox({ images, index, onClose, onIndex, caption }) {
  const count = images?.length ?? 0;

  useEffect(() => {
    if (index == null || count < 1) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % count);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, count, onClose, onIndex]);

  if (index == null || !images?.length) return null;

  const src = images[index];

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lb-close" onClick={onClose} aria-label="Close">
          <I.close size={20} />
        </button>
        {count > 1 && (
          <>
            <button
              type="button"
              className="lb-nav lb-prev"
              onClick={() => onIndex((index - 1 + count) % count)}
              aria-label="Previous"
            >
              <I.arrowLeft size={22} />
            </button>
            <button
              type="button"
              className="lb-nav lb-next"
              onClick={() => onIndex((index + 1) % count)}
              aria-label="Next"
            >
              <I.arrowRight size={22} />
            </button>
          </>
        )}
        <img className="lb-img" src={src} alt={caption || ''} />
        <div className="lb-cap">
          {caption ? <b>{caption}</b> : <span />}
          <span>
            {index + 1} / {count}
          </span>
        </div>
        {count > 1 && (
          <div className="lb-thumbs">
            {images.map((thumb, i) => (
              <img
                key={thumb + i}
                src={thumb}
                alt=""
                className={i === index ? 'sel' : ''}
                onClick={() => onIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
