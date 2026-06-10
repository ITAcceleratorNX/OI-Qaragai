/**
 * Mock-данные детальных страниц.
 * Каждый раздел — отдельный массив с полем `id` для динамического роутинга.
 */

const restaurants = [
  {
    id: 'ochag',
    name: '«Очаг» · Гриль-бар',
    cuisine: 'Гриль · Европейская · Горная',
    avgCheck: '8 000 – 15 000 ₸',
    hours: '12:00 – 24:00',
    description:
      'Ресторан у открытого огня с панорамой на склон. Стейки из мраморной говядины, локальные сыры и авторские соусы. По вечерам — живая музыка и глинтвейн у камина.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/9071cbfefc312116cb40b7c770e05063.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/7f023cdfe0db3b829a3434065a344d78.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/bee8fe2a4da6225678175d7f4c8a15ae.jpg',
    ],
    menuPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    menuPreview: [
      { section: 'Гриль', items: ['Стейк рибай 350 г — 12 900 ₸', 'Баранья корейка — 9 800 ₸'] },
      { section: 'Закуски', items: ['Сырная тарелка — 4 200 ₸', 'Горный бульон — 2 800 ₸'] },
    ],
  },
  {
    id: 'hvoya',
    name: '«Хвоя» · Авторская кухня',
    cuisine: 'Авторская · Тянь-Шань · Дегустации',
    avgCheck: '12 000 – 22 000 ₸',
    hours: '10:00 – 23:00',
    description:
      'Панорамный зал с видом на хребет. Сет-меню из сезонных продуктов: дикоросы, альпийские травы и фермерские сыры. Дегустационные вечера с сомелье по пятницам.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/9e0626703298e0306cf381c539b25d8e.jpeg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/f86b7ca3f7e98d67458984dc8c5c7a12.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/35cbcb290585a502aa92f013e08e63f4.jpg',
    ],
    menuPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    menuPreview: [
      { section: 'Сет-меню', items: ['«Тянь-Шань» 7 блюд — 18 500 ₸', 'Вегетарианский сет — 14 200 ₸'] },
      { section: 'Десерты', items: ['Облепиховый тарт — 3 400 ₸', 'Медовый мусс — 2 900 ₸'] },
    ],
  },
  {
    id: 'panorama',
    name: 'Паб «Панорама»',
    cuisine: 'Паб · Крафт · Сытная кухня',
    avgCheck: '5 000 – 9 000 ₸',
    hours: '16:00 – 02:00',
    description:
      'Крафтовое пиво, бургеры и закуски к просмотру спортивных трансляций. Терраса с видом на ночной склон и DJ-сеты по выходным.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/bee8fe2a4da6225678175d7f4c8a15ae.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/9071cbfefc312116cb40b7c770e05063.jpg',
    ],
    menuPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    menuPreview: [
      { section: 'Пиво', items: ['Лагер курорта 0.5 л — 1 800 ₸', 'IPA горный — 2 200 ₸'] },
      { section: 'Кухня', items: ['Бургер «Панорама» — 4 500 ₸', 'Крылышки BBQ — 3 800 ₸'] },
    ],
  },
];

const hotels = [
  {
    id: 'terrenkur',
    name: 'Шале «Терренкур»',
    capacity: 'до 6 гостей',
    guests: 6,
    pricePerNight: '95 000',
    description:
      'Премиальные шале с камином, панорамным остеклением и личной террасой. Два спальных блока, кухня и сауна в номере.',
    amenities: ['Wi-Fi', 'Баня', 'Завтрак', 'Камин', 'Терраса', 'Парковка'],
    rooms: [
      {
        name: 'Гостиная с камином',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/624e0b4b4e408bcd06cc361ac97272d7.jpg',
        desc: 'Двухуровневое пространство с панорамными окнами',
      },
      {
        name: 'Спальня «Вершина»',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/f86b7ca3f7e98d67458984dc8c5c7a12.jpg',
        desc: 'King-size кровать и вид на хребет',
      },
      {
        name: 'Сауна и купель',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/e2245f60b098f59536e15c3d431a7386.jpeg',
        desc: 'Приватная зона отдыха с горной водой',
      },
    ],
  },
  {
    id: 'pine-peak',
    name: 'Отель Pine Peak',
    capacity: '2–4 гостя',
    guests: 4,
    pricePerNight: '64 000',
    description:
      'Главный корпус курорта в шаге от подъёмника. Номера Standard и Deluxe, ресторан на первом этаже и лобби-бар.',
    amenities: ['Wi-Fi', 'Завтрак', 'Ски-рум', 'Консьерж', 'Прачечная'],
    rooms: [
      {
        name: 'Standard с видом на склон',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/e87983b27c8a754c2306e9bf7ff4661d.jpg',
        desc: 'Двуспальная кровать, 28 м²',
      },
      {
        name: 'Deluxe панорама',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/672781f715c9dfff7e6f26a11daef8b6.jpg',
        desc: 'Угловой номер с балконом, 42 м²',
      },
    ],
  },
  {
    id: 'glamping-hvoya',
    name: 'Глэмпинг «Хвоя»',
    capacity: '2 гостя',
    guests: 2,
    pricePerNight: '52 000',
    description:
      'Геокупола с отоплением и стеклянным куполом для наблюдения за звёздами. Завтрак с локальными продуктами включён.',
    amenities: ['Wi-Fi', 'Завтрак', 'Отопление', 'Терраса', 'Барбекю'],
    rooms: [
      {
        name: 'Купол «Звёздный»',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/e94707741a500180a04f7678d1fc84cb.jpg',
        desc: 'Круглая кровать и купольное остекление',
      },
      {
        name: 'Купол «Рассвет»',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/21b9d22819c9d8ba4706a448d9ce6ea2.jpeg',
        desc: 'Вид на восточный хребет',
      },
    ],
  },
];

