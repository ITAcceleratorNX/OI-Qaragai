import { useState } from 'react';
import { DetailLightbox } from './DetailLightbox.jsx';

export function ImageGallery({ images, alt, large }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  if (!images?.length) return null;

  const openLightbox = (i) => setLightbox(i);

  return (
    <>
      <div className={'detail-gallery' + (large ? ' detail-gallery--large' : '')}>
        <button
          type="button"
          className="detail-gallery-main detail-gallery-open"
          onClick={() => openLightbox(active)}
          aria-label={alt}
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
                onDoubleClick={() => openLightbox(i)}
                aria-label={`${alt} ${i + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <DetailLightbox
        images={images}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
        caption={alt}
      />
    </>
  );
}
