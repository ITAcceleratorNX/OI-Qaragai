import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from '../data/details.js';
import { PageShell } from '../components/PageShell.jsx';
import { DetailBack } from '../components/detail/DetailBack.jsx';
import { NotFoundDetail } from '../components/detail/NotFoundDetail.jsx';
import { I } from '../icons.jsx';
import { ImageLightbox } from '../components/ImageLightbox.jsx';

export function ActivityDetailPage({ cart, onBurger, onBuy }) {
  const { id } = useParams();
  const item = findById('activities', id);
  const [lightbox, setLightbox] = useState(false);

  if (!item) {
    return (
      <PageShell cart={cart} onBurger={onBurger}>
        <NotFoundDetail sectionLabel="Развлечения" />
      </PageShell>
    );
  }

  const { safety } = item;

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <article className="detail-page">
        <div className="wrap">
          <DetailBack />
          <header className="detail-header">
            <span className="eyebrow">Активность</span>
            <h1 className="detail-title">{item.name}</h1>
          </header>

          <div className="detail-safety">
            <h2>
              <I.ski size={22} />
              Ограничения по безопасности
            </h2>
            <div className="detail-safety-grid">
              <div className="detail-safety-item">
                <span className="detail-safety-label">Возраст</span>
                <span className="detail-safety-value">{safety.age}</span>
              </div>
              <div className="detail-safety-item">
                <span className="detail-safety-label">Рост</span>
                <span className="detail-safety-value">
                  {safety.height.min} – {safety.height.max} см
                </span>
              </div>
              <div className="detail-safety-item">
                <span className="detail-safety-label">Вес</span>
                <span className="detail-safety-value">
                  {safety.weight.min} – {safety.weight.max} кг
                </span>
              </div>
            </div>
          </div>

          <div className="detail-layout">
            <div className="detail-main">
              <div className="detail-media-hero">
                {item.media.type === 'video' ? (
                  <video src={item.media.src} controls poster={item.media.poster} />
                ) : (
                  <button
                    type="button"
                    className="detail-media-open"
                    onClick={() => setLightbox(true)}
                    aria-label="Открыть фото"
                  >
                    <img src={item.media.src} alt={item.name} />
                  </button>
                )}
              </div>
              <p className="detail-desc">{item.description}</p>

              <div className="detail-pricelist">
                <h2>Прайс-лист</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Услуга</th>
                      <th>Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.priceList.map((row) => (
                      <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>
                          <b>{row.price}</b> ₸ <span className="per">/ {row.unit}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="detail-aside">
              <div className="detail-card detail-card--price">
                <span className="detail-price-label">от</span>
                <span className="detail-price-val">
                  <b>{item.ticketPrice}</b> ₸
                </span>
                <span className="detail-price-per">/ билет</span>
              </div>
              <button
                type="button"
                className="btn btn-accent btn-block"
                onClick={() =>
                  onBuy?.({
                    id: item.id,
                    title: item.name,
                    price: item.ticketPrice,
                    img: item.media?.src,
                    category: 'Активность',
                    per: 'билет',
                  })
                }
              >
                Купить билет
                <I.arrowRight size={16} />
              </button>
            </aside>
          </div>
        </div>
      </article>

      {lightbox && item.media.type !== 'video' && (
        <ImageLightbox
          images={[item.media.src]}
          index={0}
          alt={item.name}
          onClose={() => setLightbox(false)}
          onIndex={() => {}}
        />
      )}
    </PageShell>
  );
}
