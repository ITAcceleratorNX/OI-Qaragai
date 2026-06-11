import enContent from './content/en.js';
import kzContent from './content/kz.js';
import { patchArray } from './patchByKey.js';

const CONTENT = {
  EN: enContent.details,
  KZ: kzContent.details,
};

function applyDetailPatch(detail, patch) {
  if (!patch) return detail;
  let result = { ...detail, ...patch };

  if (patch.rooms && detail.rooms) {
    result.rooms = patchArray(detail.rooms, patch.rooms);
  }
  if (patch.menuPreview && detail.menuPreview) {
    result.menuPreview = patchArray(detail.menuPreview, patch.menuPreview);
  }
  if (patch.priceList && detail.priceList) {
    result.priceList = patchArray(detail.priceList, patch.priceList);
  }
  if (patch.tariffs && detail.tariffs) {
    result.tariffs = patchArray(detail.tariffs, patch.tariffs);
  }
  if (patch.safety && detail.safety) {
    result.safety = { ...detail.safety, ...patch.safety };
  }

  return result;
}

export function localizeDetail(detail, section, id, lang) {
  if (!detail || lang === 'RU') return detail;
  const patch = CONTENT[lang]?.[section]?.[id];
  return applyDetailPatch(detail, patch);
}
