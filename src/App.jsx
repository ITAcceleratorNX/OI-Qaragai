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
import { EventsHubPage } from './pages/EventsHubPage.jsx';
import { EventAfishaPage } from './pages/EventAfishaPage.jsx';
import { CorporateEventsPage } from './pages/CorporateEventsPage.jsx';
import { WeatherPage } from './pages/WeatherPage.jsx';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage.jsx';
import { HotelDetailPage } from './pages/HotelDetailPage.jsx';
import { ActivityDetailPage } from './pages/ActivityDetailPage.jsx';
import { SpaDetailPage } from './pages/SpaDetailPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import {
  addToCart,
  getCartCount,
  removeFromCart,
  updateQty,
} from './lib/cart.js';

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

function AppRoutes({
  cart,
  cartItems,
  onBuy,
  onQty,
  onRemove,
  onCheckout,
  onLightbox,
  drawer,
  onBurger,
  onCloseDrawer,
}) {
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
      <Route path="/events" element={<EventsHubPage {...shared} />} />
      <Route path="/events/event" element={<EventAfishaPage {...shared} />} />
      <Route path="/events/corporate" element={<CorporateEventsPage {...shared} />} />
      <Route path="/weather" element={<WeatherPage cart={cart} onBurger={onBurger} />} />
      <Route path="/restaurants/:id" element={<RestaurantDetailPage {...shared} />} />
      <Route path="/hotels/:id" element={<HotelDetailPage {...shared} />} />
      <Route path="/activities/:id" element={<ActivityDetailPage {...shared} />} />
      <Route path="/spa/:id" element={<SpaDetailPage {...shared} />} />
      <Route
        path="/cart"
        element={
          <CartPage
            cart={cart}
            cartItems={cartItems}
            onBurger={onBurger}
            onQty={onQty}
            onRemove={onRemove}
            onCheckout={onCheckout}
          />
        }
      />
      <Route path="/profile" element={<ProfilePage cart={cart} onBurger={onBurger} />} />
    </Routes>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [lb, setLb] = useState(null);
  const toastTimer = useRef();
  const cart = getCartCount(cartItems);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const onBuy = (product) => {
    setCartItems((items) => addToCart(items, product));
    showToast('Добавлено в корзину: ' + product.title);
  };

  const onQty = (id, delta) => {
    setCartItems((items) => updateQty(items, id, delta));
  };

  const onRemove = (id) => {
    setCartItems((items) => removeFromCart(items, id));
  };

  const onCheckout = () => {
    showToast('Заказ оформлен! Мы свяжемся с вами в ближайшее время.');
    setCartItems([]);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="stage">
        <AppRoutes
          cart={cart}
          cartItems={cartItems}
          onBuy={onBuy}
          onQty={onQty}
          onRemove={onRemove}
          onCheckout={onCheckout}
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
