import { RAW_OQ } from '../data.js';
import { deriveCatalog } from '../data/helpers.js';
import enContent from './content/en.js';
import kzContent from './content/kz.js';
import { patchArray, patchNested } from './patchByKey.js';
import { CTA_KEY_MAP, enrichOQ, enrichOQItem } from './utils.js';

const CONTENT = { EN: enContent.oq, KZ: kzContent.oq };

function applyTypeLabels(item, typeLabels) {
  if (!item?.typeLabel || !typeLabels) return item;
  const label = typeLabels[item.typeLabel];
  return label ? { ...item, typeLabel: label } : item;
}

function applyMetaPhrases(item, metaPhrases) {
  if (!item?.meta || !metaPhrases) return item;
  return {
    ...item,
    meta: item.meta.map((m) => ({
      ...m,
      t: metaPhrases[m.t] ?? m.t,
    })),
  };
}

function finalizeItem(item, t) {
  if (!item) return item;
  const next = enrichOQItem({ ...item });
  if (next.typeKey) next.type = t(`types.${next.typeKey}`);
  if (next.categoryKey) next.category = t(`categories.${next.categoryKey}`);
  const ctaKey = next.ctaKey || CTA_KEY_MAP[item.cta] || CTA_KEY_MAP[next.cta];
  if (ctaKey) {
    next.ctaKey = ctaKey;
    const translated = t(`cta.${ctaKey}`);
    if (translated !== `cta.${ctaKey}`) next.cta = translated;
  }
  return next;
}

function mapFinalize(arr, t, content) {
  if (!Array.isArray(arr)) return arr;
  return arr.map((item) => {
    let next = finalizeItem(item, t);
    next = applyTypeLabels(next, content?.typeLabels);
    next = applyMetaPhrases(next, content?.metaPhrases);
    return next;
  });
}

function enrichRawData(data) {
  const map = (arr) => (Array.isArray(arr) ? arr.map(enrichOQItem) : arr);
  return {
    ...data,
    thingsAll: map(data.thingsAll),
    offersAll: map(data.offersAll),
    eventsEvent: map(data.eventsEvent),
    corporateAll: map(data.corporateAll),
    eventsHub: data.eventsHub
      ? { ...data.eventsHub, portals: map(data.eventsHub.portals) }
      : data.eventsHub,
  };
}

function applyContentPatch(base, content) {
  if (!content) return base;

  let data = { ...base };

  if (content.contacts) data.contacts = { ...data.contacts, ...content.contacts };
  if (content.weather) data.weather = patchNested(data.weather, content.weather);
  if (content.profile) data.profile = patchNested(data.profile, content.profile);
  if (content.offersMeta) data.offersMeta = { ...data.offersMeta, ...content.offersMeta };

  if (content.thingsAll) data.thingsAll = patchArray(data.thingsAll, content.thingsAll);
  if (content.offersAll) data.offersAll = patchArray(data.offersAll, content.offersAll);
  if (content.eventsEvent) data.eventsEvent = patchArray(data.eventsEvent, content.eventsEvent);
  if (content.corporateAll) data.corporateAll = patchArray(data.corporateAll, content.corporateAll);
  if (content.gallery) data.gallery = patchArray(data.gallery, content.gallery);
  if (content.rules) data.rules = patchArray(data.rules, content.rules);
  if (content.quick) data.quick = patchArray(data.quick, content.quick);
  if (content.mapZones) data.mapZones = patchArray(data.mapZones, content.mapZones);

  if (content.hero?.slides) {
    data.hero = {
      ...data.hero,
      slides: patchArray(data.hero.slides, content.hero.slides),
    };
  }

  if (content.mega) data.mega = patchArray(data.mega, content.mega);
  if (content.mice) data.mice = patchNested(data.mice, content.mice);

  if (content.eventsHub?.portals) {
    data.eventsHub = {
      ...data.eventsHub,
      portals: patchArray(data.eventsHub.portals, content.eventsHub.portals),
    };
  }

  if (content.app?.screenshots) {
    data.app = {
      ...data.app,
      screenshots: patchArray(data.app.screenshots, content.app.screenshots),
    };
  }

  return data;
}

function finalizeOQ(data, t, content) {
  const map = (arr) => mapFinalize(arr, t, content);
  return {
    ...data,
    thingsAll: map(data.thingsAll),
    things: map(data.things),
    offersAll: map(data.offersAll),
    offers: map(data.offers),
    eventsEvent: map(data.eventsEvent),
    corporateAll: map(data.corporateAll),
    eventsHub: data.eventsHub
      ? { ...data.eventsHub, portals: map(data.eventsHub.portals) }
      : data.eventsHub,
  };
}

export function localizeOQ(lang, t) {
  const content = CONTENT[lang];
  const base = enrichRawData(RAW_OQ);
  const patched = lang === 'RU' ? base : applyContentPatch(base, content);
  const derived = deriveCatalog(patched);
  const enriched = enrichOQ({
    ...patched,
    ...derived,
    offers: derived.offers,
    things: derived.things,
  });
  return finalizeOQ(enriched, t, content);
}
