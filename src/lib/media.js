const LANG_CODES = { RU: 'ru', KZ: 'kk', EN: 'en' };

/** Resolve image list from flat array or { ru, kk, en } map. */
export function resolveMediaList(source, lang = 'RU') {
  if (!source) return [];
  if (Array.isArray(source)) return source.filter(Boolean);
  if (typeof source === 'object') {
    const code = LANG_CODES[lang] || 'ru';
    return source[code] || source.ru || source.kk || source.en || [];
  }
  return [];
}
