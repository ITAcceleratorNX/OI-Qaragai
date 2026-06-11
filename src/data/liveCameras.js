// Открытые источники курорта Oi-Qaragai: live-плееры ipcamlive и 3D-тур.
// Данные соответствуют https://api.oiqaragai.com/content-service/live-videos

export const TOUR_3D_URL = 'https://3d.oiqaragai.com/';

const PLAYER_BASE = 'https://g2.ipcamlive.com/player/player.php?alias=';

export const LIVE_CAMERAS = [
  {
    id: 'aqtas-lift-f-top',
    alias: '6870f9f94a5f3',
    title: {
      RU: 'AQTAS (Верхняя станция Lift F)',
      EN: 'AQTAS Top station (Lift F)',
      KZ: 'AQTAS Жоғарғы станция (Lift F)',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/b005902be97af1d47cbf036ccd75f9c5.png',
  },
  {
    id: 'aqtas-bridge',
    alias: '69e4874e35a64',
    title: {
      RU: 'Мост единения на AQTAS',
      EN: 'Bridge of Unity at AQTAS',
      KZ: 'AQTAS бірлік көпірі',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/5d614a3049fbe96342d73c2e97faad70.png',
  },
  {
    id: 'aqtas-sky-swing',
    alias: '689f50e8384aa',
    title: {
      RU: 'AQTAS Небесные качели',
      EN: 'AQTAS Sky Swing',
      KZ: 'AQTAS Аспан тербелмесі',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/8e172f4e7781b767dcdcaca52a709fdb.png',
  },
  {
    id: 'aqtas-lift-g-top',
    alias: '67d3bf2f1365e',
    title: {
      RU: 'AQTAS Верхняя станция (Lift G)',
      EN: 'AQTAS Top station (Lift G)',
      KZ: 'AQTAS Жоғарғы станция (Lift G)',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/8c5ff4c3d9142551ad3def1f48afa4ad.jpg',
  },
  {
    id: 'aqtas-lift-g-bottom',
    alias: '67d2e7928082f',
    title: {
      RU: 'AQTAS Нижняя станция (Lift G)',
      EN: 'AQTAS Bottom station (Lift G)',
      KZ: 'AQTAS Төменгі станция (Lift G)',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/7b92be63b711cb55d0e79cf6a3fb9f34.jpeg',
  },
  {
    id: 'irbis-slope',
    alias: '6480555a49df5',
    title: {
      RU: 'Склон Irbis',
      EN: 'Irbis slope',
      KZ: 'Irbis еңісі',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/27c2d7f4ae33a5b727f58811807aed00.jpg',
  },
  {
    id: 'restaurant-1820',
    alias: '5eea136cb1259',
    title: {
      RU: 'Смотровая площадка ресторана 1820',
      EN: 'Restaurant 1820 viewpoint',
      KZ: '1820 мейрамханасының көру алаңы',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/44e6dff08911458e7f8ecc6eaeefe682.jpeg',
  },
  {
    id: 'lift-a',
    alias: '5eea1409ae7c6',
    title: {
      RU: 'Lift A',
      EN: 'Lift A',
      KZ: 'Lift A',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/d5759f8055dc6ed060a9ea5e4cc7a729.jpg',
  },
  {
    id: 'aport-alatau',
    alias: '5eea13b9a2033',
    title: {
      RU: 'Aport Alatau',
      EN: 'Aport Alatau',
      KZ: 'Aport Alatau',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/f495ef49c03361c11965fd30bc01f864.jpg',
  },
  {
    id: 'ugusha-center',
    alias: '649512363558f',
    title: {
      RU: 'Детский центр «Ugusha»',
      EN: '“Ugusha” children’s center',
      KZ: '«Ugusha» балалар орталығы',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/4fc67ca29c5f92b71b5fbf8747f783c5.jpeg',
  },
  {
    id: 'ugusha-club',
    alias: '648054adbe8f6',
    title: {
      RU: 'Детский клуб активностей «Ugusha»',
      EN: '“Ugusha” children’s activity club',
      KZ: '«Ugusha» балалар белсенділік клубы',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/4f364f06f27635b2ae2971d8ce26e819.jpg',
  },
  {
    id: 'ride-school',
    alias: '64805253ca75c',
    title: {
      RU: 'Ride School',
      EN: 'Ride School',
      KZ: 'Ride School',
    },
    preview:
      'https://oq-prod.storage.yandexcloud.kz/media-test/ab8e38859afd977872ce4394b4a97955.jpg',
  },
];

export const cameraPlayerUrl = (camera) => PLAYER_BASE + camera.alias;

export const cameraTitle = (camera, lang) =>
  camera.title[lang] ?? camera.title.RU;
