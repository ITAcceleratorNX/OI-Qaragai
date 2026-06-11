import { deepMerge } from './utils.js';

/** Build a lookup map from patch entries keyed by id, title, key, slug, etc. */
export function toPatchMap(patches) {
  if (!patches || typeof patches !== 'object') return null;
  if (Array.isArray(patches)) {
    const map = new Map();
    patches.forEach((p, i) => {
      const key = p?.id ?? p?.key ?? p?.slug ?? p?.n ?? p?.title ?? String(i);
      map.set(String(key), p);
    });
    return map;
  }
  return new Map(Object.entries(patches));
}

export function itemKey(item, index) {
  return String(item?.id ?? item?.key ?? item?.slug ?? item?.n ?? item?.title ?? index);
}

/** Apply keyed patches to an array of items. */
export function patchArray(base, patches, { merge = true } = {}) {
  if (!base || !patches) return base;
  const map = toPatchMap(patches);
  if (!map) return base;
  return base.map((item, i) => {
    const patch = map.get(itemKey(item, i));
    if (!patch) return item;
    return merge ? deepMerge(item, patch) : { ...item, ...patch };
  });
}

/** Patch nested object sections that contain arrays. */
export function patchNested(base, patch) {
  if (!patch) return base;
  const out = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (Array.isArray(base[key]) && value && typeof value === 'object') {
      out[key] = patchArray(base[key], value);
    } else if (value && typeof value === 'object' && !Array.isArray(value) && base[key]) {
      out[key] = patchNested(base[key], value);
    } else if (value !== undefined) {
      out[key] = value;
    }
  }
  return out;
}
