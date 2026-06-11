import { OQ } from '../data.js';
import { locales } from './locales/index.js';
import { deepMerge, enrichOQ } from './utils.js';

const CTA_KEYS = {
  Купить: 'buy',
  Подробнее: 'details',
  Меню: 'menu',
};

function finalizeItem(item, t) {
  if (!item) return item;
  const next = { ...item };
  if (item.typeKey) next.type = t(`types.${item.typeKey}`);
  if (item.categoryKey) next.category = t(`categories.${item.categoryKey}`);
  const ctaKey = CTA_KEYS[item.cta];
  if (ctaKey) next.cta = t(`cta.${ctaKey}`);
  return next;
}

function finalizeOQ(data, t) {
  const map = (arr) => (Array.isArray(arr) ? arr.map((item) => finalizeItem(item, t)) : arr);
  return {
    ...data,
    things: map(data.things),
    thingsAll: map(data.thingsAll),
    offers: map(data.offers),
    offersAll: map(data.offersAll),
  };
}

export function localizeOQ(lang) {
  const t = (key) => {
    const messages = locales[lang] ?? locales.RU;
    const val = key.split('.').reduce((acc, k) => acc?.[k], messages);
    return val ?? key.split('.').reduce((acc, k) => acc?.[k], locales.RU);
  };

  const base = enrichOQ(OQ);
  if (lang === 'RU') return base;
  const patch = locales[lang]?.oq;
  const merged = patch ? enrichOQ(deepMerge(base, patch)) : base;
  return finalizeOQ(merged, t);
}
