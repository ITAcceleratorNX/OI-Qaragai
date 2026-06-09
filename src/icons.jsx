/* Oi-Qaragai — icon set (stroke, currentColor) */
const Icon = ({ d, size = 18, fill = false, sw = 1.7, children, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    {children || <path d={d} />}
  </svg>
);

export const I = {
  phone: (p) => (
    <Icon {...p}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L17 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </Icon>
  ),
  insta: (p) => (
    <Icon {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </Icon>
  ),
  camera: (p) => (
    <Icon {...p}>
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="12.5" r="3.2" />
    </Icon>
  ),
  cube: (p) => (
    <Icon {...p}>
      <path d="M12 2.5 21 7v10l-9 4.5L3 17V7z" />
      <path d="M3 7l9 4.5L21 7M12 11.5V21.5" />
    </Icon>
  ),
  cloud: (p) => (
    <Icon {...p}>
      <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.3A3.5 3.5 0 0 1 18 18z" />
    </Icon>
  ),
  search: (p) => (
    <Icon {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Icon>
  ),
  cart: (p) => (
    <Icon {...p}>
      <path d="M3 4h2l2.4 12.3a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L22 8H6" />
      <circle cx="9" cy="21" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="19" cy="21" r="1.3" fill="currentColor" stroke="none" />
    </Icon>
  ),
  user: (p) => (
    <Icon {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
    </Icon>
  ),
  menu: (p) => (
    <Icon {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Icon>
  ),
  chevDown: (p) => (
    <Icon {...p}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  ),
  chevRight: (p) => (
    <Icon {...p}>
      <path d="m9 6 6 6-6 6" />
    </Icon>
  ),
  arrowRight: (p) => (
    <Icon {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  ),
  arrowLeft: (p) => (
    <Icon {...p}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </Icon>
  ),
  close: (p) => (
    <Icon {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  ),
  plus: (p) => (
    <Icon {...p}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  ),
  zoom: (p) => (
    <Icon {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3M11 8v6M8 11h6" />
    </Icon>
  ),
  bed: (p) => (
    <Icon {...p}>
      <path d="M3 18V7M3 11h13a4 4 0 0 1 4 4v3M3 18h18M7 11V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
    </Icon>
  ),
  fork: (p) => (
    <Icon {...p}>
      <path d="M5 3v6a2 2 0 0 0 4 0V3M7 9v12M17 3c-1.5 0-2.5 2-2.5 4.5S15.5 13 17 13v8" />
    </Icon>
  ),
  ski: (p) => (
    <Icon {...p}>
      <path d="M4 19 20 5M6 21l13-13M8 6l9 9" />
      <circle cx="6.5" cy="4.5" r="1.3" />
    </Icon>
  ),
  spa: (p) => (
    <Icon {...p}>
      <path d="M12 21c-4-2-7-5-7-9 0 0 4 1 7 5 3-4 7-5 7-5 0 4-3 7-7 9z" />
      <path d="M12 21v-7" />
    </Icon>
  ),
  star: (p) => (
    <Icon {...p} fill>
      <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z" />
    </Icon>
  ),
  briefcase: (p) => (
    <Icon {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </Icon>
  ),
  clock: (p) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  ),
  calendar: (p) => (
    <Icon {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </Icon>
  ),
  pin: (p) => (
    <Icon {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </Icon>
  ),
  mail: (p) => (
    <Icon {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Icon>
  ),
  desktop: (p) => (
    <Icon {...p}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </Icon>
  ),
  mobile: (p) => (
    <Icon {...p}>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </Icon>
  ),
  calc: (p) => (
    <Icon {...p}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h0M12 11h0M16 11h0M8 15h0M12 15h0M16 15h4" />
    </Icon>
  ),
  doc: (p) => (
    <Icon {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </Icon>
  ),
  apple: (p) => (
    <Icon {...p} fill>
      <path d="M16 13.5c0 2.5 2 3.3 2 3.3-.8 2.3-2.4 3.7-3.3 3.7-1 0-1.5-.6-2.7-.6s-1.8.6-2.7.6c-1.6 0-4.3-3.6-4.3-7 0-3.4 2.2-5 4-5 1.2 0 2 .7 2.9.7.8 0 1.6-.7 2.9-.7 1.2 0 2.8.7 3.6 2-1.8 1-2.4 2.5-2.4 4M14.5 5.5c.6-.8 1-1.8.8-2.8-.9.1-2 .6-2.6 1.4-.6.7-1 1.7-.9 2.7 1 .1 2-.5 2.7-1.3" />
    </Icon>
  ),
  play: (p) => (
    <Icon {...p} fill>
      <path d="M8 5v14l11-7z" />
    </Icon>
  ),
  sun: (p) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </Icon>
  ),
  moon: (p) => (
    <Icon {...p}>
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z" />
    </Icon>
  ),
};
