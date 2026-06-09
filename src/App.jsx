import { useState, useRef } from 'react';
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
  const toastTimer = useRef();

  const onBuy = (name) => {
    setCart((c) => c + 1);
    setToast('Добавлено в корзину: ' + name);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  return (
    <div className="stage">
      <SiteContent
        cart={cart}
        onBuy={onBuy}
        onLightbox={setLb}
        onBurger={() => setDrawer(true)}
      />
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />

      {lb !== null && (
        <Lightbox index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      )}

      {toast && (
        <div className="toast" role="status">
          <span className="toast-dot" />
          {toast}
        </div>
      )}
    </div>
  );
}
