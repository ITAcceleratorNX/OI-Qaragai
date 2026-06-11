/** Shared helpers for mock catalog data (single source of truth). */

export const ALL_FILTER = 'all';

export function listingFilters(items, getKey, allKey = ALL_FILTER) {
  const keys = [...new Set(items.map(getKey).filter(Boolean))];
  return [allKey, ...keys];
}

export function findById(items, id) {
  return items?.find((item) => item.id === id) ?? null;
}

export function findByTitle(items, title) {
  return items?.find((item) => item.title === title) ?? null;
}

export function pickHomeFeatured(items, { limit } = {}) {
  const list = items
    .filter((item) => item.homeFeatured)
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));
  return limit ? list.slice(0, limit) : list;
}

export function resolveProfile(data) {
  const { profile } = data;
  if (!profile) return null;

  const thing = (id) => findById(data.thingsAll, id);
  const offer = (title) => findByTitle(data.offersAll, title);

  return {
    user: profile.user,
    wallet: {
      ...profile.wallet,
      skiPass: {
        ...profile.wallet.skiPass,
        type:
          offer(profile.wallet.skiPass.offerTitle)?.title ??
          profile.wallet.skiPass.offerTitle,
      },
    },
    bookings: profile.bookings.map((b) => {
      const src = b.thingId ? thing(b.thingId) : offer(b.offerTitle);
      return {
        ...b,
        title: src?.title ?? b.offerTitle,
        img: src?.img,
      };
    }),
    favorites: profile.favorites.map((f) => {
      const src = thing(f.thingId);
      return {
        ...f,
        title: src?.title,
        type: src?.type,
        price: src?.price ?? f.price,
        per: src?.per ?? f.per,
        img: src?.img,
      };
    }),
  };
}

export function deriveCatalog(data) {
  const homeEvents = {
    featured: data.eventsEvent?.find((e) => e.featured) ?? null,
    side: data.eventsEvent?.find((e) => e.homeSide) ?? null,
    corporate: data.corporateAll?.[0] ?? null,
  };

  const hasOffers = Array.isArray(data.offers) && data.offers.length > 0;
  const hasThings = Array.isArray(data.things) && data.things.length > 0;

  return {
    offers: hasOffers ? data.offers : pickHomeFeatured(data.offersAll ?? []),
    things: hasThings ? data.things : pickHomeFeatured(data.thingsAll ?? []),
    homeEvents,
    profile: resolveProfile(data),
  };
}
