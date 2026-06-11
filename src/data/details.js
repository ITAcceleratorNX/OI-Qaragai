/**
 * Данные детальных страниц — синхронизированы с api.oiqaragai.com (locale=ru).
 * ID маршрутов сохранены для стабильных URL.
 */

const restaurants = [
  {
    id: 'ochag',
    name: '«Aport-Alatau» Горный гриль-ресторан',
    cuisine: 'Гриль · Горная · Европейская',
    avgCheck: 'по меню',
    hours: '09:00 – 20:00',
    description:
      'Горный гриль-ресторан у подножия величественных гор. Мясо на открытом огне, локальные специалитеты и уютная атмосфера после активного дня на курорте.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/f495ef49c03361c11965fd30bc01f864.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/cd7792e09fd23e505670dd37fc12ac15.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/6d6a6e8148d4652ba73df97ce5665797.jpg',
    ],
    menuPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    menuPreview: [
      { section: 'Гриль', items: ['Стейки и мясо на углях', 'Горные закуски'] },
      { section: 'Напитки', items: ['Авторские лимонады', 'Чай и кофе'] },
    ],
  },
  {
    id: 'hvoya',
    name: '«Чашнагири» Ресторан царской грузинской кухни',
    cuisine: 'Грузинская · Авторская',
    avgCheck: 'по меню',
    hours: '11:00 – 22:00',
    description:
      'Ресторан на 2 этаже с настоящей грузинской кухней: хинкали, хачапури и ароматы специй. Каждое блюдо — путешествие в кулинарную культуру Грузии.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/bce371d31522550313a3609f002f16ee.jpeg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/9e09f71f465f416d97748f5e70578ea0.jpeg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/cabb16dfdfc1e269abc0aac2c6c731d6.jpeg',
    ],
    menuPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    menuPreview: [
      { section: 'Грузинская кухня', items: ['Хинкали', 'Хачапури по-аджарски'] },
      { section: 'Десерты', items: ['Чурчхела', 'Пахлава'] },
    ],
  },
  {
    id: 'panorama',
    name: 'Банкетный зал «Panorama Plaza»',
    cuisine: 'Банкеты · MICE · Кейтеринг',
    avgCheck: 'по запросу',
    hours: 'по бронированию',
    description:
      'Банкетный зал вместимостью до 250 персон с панорамными видами. Идеален для свадеб, корпоративов, тимбилдингов и торжественных вечеров.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/f86b7ca3f7e98d67458984dc8c5c7a12.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/01a154aaf7ccca450d3a14ec1a40d8f6.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/1854ffe5540362df36c46c7c4b5bc7b9.jpg',
    ],
    menuPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    menuPreview: [
      { section: 'Банкеты', items: ['Кейтеринг под мероприятие', 'Фуршет и банкетное меню'] },
      { section: 'MICE', items: ['Кофе-брейки', 'Гала-ужины'] },
    ],
  },
];

const hotels = [
  {
    id: 'terrenkur',
    name: 'Домики на деревьях',
    capacity: 'до 4 гостей',
    guests: 4,
    pricePerNight: '65 000',
    description:
      'Уникальный для Казахстана вид проживания под кронами сосен. Экологичные номера в духе Тома Сойера: душевая, тёплые полы и всё необходимое для отдыха на природе.',
    amenities: ['Wi-Fi', 'Душ', 'Тёплый пол', 'Терраса', 'Природа'],
    rooms: [
      {
        name: 'Домик на дереве',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/624e0b4b4e408bcd06cc361ac97272d7.jpg',
        desc: 'Уютный номер среди соснового леса',
      },
      {
        name: 'Интерьер',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/9a13cc808ae8ed626815dac25f6223fe.jpg',
        desc: 'Экологичный дизайн и комфорт',
      },
      {
        name: 'Вид на лес',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/150e60b09d23d3da24de4b7c6e740edc.jpg',
        desc: 'Панорама горного леса',
      },
    ],
  },
  {
    id: 'pine-peak',
    name: 'VIP-шале «Четыре Силы»',
    capacity: 'до 10 гостей',
    guests: 10,
    pricePerNight: '512 000',
    description:
      'Двухэтажные VIP-шале на фоне гор Тянь-Шаня — роскошь и уединение для большой компании. Просторные зоны отдыха, панорамные виды и премиальный сервис.',
    amenities: ['Wi-Fi', 'Камин', 'Терраса', 'Кухня', 'Парковка', 'Консьерж'],
    rooms: [
      {
        name: 'Гостиная шале',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/e87983b27c8a754c2306e9bf7ff4661d.jpg',
        desc: 'Просторная зона с панорамным остеклением',
      },
      {
        name: 'Спальня',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/8cc7cdd40b725854ff317b7c7f15c3e5.jpg',
        desc: 'Комфортное размещение для гостей',
      },
      {
        name: 'Терраса',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/2e3191dd0583952f0578830ba73086f7.jpg',
        desc: 'Вид на горный хребет',
      },
    ],
  },
  {
    id: 'glamping-hvoya',
    name: 'Глэмпинги TAU TYNYS',
    capacity: '2 гостя',
    guests: 2,
    pricePerNight: '86 400',
    description:
      'Уединённое пространство на высоте 2140 м на плато Aqtas. 14 домиков с панорамными видами: небо ближе, горы — часть вашего утра.',
    amenities: ['Wi-Fi', 'Панорама', 'Отопление', 'Завтрак', 'Тишина'],
    rooms: [
      {
        name: 'Глэмпинг-домик',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/672781f715c9dfff7e6f26a11daef8b6.jpg',
        desc: 'Панорамные окна и вид на вершины',
      },
      {
        name: 'Интерьер',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/58bd25a72f4ac0d02fe18b009a7180e8.png',
        desc: 'Комфорт на высоте 2140 м',
      },
      {
        name: 'Плато Aqtas',
        img: 'https://oq-prod.storage.yandexcloud.kz/media-test/3f085c08814855101ea5d29e6d81ccaa.png',
        desc: 'Высокогорная локация курорта',
      },
    ],
  },
];

