import { TopBar, Header } from './Header.jsx';
import { Footer } from './Sections.jsx';

export function PageShell({ children, cart, onBurger }) {
  return (
    <div className="site">
      <TopBar />
      <Header cart={cart} onBurger={onBurger} />
      {children}
      <Footer />
    </div>
  );
}
