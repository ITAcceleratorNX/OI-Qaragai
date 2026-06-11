import { deriveCatalog } from '../data/helpers.js';

export function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function deepMerge(base, patch) {
  if (!patch) return base;
  if (Array.isArray(patch)) {
    return patch.map((item, i) => {
      if (item && typeof item === 'object' && !Array.isArray(item) && base[i]) {
        return deepMerge(base[i], item);
      }
      return item ?? base[i];
    });
  }
  const out = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (Array.isArray(value) && Array.isArray(base[key])) {
      out[key] = deepMerge(base[key], value);
    } else if (value && typeof value === 'object' && !Array.isArray(value) && base[key]) {
      out[key] = deepMerge(base[key], value);
    } else if (value !== undefined) {
      out[key] = value;
    }
  }
  return out;
}

export function interpolate(template, vars = {}) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? `{${name}}`);
}

const TYPE_KEY_MAP = {
  Отели: 'hotels',
  Рестораны: 'restaurants',
  Развлечения: 'fun',
  SPA: 'spa',
  Hotels: 'hotels',
  Restaurants: 'restaurants',
  Activities: 'fun',
  'Қонақ үйлер': 'hotels',
  'Мейрамханалар': 'restaurants',
  'Ойын-сауық': 'fun',
};

const CATEGORY_KEY_MAP = {
  Пакеты: 'packages',
  SPA: 'spa',
  'Ски-пасс': 'skipass',
  Активности: 'activities',
  Ресторан: 'restaurant',
};

export const CTA_KEY_MAP = {
  Купить: 'buy',
  Подробнее: 'details',
  Меню: 'menu',
  'Купить билет': 'buyTicket',
  Записаться: 'signup',
  Забронировать: 'book',
  Запросить: 'request',
  Архив: 'archive',
  Buy: 'buy',
  Details: 'details',
  Menu: 'menu',
  'Buy ticket': 'buyTicket',
  Signup: 'signup',
  Book: 'book',
  Request: 'request',
  Archive: 'archive',
  'Сатып алу': 'buy',
  'Толығырақ': 'details',
  'Мәзір': 'menu',
  'Билет сатып алу': 'buyTicket',
  'Жазылу': 'signup',
  'Брондау': 'book',
  'Сұрау': 'request',
  'Мұрағат': 'archive',
};

export const CTA_KEYS = new Set(Object.values(CTA_KEY_MAP));

export function resolveCtaKey(item) {
  if (item?.ctaKey && CTA_KEYS.has(item.ctaKey)) return item.ctaKey;
  if (item?.cta) return CTA_KEY_MAP[item.cta] ?? null;
  return null;
}

export function getDateLocale(lang) {
  if (lang === 'KZ') return 'kk-KZ';
  if (lang === 'EN') return 'en-US';
  return 'ru-RU';
}

export function enrichOQItem(item) {
  if (!item || typeof item !== 'object') return item;
  const next = { ...item };
  if (!next.typeKey && next.type) next.typeKey = TYPE_KEY_MAP[next.type];
  if (!next.categoryKey && next.category) {
    next.categoryKey = CATEGORY_KEY_MAP[next.category];
  }
  if (!next.ctaKey && next.cta) next.ctaKey = CTA_KEY_MAP[next.cta];
  return next;
}

export function enrichOQ(data) {
  const mapItems = (arr) => (Array.isArray(arr) ? arr.map(enrichOQItem) : arr);
  const mapped = {
    ...data,
    thingsAll: mapItems(data.thingsAll),
    offersAll: mapItems(data.offersAll),
    eventsEvent: mapItems(data.eventsEvent),
    corporateAll: mapItems(data.corporateAll),
    eventsHub: data.eventsHub
      ? { ...data.eventsHub, portals: mapItems(data.eventsHub.portals) }
      : data.eventsHub,
  };
  const derived = deriveCatalog(mapped);
  return {
    ...mapped,
    ...derived,
    offers: mapItems(derived.offers),
    things: mapItems(derived.things),
  };
}
