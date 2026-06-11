import { useState } from 'react';
import { Link } from 'react-router-dom';
import { I } from '../icons.jsx';
import { useOQ, useTranslation } from '../i18n/LanguageProvider.jsx';
import { PageHero } from '../components/PageHero.jsx';
import { PageShell } from '../components/PageShell.jsx';
import { formatPrice, getCartTotal } from '../lib/cart.js';

function CartEmpty() {
  const { t } = useTranslation();
  return (
    <div className="cart-empty">
      <div className="cart-empty-visual" aria-hidden="true">
        <div className="cart-empty-ring" />
        <I.cart size={42} />
      </div>
      <h2>{t('pages.cart.emptyTitle')}</h2>
      <p>{t('pages.cart.emptyDesc')}</p>
      <div className="cart-empty-actions">
        <Link className="btn btn-accent" to="/offers">
          {t('pages.cart.viewOffers')}
          <I.arrowRight size={16} />
        </Link>
        <Link className="btn btn-outline" to="/guide">
          {t('pages.cart.guide')}
        </Link>
      </div>
    </div>
  );
}

function CartItem({ item, onQty, onRemove }) {
  const { t } = useTranslation();
  return (
    <article className="cart-item">
      <div className="cart-item-media">
        {item.img ? (
          <img src={item.img} alt="" loading="lazy" />
        ) : (
          <div className="cart-item-placeholder">
            <I.star size={24} />
          </div>
        )}
      </div>
      <div className="cart-item-body">
        <div className="cart-item-top">
          <div>
            <span className="cart-item-cat">{item.category}</span>
            <h3>{item.title}</h3>
            {item.per && <p className="cart-item-per">/ {item.per}</p>}
          </div>
          <button
            type="button"
            className="cart-item-remove"
            onClick={() => onRemove(item.id)}
            aria-label={t('pages.cart.remove', { title: item.title })}
          >
            <I.trash size={17} />
          </button>
        </div>
        <div className="cart-item-foot">
          <div className="cart-qty">
            <button
              type="button"
              className="cart-qty-btn"
              onClick={() => onQty(item.id, -1)}
              aria-label="Уменьшить"
            >
              <I.minus size={14} />
            </button>
            <span className="cart-qty-val">{item.qty}</span>
            <button
              type="button"
              className="cart-qty-btn"
              onClick={() => onQty(item.id, 1)}
              aria-label="Увеличить"
            >
              <I.plus size={14} />
            </button>
          </div>
          <div className="cart-item-price">
            <b>{formatPrice(item.price * item.qty)}</b> ₸
          </div>
        </div>
      </div>
    </article>
  );
}

function CartSummary({ items, promo, setPromo, onCheckout }) {
  const subtotal = getCartTotal(items);
  const discount = promo === 'WINTER20' ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal - discount;

  return (
    <aside className="cart-summary">
      <div className="cart-summary-card">
        <h2>Итого</h2>
        <div className="cart-summary-rows">
          <div className="cart-summary-row">
            <span>Товары ({items.length})</span>
            <span>{formatPrice(subtotal)} ₸</span>
          </div>
          {discount > 0 && (
            <div className="cart-summary-row cart-summary-row--discount">
              <span>Скидка WINTER20</span>
              <span>−{formatPrice(discount)} ₸</span>
            </div>
          )}
          <div className="cart-summary-row cart-summary-row--total">
            <span>К оплате</span>
            <span>
              <b>{formatPrice(total)}</b> ₸
            </span>
          </div>
        </div>

        <label className="cart-promo">
          <I.gift size={18} />
          <input
            type="text"
            placeholder="Промокод"
            value={promo}
            onChange={(e) => setPromo(e.target.value.toUpperCase())}
          />
          {promo === 'WINTER20' && (
            <span className="cart-promo-ok" aria-label="Промокод применён">
              <I.check size={16} />
            </span>
          )}
        </label>
        <p className="cart-promo-hint">Попробуйте <kbd>WINTER20</kbd> — скидка 20%</p>

        <button type="button" className="btn btn-accent btn-block" onClick={onCheckout}>
          Оформить заказ
          <I.arrowRight size={16} />
        </button>

        <ul className="cart-perks">
          <li>
            <I.shield size={16} />
            Безопасная оплата
          </li>
          <li>
            <I.clock size={16} />
            Мгновенное подтверждение
          </li>
          <li>
            <I.pin size={16} />
            Бесплатная отмена за 48 ч
          </li>
        </ul>
      </div>
    </aside>
  );
}

export function CartPage({ cart, cartItems, onBurger, onQty, onRemove, onCheckout }) {
  const { t } = useTranslation();
  const oq = useOQ();
  const [promo, setPromo] = useState('');
  const isEmpty = cartItems.length === 0;
  const suggestions = oq.offersAll.slice(0, 3);

  return (
    <PageShell cart={cart} onBurger={onBurger}>
      <PageHero
        eyebrow="Бронирование"
        title={t('pages.cart.title')}
        desc={
          isEmpty
            ? 'Здесь появятся выбранные услуги, пакеты и билеты на курорт.'
            : `${cart} ${cart === 1 ? 'позиция' : cart < 5 ? 'позиции' : 'позиций'} · готовы к оформлению`
        }
      />

      <section className="section page-section">
        <div className="wrap">
          {isEmpty ? (
            <CartEmpty />
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQty={onQty}
                    onRemove={onRemove}
                  />
                ))}
              </div>
              <CartSummary
                items={cartItems}
                promo={promo}
                setPromo={setPromo}
                onCheckout={onCheckout}
              />
            </div>
          )}

          {!isEmpty && (
            <div className="cart-suggest">
              <div className="cart-suggest-head">
                <h2>Добавить к заказу</h2>
                <Link className="link-arrow" to="/offers">
                  Все предложения <I.arrowRight size={16} />
                </Link>
              </div>
              <div className="cart-suggest-grid">
                {suggestions.map((o) => (
                  <Link className="cart-suggest-card" to="/offers" key={o.title}>
                    <img src={o.img} alt="" loading="lazy" />
                    <div>
                      <span>{o.tag || o.category}</span>
                      <h3>{o.title}</h3>
                      <p>
                        от <b>{o.price}</b> ₸
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
