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
};

const CATEGORY_KEY_MAP = {
  Пакеты: 'packages',
  SPA: 'spa',
  'Ски-пасс': 'skipass',
  Активности: 'activities',
  Ресторан: 'restaurant',
};

export function enrichOQItem(item) {
  if (!item || typeof item !== 'object') return item;
  const next = { ...item };
  if (!next.typeKey && next.type) next.typeKey = TYPE_KEY_MAP[next.type] ?? next.type;
  if (!next.categoryKey && next.category) {
    next.categoryKey = CATEGORY_KEY_MAP[next.category] ?? next.category;
  }
  return next;
}

export function enrichOQ(data) {
  const mapItems = (arr) => (Array.isArray(arr) ? arr.map(enrichOQItem) : arr);
  return {
    ...data,
    things: mapItems(data.things),
    thingsAll: mapItems(data.thingsAll),
    offers: mapItems(data.offers),
    offersAll: mapItems(data.offersAll),
  };
}
