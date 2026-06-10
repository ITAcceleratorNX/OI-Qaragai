export const profileUser = {
  name: 'Айгуль Нурланова',
  email: 'aigul.n@mail.kz',
  phone: '+7 701 234 56 78',
  initials: 'АН',
  tier: 'Gold',
  tierLabel: 'Gold Member',
  points: 2840,
  nights: 12,
  memberSince: '2023',
  avatar: null,
};

export const profileWallet = {
  deposit: {
    balance: 48500,
    lastTopUp: '28 ноя 2025',
    lastAmount: '20 000',
  },
  skiPass: {
    type: 'Ски-пасс на 3 дня',
    status: 'active',
    statusLabel: 'Активен',
    validFrom: '14 дек 2025',
    validTo: '16 дек 2025',
    daysLeft: 2,
    totalDays: 3,
    passNumber: 'SP-28491',
  },
};

export const profileBookings = [
  {
    id: 'bk-1',
    title: 'Зимний weekend',
    status: 'confirmed',
    statusLabel: 'Подтверждено',
    dates: '14–16 дек 2025',
    guests: 2,
    total: '78 000',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/766b42f1e7f3533af60e997a726f61d5.jpg',
  },
  {
    id: 'bk-2',
    title: 'Шале «Терренкур»',
    status: 'upcoming',
    statusLabel: 'Предстоит',
    dates: '3–5 янв 2026',
    guests: 4,
    total: '285 000',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/624e0b4b4e408bcd06cc361ac97272d7.jpg',
  },
  {
    id: 'bk-3',
    title: 'SPA-день для двоих',
    status: 'completed',
    statusLabel: 'Завершено',
    dates: '22 ноя 2025',
    guests: 2,
    total: '45 000',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/916bea98e22577b9ecff5c2fc98c7f46.jpg',
  },
];

export const profileFavorites = [
  {
    id: 'fav-1',
    title: 'Отель Pine Peak',
    type: 'Проживание',
    price: '64 000',
    per: 'ночь',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/e87983b27c8a754c2306e9bf7ff4661d.jpg',
  },
  {
    id: 'fav-2',
    title: 'Зиплайн над ущельем',
    type: 'Активность',
    price: '9 000',
    per: 'билет',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/dc09954344ceef7c8730400ad93dd82d.jpg',
  },
  {
    id: 'fav-3',
    title: 'Кедровая баня',
    type: 'SPA',
    price: '25 000',
    per: 'сеанс',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/e2245f60b098f59536e15c3d431a7386.jpeg',
  },
];
