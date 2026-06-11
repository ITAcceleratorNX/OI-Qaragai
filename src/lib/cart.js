export function parsePrice(value) {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  return Number(String(value).replace(/\s/g, '').replace(/[^\d]/g, '')) || 0;
}

export function formatPrice(value) {
  return parsePrice(value).toLocaleString('ru-RU');
}

export function getCartCount(items) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function getCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function makeCartItem(product) {
  const id = product.id || product.title;
  return {
    id,
    title: product.title,
    price: parsePrice(product.price),
    priceLabel: product.price,
    img: product.img || '',
    category: product.category || '',
    per: product.per || '',
    qty: 1,
  };
}

export function addToCart(items, product) {
  const id = product.id || product.title;
  const existing = items.find((i) => i.id === id);
  if (existing) {
    return items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
  }
  return [...items, makeCartItem(product)];
}

export function updateQty(items, id, delta) {
  return items
    .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
    .filter((i) => i.qty > 0);
}

export function removeFromCart(items, id) {
  return items.filter((i) => i.id !== id);
}
