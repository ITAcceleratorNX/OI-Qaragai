import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MobileDrawer } from './components/Header.jsx';
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
import { TopBar, Header } from './components/Header.jsx';
import { OffersPage } from './pages/OffersPage.jsx';
import { GuidePage } from './pages/GuidePage.jsx';
import { EventsPage } from './pages/EventsPage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage({ onBuy, onLightbox, cart, onBurger }) {
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

function AppRoutes({ cart, onBuy, onLightbox, drawer, onBurger, onCloseDrawer }) {
  const shared = { cart, onBuy, onBurger, drawer, onCloseDrawer };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            cart={cart}
            onBuy={onBuy}
            onLightbox={onLightbox}
            onBurger={onBurger}
          />
        }
      />
      <Route path="/offers" element={<OffersPage {...shared} />} />
      <Route path="/guide" element={<GuidePage {...shared} />} />
      <Route path="/events" element={<EventsPage {...shared} />} />
    </Routes>
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
    <BrowserRouter>
      <ScrollToTop />
      <div className="stage">
        <AppRoutes
          cart={cart}
          onBuy={onBuy}
          onLightbox={setLb}
          drawer={drawer}
          onBurger={() => setDrawer(true)}
          onCloseDrawer={() => setDrawer(false)}
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
    </BrowserRouter>
  );
}
