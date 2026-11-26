import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { List, MagnifyingGlass, ShoppingCart, WhatsappLogo, X } from '@phosphor-icons/react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categories';
import './Header.css';

const WHATSAPP_URL = 'https://wa.me/2010XXXXXXXXX';

export default function Header() {
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen((open) => !open);
  };

  const toggleMenu = () => {
    setIsSearchOpen(false);
    setIsMenuOpen((open) => !open);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setQuery('');
    closeAll();
  };

  return (
    <header className="site-header">
      <div className="container header-bar">
        <button
          type="button"
          className="icon-btn menu-toggle"
          aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X weight="bold" /> : <List weight="bold" />}
        </button>

        <Link to="/" className="brand" onClick={closeAll}>
          منظفات الإيمان
        </Link>

        <nav id="site-nav" className={`site-nav ${isMenuOpen ? 'open' : ''}`} aria-label="الأقسام">
          <ul className="nav-list">
            {categories.map((category) => (
              <li key={category.id}>
                <NavLink
                  to={`/category/${category.slug}`}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeAll}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="nav-whatsapp">
            <WhatsappLogo aria-hidden="true" />
            تواصل معنا عبر واتساب
          </a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label={isSearchOpen ? 'إغلاق البحث' : 'بحث'}
            aria-expanded={isSearchOpen}
            aria-controls="site-search"
            onClick={toggleSearch}
          >
            {isSearchOpen ? <X weight="bold" /> : <MagnifyingGlass />}
          </button>
          <Link to="/cart" className="icon-btn cart-btn" aria-label={`سلة التسوق، ${itemCount} قطعة`} onClick={closeAll}>
            <ShoppingCart />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div id="site-search" className="search-panel">
          <form
            className="container search-panel-form"
            role="search"
            onSubmit={submitSearch}
            onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
          >
            <MagnifyingGlass aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج أو ماركة..."
              aria-label="البحث في المتجر"
              autoFocus
            />
            <button type="submit" className="btn btn-primary">بحث</button>
          </form>
        </div>
      )}
    </header>
  );
}
