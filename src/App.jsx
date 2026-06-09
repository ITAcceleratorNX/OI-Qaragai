import { useState, useEffect, useRef } from 'react';
import { I } from './icons.jsx';
import { TopBar, Header, MobileDrawer } from './components/Header.jsx';
import {
  Hero,
  QuickEntries,
  Offers,
  ThingsToDo,
  Events,
  Gallery,
  Lightbox,
  Rules,
  AppBanner,
  Partners,
  Footer,
} from './components/Sections.jsx';

function SiteContent({ onBuy, onLightbox, cart, onBurger }) {
  return (
    <div className="site">
      <TopBar />
      <Header cart={cart} onBurger={onBurger} />
      <Hero />
      <QuickEntries />
      <Offers onBuy={onBuy} />
      <ThingsToDo onBuy={onBuy} />
      <Events />
      <Gallery onOpen={onLightbox} />
      <Rules />
      <AppBanner />
      <Partners />
      <Footer />
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [lb, setLb] = useState(null);
  const [vp, setVp] = useState('desktop');
  const [theme, setTheme] = useState('dark');
  const toastTimer = useRef();

  useEffect(() => {
    const bg = theme === 'light' ? '#ffffff' : '#070706';
    document.documentElement.style.background = bg;
    document.body.style.background = bg;
  }, [theme]);

  const onBuy = (name) => {
    setCart((c) => c + 1);
    setToast('Добавлено в корзину: ' + name);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const mobile = vp === 'mobile';

  return (
    <div className={'stage' + (mobile ? ' is-mobile' : '')} data-theme={theme}>
      {mobile ? (
        <div className="phone">
          <div className="phone-notch"></div>
          <SiteContent
            cart={cart}
            onBuy={onBuy}
            onLightbox={setLb}
            onBurger={() => setDrawer(true)}
          />
          <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
        </div>
      ) : (
        <>
          <SiteContent
            cart={cart}
            onBuy={onBuy}
            onLightbox={setLb}
            onBurger={() => setDrawer(true)}
          />
          <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
        </>
      )}

      {lb !== null && (
        <Lightbox index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      )}

      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 84,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 320,
            background: 'var(--surface)',
            border: '1px solid var(--line-2)',
            borderRadius: 12,
            padding: '13px 20px',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontWeight: 600,
            fontSize: 14,
            animation: 'fade .25s',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
          ></span>
          {toast}
        </div>
      )}

      <div className="theme-toggle">
        <button
          className={theme === 'dark' ? 'on' : ''}
          onClick={() => setTheme('dark')}
        >
          <I.moon size={17} />
          <span>Тёмная</span>
        </button>
        <button
          className={theme === 'light' ? 'on' : ''}
          onClick={() => setTheme('light')}
        >
          <I.sun size={17} />
          <span>Светлая</span>
        </button>
      </div>

      <div className="vp-toggle">
        <button
          className={vp === 'desktop' ? 'on' : ''}
          onClick={() => setVp('desktop')}
        >
          <I.desktop size={17} />
          <span>Desktop</span>
        </button>
        <button
          className={vp === 'mobile' ? 'on' : ''}
          onClick={() => setVp('mobile')}
        >
          <I.mobile size={17} />
          <span>Mobile</span>
        </button>
      </div>
    </div>
  );
}