const activities = [
  {
    id: 'ski-pass',
    name: 'Горные лыжи · Ски-пасс',
    description:
      '18 км подготовленных трасс всех уровней сложности, сноупарк и ночное катание по пятницам. Школа инструкторов для детей и взрослых.',
    media: {
      type: 'image',
      src: 'https://oq-prod.storage.yandexcloud.kz/media-test/be9de408fd6866bd1150c6b786569c94.jpg',
    },
    safety: {
      age: 'от 5 лет (детский склон), от 14 лет — все трассы',
      height: { min: 120, max: 210 },
      weight: { min: 30, max: 120 },
    },
    priceList: [
      { name: 'Дневной ски-пасс', price: '12 000', unit: 'день' },
      { name: 'Ски-пасс на 3 дня', price: '32 000', unit: '3 дня' },
      { name: 'Вечернее катание', price: '6 500', unit: 'вечер' },
      { name: 'Прокат комплекта', price: '8 000', unit: 'день' },
    ],
    ticketPrice: '12 000',
  },
  {
    id: 'zipline',
    name: 'Зиплайн над ущельем',
    description:
      '800 метров полёта над зимним лесом на высоте до 80 метров. Скорость до 70 км/ч, профессиональное снаряжение и инструктаж включены.',
    media: {
      type: 'image',
      src: 'https://oq-prod.storage.yandexcloud.kz/media-test/dc09954344ceef7c8730400ad93dd82d.jpg',
    },
    safety: {
      age: 'от 12 лет',
      height: { min: 140, max: 200 },
      weight: { min: 40, max: 110 },
    },
    priceList: [
      { name: 'Одиночный полёт', price: '9 000', unit: 'билет' },
      { name: 'Двойной полёт (вдвоём)', price: '15 000', unit: 'пара' },
      { name: 'Фото/видео пакет', price: '3 500', unit: 'доп.' },
    ],
    ticketPrice: '9 000',
  },
  {
    id: 'tubing',
    name: 'Тюбинг-трасса',
    description:
      'Семейная трасса с подъёмником, вечерней подсветкой и отдельной детской зоной. Весёлый активный отдых без специальной подготовки.',
    media: {
      type: 'image',
      src: 'https://oq-prod.storage.yandexcloud.kz/media-test/a60880837954b3f599fa9bf993e716bd.jpg',
    },
    safety: {
      age: 'от 4 лет (с сопровождением взрослого)',
      height: { min: 100, max: 200 },
      weight: { min: 20, max: 120 },
    },
    priceList: [
      { name: '1 час катания', price: '4 500', unit: 'час' },
      { name: '2 часа', price: '7 500', unit: '2 часа' },
      { name: 'Семейный (4 чел.)', price: '14 000', unit: '2 часа' },
    ],
    ticketPrice: '4 500',
  },
];

const spaServices = [
  {
    id: 'cedar-bath',
    name: 'Кедровая баня',
    duration: 120,
    price: '25 000',
    effect:
      'Глубокое прогревание, детокс и восстановление после активного дня на склоне. Парение на пихтовых вениках, травяной чай и купель с горной водой.',
    description:
      'Приватная баня на 8 гостей в кедровом бочонке. В программе — контрастные процедуры, массаж веником и зона отдыха с камином.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/e2245f60b098f59536e15c3d431a7386.jpeg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/7fa7a1cdaa60112376a1aa35123825ce.jpg',
    ],
  },
  {
    id: 'tianshan-ritual',
    name: 'SPA-ритуал «Тянь-Шань»',
    duration: 90,
    price: '38 000',
    effect:
      'Расслабление мышц, улучшение тонуса кожи и снятие стресса. Масла горных трав и минеральный скраб.',
    description:
      'Комплекс из трёх этапов: пилинг всего тела, обёртывание на основе мёда и трав, расслабляющий массаж.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/7fa7a1cdaa60112376a1aa35123825ce.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/b9412961e77379e1beedf84c8108ed65.jpg',
    ],
  },
  {
    id: 'heated-pool',
    name: 'Бассейн с подогревом',
    duration: 60,
    price: '8 000',
    effect:
      'Лёгкое восстановление, улучшение кровообращения и расслабление под открытым небом с видом на горы.',
    description:
      'Панорамный бассейн с подогревом до +32°C, зона отдыха с шезлонгами и бар у воды.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/b9412961e77379e1beedf84c8108ed65.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/e2245f60b098f59536e15c3d431a7386.jpeg',
    ],
  },
];

const catalogs = {
  restaurants,
  hotels,
  activities,
  spa: spaServices,
};

const DETAIL_PATHS = {
  'Отели': 'hotels',
  'Рестораны': 'restaurants',
  'Развлечения': 'activities',
  SPA: 'spa',
};

export function getDetailPath(type, id) {
  const segment = DETAIL_PATHS[type];
  return segment ? `/${segment}/${id}` : null;
}

export function findById(section, id) {
  const list = catalogs[section];
  return list?.find((item) => item.id === id) ?? null;
}
