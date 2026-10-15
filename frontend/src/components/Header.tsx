import React, { useState } from 'react';
import type { Category } from '../types';
import {
  Search, ShoppingCart, PhoneCall, HardHat, FileText, Settings,
  Home, Layers, Flame, Calculator, Truck, ChevronDown, Menu, X, MessageCircle
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  categories: Category[];
  onOpenCart: () => void;
  onOpenQuote: () => void;
  onSearch: (query: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onSelectCategory?: (id: number | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  categories,
  onOpenCart,
  onOpenQuote,
  onSearch,
  isAdmin,
  onToggleAdmin,
  activeNav,
  onSelectNav,
  onSelectCategory,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavClick = (nav: string) => {
    onSelectNav(nav);
    if (isAdmin) onToggleAdmin();
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  const handleCategoryClick = (catId: number | null) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    handleNavClick('products');
  };

  return (
    <>
      <header className="main-header">
        <div className="container header-inner">
          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => handleNavClick('home')}>
            <div className="logo-icon">
              <HardHat size={26} />
            </div>
            <div className="brand-text">
              <h1 className="logo-title">MinhQuanVLXD</h1>
              <p className="logo-sub">Vật Liệu Xây Dựng Số 1 Hà Nội</p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="search-container desktop-only">
            <form onSubmit={handleSearchSubmit} className="search-input-wrap">
              <Search size={18} color="#94a3b8" />
              <input
                type="text"
                placeholder="Tìm thép Hòa Phát, cát vàng sông Lô, đá 1x2 Phủ Lý, xi măng Hoàng Thạch..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="search-submit-btn">
                Tìm kiếm
              </button>
            </form>
          </div>

          {/* Header Action Buttons */}
          <div className="header-actions">
            <button className="hotline-btn desktop-only" onClick={() => window.open('tel:0989147773')}>
              <PhoneCall size={20} />
              <div>
                <span>Hotline Hà Nội 24/7</span>
                <strong>0989 147 773</strong>
              </div>
            </button>

            <button className="btn-primary desktop-only" onClick={onOpenQuote} style={{ fontSize: '0.875rem' }}>
              <FileText size={16} />
              <span>Báo giá nhanh</span>
            </button>

            <button className="cart-btn" onClick={onOpenCart} title="Xem giỏ hàng vật tư">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Always accessible under header on phones) */}
        <div className="mobile-search-bar mobile-only">
          <form onSubmit={handleSearchSubmit} className="search-input-wrap">
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Tìm cát, sỏi, đá, gạch, thép, xi măng..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-submit-btn" style={{ padding: '0.4rem 0.9rem', fontSize: '0.813rem' }}>
              Tìm
            </button>
          </form>
        </div>
      </header>

      {/* Modern High-End Desktop Navigation Bar */}
      <nav className="nav-bar desktop-only">
        <div className="container nav-inner">
          <ul className="nav-links">
            <li
              className={`nav-item ${activeNav === 'home' && !isAdmin ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <Home size={17} />
              <span>Trang chủ</span>
            </li>

            {/* Mega Dropdown: Categories */}
            <li
              className={`nav-item has-dropdown ${activeNav === 'products' && !isAdmin ? 'active' : ''}`}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              onClick={() => handleNavClick('products')}
            >
              <Layers size={17} />
              <span>Danh mục Vật liệu</span>
              <ChevronDown size={14} className={`dropdown-arrow ${isMegaMenuOpen ? 'open' : ''}`} />

              {/* Mega Dropdown Content */}
              {isMegaMenuOpen && (
                <div className="mega-dropdown-menu">
                  <div className="mega-dropdown-grid">
                    <div
                      className="mega-cat-item all-cat"
                      onClick={(e) => { e.stopPropagation(); handleCategoryClick(null); }}
                    >
                      <strong>Xem tất cả danh mục vật tư</strong>
                      <span>Xem toàn bộ cát, sỏi, đá, gạch, thép, xi măng</span>
                    </div>
                    {categories.map((c) => (
                      <div
                        key={c.id}
                        className="mega-cat-item"
                        onClick={(e) => { e.stopPropagation(); handleCategoryClick(c.id); }}
                      >
                        <strong>{c.name}</strong>
                        <span>{c.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <li
              className={`nav-item highlight-item ${activeNav === 'price-sheet' && !isAdmin ? 'active' : ''}`}
              onClick={() => handleNavClick('price-sheet')}
            >
              <Flame size={17} className="pulse-icon" />
              <span>Báo giá hôm nay</span>
              <span className="nav-tag-live">LIVE</span>
            </li>

            <li
              className={`nav-item ${activeNav === 'calculator' && !isAdmin ? 'active' : ''}`}
              onClick={() => handleNavClick('calculator')}
            >
              <Calculator size={17} />
              <span>Dự toán vật tư</span>
              <span className="nav-tag-calc">AI Tính</span>
            </li>

            <li
              className={`nav-item ${activeNav === 'about' && !isAdmin ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              <Truck size={17} />
              <span>Năng lực vận tải</span>
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="nav-admin-toggle" onClick={onToggleAdmin}>
              <Settings size={15} />
              <span>{isAdmin ? 'Quay lại Cửa hàng' : 'Quản trị CMS'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer (Off-Canvas Menu) */}
      <div className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`mobile-drawer-content ${isMobileMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <div className="brand-logo">
              <div className="logo-icon" style={{ width: '38px', height: '38px' }}>
                <HardHat size={22} />
              </div>
              <div className="brand-text">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#fff' }}>MinhQuanVLXD</h2>
                <p style={{ fontSize: '0.688rem', color: '#ea580c' }}>Kho Kim Trung, Đa Phúc, Hà Nội</p>
              </div>
            </div>
            <button className="drawer-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="drawer-body">
            <ul className="drawer-links">
              <li onClick={() => handleNavClick('home')}>
                <Home size={18} color="#ea580c" />
                <span>Trang chủ</span>
              </li>

              <li className="drawer-has-sub">
                <div className="drawer-sub-header" onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Layers size={18} color="#ea580c" />
                    <span>Danh mục Sản phẩm</span>
                  </div>
                  <ChevronDown size={16} className={isMobileCatOpen ? 'open' : ''} />
                </div>

                {isMobileCatOpen && (
                  <ul className="drawer-sub-list">
                    <li onClick={() => handleCategoryClick(null)}>
                      • Tất cả vật tư
                    </li>
                    {categories.map((c) => (
                      <li key={c.id} onClick={() => handleCategoryClick(c.id)}>
                        • {c.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li onClick={() => handleNavClick('price-sheet')}>
                <Flame size={18} color="#ef4444" />
                <span>Báo giá hôm nay</span>
                <span className="nav-tag-live" style={{ marginLeft: 'auto' }}>HOT</span>
              </li>

              <li onClick={() => handleNavClick('calculator')}>
                <Calculator size={18} color="#10b981" />
                <span>Dự toán xây tường & bê tông</span>
              </li>

              <li onClick={() => handleNavClick('about')}>
                <Truck size={18} color="#0284c7" />
                <span>Năng lực đoàn xe ben & kho</span>
              </li>

              <li onClick={() => { onToggleAdmin(); setIsMobileMenuOpen(false); }}>
                <Settings size={18} color="#8b5cf6" />
                <span>{isAdmin ? 'Quay lại Cửa hàng' : 'Bảng Quản Trị CMS'}</span>
              </li>
            </ul>

            {/* Quick Contact buttons in drawer */}
            <div className="drawer-actions">
              <a href="tel:0989147773" className="drawer-btn drawer-call">
                <PhoneCall size={18} />
                <span>Gọi Hotline: 0989 147 773</span>
              </a>

              <a href="https://zalo.me/0989147773" target="_blank" rel="noreferrer" className="drawer-btn drawer-zalo">
                <MessageCircle size={18} />
                <span>Chat Zalo Báo Giá</span>
              </a>

              <button className="drawer-btn drawer-quote" onClick={() => { onOpenQuote(); setIsMobileMenuOpen(false); }}>
                <FileText size={18} />
                <span>Gửi Yêu Cầu Báo Giá</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Navigation Dock (App-like UX) */}
      <div className="mobile-bottom-dock mobile-only">
        <button
          className={`bottom-dock-item ${activeNav === 'home' && !isAdmin ? 'active' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <Home size={20} />
          <span>Trang chủ</span>
        </button>

        <button
          className={`bottom-dock-item ${activeNav === 'products' && !isAdmin ? 'active' : ''}`}
          onClick={() => handleNavClick('products')}
        >
          <Layers size={20} />
          <span>Vật tư</span>
        </button>

        <button
          className={`bottom-dock-item highlight ${activeNav === 'price-sheet' && !isAdmin ? 'active' : ''}`}
          onClick={() => handleNavClick('price-sheet')}
        >
          <div className="dock-flame-bubble">
            <Flame size={20} />
          </div>
          <span>Báo giá</span>
        </button>

        <button
          className="bottom-dock-item"
          onClick={onOpenCart}
        >
          <div className="dock-cart-wrap">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="dock-badge">{cartCount}</span>}
          </div>
          <span>Giỏ hàng</span>
        </button>

        <button
          className="bottom-dock-item dock-call-btn"
          onClick={() => window.open('tel:0989147773')}
        >
          <PhoneCall size={20} />
          <span>Gọi điện</span>
        </button>
      </div>
    </>
  );
};
