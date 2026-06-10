import { useEffect } from 'react';
import { I } from '../../icons.jsx';

export function MenuModal({ open, onClose, title, menuPdf, menuPreview }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="detail-modal-back" onClick={onClose} role="presentation">
      <div
        className="detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Меню: ${title}`}
      >
        <div className="detail-modal-head">
          <h2>Меню · {title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Закрыть">
            <I.close size={20} />
          </button>
        </div>
        <div className="detail-modal-body">
          {menuPreview?.map((block) => (
            <div className="menu-block" key={block.section}>
              <h3>{block.section}</h3>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {menuPdf && (
            <div className="menu-pdf">
              <iframe src={menuPdf} title={`PDF меню ${title}`} />
              <a className="btn btn-outline btn-sm" href={menuPdf} target="_blank" rel="noopener noreferrer">
                Открыть PDF в новой вкладке
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
