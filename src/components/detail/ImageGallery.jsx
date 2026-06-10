import { useState } from 'react';

export function ImageGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  if (!images?.length) return null;

  return (
    <div className="detail-gallery">
      <div className="detail-gallery-main">
        <img src={images[active]} alt={alt} />
      </div>
      {images.length > 1 && (
        <div className="detail-gallery-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={'detail-gallery-thumb' + (i === active ? ' active' : '')}
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
