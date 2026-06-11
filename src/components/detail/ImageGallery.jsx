import { useState } from 'react';
import { ImageLightbox } from '../ImageLightbox.jsx';

export function ImageGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  if (!images?.length) return null;

  return (
    <>
      <div className="detail-gallery">
        <button
          type="button"
          className="detail-gallery-main"
          onClick={() => setLightbox(active)}
          aria-label="Открыть фото"
        >
          <img src={images[active]} alt={alt} />
        </button>
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

      {lightbox !== null && (
        <ImageLightbox
          images={images}
          index={lightbox}
          alt={alt}
          onClose={() => setLightbox(null)}
          onIndex={setLightbox}
        />
      )}
    </>
  );
}
