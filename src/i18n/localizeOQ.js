import { RAW_OQ } from '../data.js';
import { locales } from './locales/index.js';
import { CTA_KEY_MAP, deepMerge, enrichOQ } from './utils.js';

function finalizeItem(item, t) {
  if (!item) return item;
  const next = { ...item };
  if (item.typeKey) next.type = t(`types.${item.typeKey}`);
  if (item.categoryKey) next.category = t(`categories.${item.categoryKey}`);
  const ctaKey = next.ctaKey || CTA_KEY_MAP[item.cta];
  if (ctaKey) {
    next.ctaKey = ctaKey;
    const translated = t(`cta.${ctaKey}`);
    if (translated !== `cta.${ctaKey}`) next.cta = translated;
  }
  return next;
}

function finalizeOQ(data, t) {
  const map = (arr) => (Array.isArray(arr) ? arr.map((item) => finalizeItem(item, t)) : arr);
  const eventsHub = data.eventsHub
    ? {
        ...data.eventsHub,
        portals: map(data.eventsHub.portals),
      }
    : data.eventsHub;
  return {
    ...data,
    things: map(data.things),
    thingsAll: map(data.thingsAll),
    offers: map(data.offers),
    offersAll: map(data.offersAll),
    eventsEvent: map(data.eventsEvent),
    corporateAll: map(data.corporateAll),
    eventsHub,
  };
}

export function localizeOQ(lang) {
  const t = (key) => {
    const messages = locales[lang] ?? locales.RU;
    const val = key.split('.').reduce((acc, k) => acc?.[k], messages);
    return val ?? key.split('.').reduce((acc, k) => acc?.[k], locales.RU);
  };

  if (lang === 'RU') return finalizeOQ(enrichOQ(RAW_OQ), t);
  const patch = locales[lang]?.oq;
  const merged = patch ? enrichOQ(deepMerge(RAW_OQ, patch)) : enrichOQ(RAW_OQ);
  return finalizeOQ(merged, t);
}
