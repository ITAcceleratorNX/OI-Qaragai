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
    type: 'Комбо приключений 16+',
    status: 'active',
    statusLabel: 'Активен',
    validFrom: '8 июн 2026',
    validTo: '8 июн 2026',
    daysLeft: 1,
    totalDays: 1,
    passNumber: 'PK-28491',
  },
};

export const profileBookings = [
  {
    id: 'bk-1',
    title: 'Комбо приключений 16+',
    status: 'confirmed',
    statusLabel: 'Подтверждено',
    dates: '8 июн 2026',
    guests: 2,
    total: '24 700',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/3cbc915db86b87188ea60419d4c0b89b.jpg',
  },
  {
    id: 'bk-2',
    title: 'Домики на деревьях',
    status: 'upcoming',
    statusLabel: 'Предстоит',
    dates: '15–17 июн 2026',
    guests: 4,
    total: '195 000',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/624e0b4b4e408bcd06cc361ac97272d7.jpg',
  },
  {
    id: 'bk-3',
    title: 'Горный Рассвет',
    status: 'completed',
    statusLabel: 'Завершено',
    dates: '22 мая 2026',
    guests: 2,
    total: '85 000',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/9a6a519d6634f0ae6a476bf939a100a7.png',
  },
];

export const profileFavorites = [
  {
    id: 'fav-1',
    title: 'VIP-шале «Четыре Силы»',
    type: 'Проживание',
    price: '512 000',
    per: 'ночь',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/e87983b27c8a754c2306e9bf7ff4661d.jpg',
  },
  {
    id: 'fav-2',
    title: 'Пешие туры',
    type: 'Активность',
    price: '4 000',
    per: 'билет',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/dc09954344ceef7c8730400ad93dd82d.jpg',
  },
  {
    id: 'fav-3',
    title: 'Этно-SPA «UMAI»',
    type: 'SPA',
    price: 'по программе',
    per: 'визит',
    img: 'https://oq-prod.storage.yandexcloud.kz/media-test/21b9d22819c9d8ba4706a448d9ce6ea2.jpeg',
  },
];