const activities = [
  {
    id: 'ski-pass',
    name: 'Конный центр (Aport Plaza)',
    description:
      'Прогулки верхом по живописным окрестностям курорта. Профессиональные инструкторы, безопасные маршруты и полное погружение в горную природу.',
    media: {
      type: 'image',
      src: 'https://oq-prod.storage.yandexcloud.kz/media-test/be9de408fd6866bd1150c6b786569c94.jpg',
    },
    safety: {
      age: 'по согласованию с инструктором',
      height: { min: 120, max: 210 },
      weight: { min: 30, max: 120 },
    },
    priceList: [
      { name: 'Прогулка', price: '5 000', unit: 'билет' },
    ],
    ticketPrice: '5 000',
  },
  {
    id: 'zipline',
    name: 'Пешие туры',
    description:
      'Специально оборудованные тропы и маршруты разной сложности. Профессиональные гиды проведут по самым живописным местам ущелья Oi-Qaragai.',
    media: {
      type: 'image',
      src: 'https://oq-prod.storage.yandexcloud.kz/media-test/dc09954344ceef7c8730400ad93dd82d.jpg',
    },
    safety: {
      age: 'для всей семьи',
      height: { min: 100, max: 220 },
      weight: { min: 20, max: 150 },
    },
    priceList: [
      { name: 'Пеший тур', price: '4 000', unit: 'билет' },
    ],
    ticketPrice: '4 000',
  },
  {
    id: 'tubing',
    name: 'Тюбинг',
    description:
      'Катание на тюбингах по подготовленным трассам для всей семьи. Бугельный подъёмник поднимает на верхнюю точку — весёлый отдых без специальной подготовки.',
    media: {
      type: 'image',
      src: 'https://oq-prod.storage.yandexcloud.kz/media-test/4ea85f24244269f7faaa0056395050ac.png',
    },
    safety: {
      age: 'от 4 лет (с сопровождением взрослого)',
      height: { min: 100, max: 200 },
      weight: { min: 20, max: 120 },
    },
    priceList: [
      { name: 'Катание на тюбинге', price: '1 500', unit: 'билет' },
    ],
    ticketPrice: '1 500',
  },
];

const spaServices = [
  {
    id: 'cedar-bath',
    name: 'Этно-SPA «UMAI» и Баня',
    duration: 120,
    price: 'по программе',
    effect:
      'Традиционные казахские юрты, банные ритуалы и этнические процедуры в уникальной атмосфере горного курорта.',
    description:
      'Этно-SPA «UMAI» — одно из самых удивительных мест курорта. Баня и SPA-ритуалы в традиционных юртах сочетают древние практики и современный комфорт.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/21b9d22819c9d8ba4706a448d9ce6ea2.jpeg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/e2245f60b098f59536e15c3d431a7386.jpeg',
    ],
  },
  {
    id: 'tianshan-ritual',
    name: 'Горный Рассвет (процедуры на двоих)',
    duration: 180,
    price: '85 000',
    effect:
      'Пакет SPA-процедур для двоих: расслабление, восстановление и совместный отдых с видом на горы.',
    description:
      'Неповторимое пакетное предложение SPA-процедур, разработанное для вас и вашего партнёра. Насладитесь рассветом в горах и комплексным уходом.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/9a6a519d6634f0ae6a476bf939a100a7.png',
      'https://oq-prod.storage.yandexcloud.kz/media-test/749902c79c433054f6de29d71fa1cb4f.jpg',
    ],
  },
  {
    id: 'heated-pool',
    name: 'СПА «Воздух»',
    duration: 90,
    price: '42 000',
    effect:
      'Хаммам, ароматерапия и расслабляющие процедуры — очищение и восстановление в SPA-зоне курорта.',
    description:
      'Программа начинается с хаммама — традиционного ритуала очищения и расслабления. Далее — ароматерапия и уходовые процедуры для полного перезагрузки.',
    gallery: [
      'https://oq-prod.storage.yandexcloud.kz/media-test/69dfc7138383d8f658b9ea84a04b14aa.jpg',
      'https://oq-prod.storage.yandexcloud.kz/media-test/b9412961e77379e1beedf84c8108ed65.jpg',
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
