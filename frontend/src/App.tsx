import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PriceSheetView } from './components/PriceSheetView';
import { ProductCatalog } from './components/ProductCatalog';
import { MaterialCalculator } from './components/MaterialCalculator';
import { QuoteModal } from './components/QuoteModal';
import { CartModal } from './components/CartModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import type { Category, Product, PriceSheetItem, CartItem } from './types';
import { api } from './services/api';
import { Phone, MessageCircle, FileText } from 'lucide-react';

export const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [priceSheets, setPriceSheets] = useState<PriceSheetItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Modals & Navigation state
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialMaterial, setQuoteInitialMaterial] = useState('');
  const [quoteInitialNotes, setQuoteInitialNotes] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const [cats, prods, prices] = await Promise.all([
      api.getCategories(),
      api.getProducts(),
      api.getPriceSheet()
    ]);
    setCategories(cats);
    setProducts(prods.items);
    setPriceSheets(prices);
  };

  const handleSearch = async (query: string) => {
    const res = await api.getProducts({ search: query });
    setProducts(res.items);
    setSelectedCategory(null);
    const prodEl = document.getElementById('products-section');
    if (prodEl) prodEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = async (id: number | null) => {
    setSelectedCategory(id);
    const res = await api.getProducts({ categoryId: id ?? undefined });
    setProducts(res.items);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveCartItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenQuote = (materialName?: string, notes?: string) => {
    setQuoteInitialMaterial(materialName || '');
    setQuoteInitialNotes(notes || '');
    setIsQuoteOpen(true);
  };

  const handleNavSelect = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nav === 'products') {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'price-sheet') {
      document.getElementById('price-sheet-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'calculator') {
      document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="site-wrapper">
      <TopBar />
      <Header
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        categories={categories}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
        onSearch={handleSearch}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
        activeNav={activeNav}
        onSelectNav={handleNavSelect}
        onSelectCategory={handleSelectCategory}
      />

      {isAdmin ? (
        <AdminPanel />
      ) : (
        <main>
          <Hero
            onOpenQuote={() => handleOpenQuote()}
            onExploreProducts={() => handleNavSelect('products')}
            onViewPriceSheet={() => handleNavSelect('price-sheet')}
          />

          <PriceSheetView
            items={priceSheets}
            onOpenQuote={(mat) => handleOpenQuote(mat)}
          />

          <ProductCatalog
            categories={categories}
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onAddToCart={handleAddToCart}
            onOpenQuote={(prodName) => handleOpenQuote(prodName)}
            onViewProduct={(product) => setSelectedProductForDetail(product)}
          />

          <MaterialCalculator
            onOpenQuoteWithData={(notes) => handleOpenQuote('', notes)}
          />
        </main>
      )}

      <Footer />

      {/* Floating Quick Action Contacts */}
      <div className="floating-contacts">
        <a
          href="https://zalo.me/0989147773"
          target="_blank"
          rel="noreferrer"
          className="float-btn float-zalo"
          title="Chat Zalo với kỹ sư vật liệu (0989 147 773)"
        >
          <MessageCircle size={26} />
        </a>
        <button
          className="float-btn float-quote"
          onClick={() => handleOpenQuote()}
          title="Yêu cầu báo giá nhanh"
        >
          <FileText size={24} />
        </button>
        <a
          href="tel:0989147773"
          className="float-btn float-phone"
          title="Gọi Hotline báo giá 0989 147 773"
        >
          <Phone size={24} />
        </a>
      </div>

      {/* Modals */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={(product, qty) => {
          for (let i = 0; i < qty; i++) {
            handleAddToCart(product);
          }
        }}
        onOpenQuote={(prodName) => handleOpenQuote(prodName)}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialMaterial={quoteInitialMaterial}
        initialNotes={quoteInitialNotes}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default App;
