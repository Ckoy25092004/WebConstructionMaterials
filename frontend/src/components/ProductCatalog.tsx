import React from 'react';
import type { Category, Product } from '../types';
import { ShoppingCart, FileText, Shield, Eye } from 'lucide-react';

interface ProductCatalogProps {
  categories: Category[];
  products: Product[];
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
  onAddToCart: (product: Product) => void;
  onOpenQuote: (productName?: string) => void;
  onViewProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  categories,
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onOpenQuote,
  onViewProduct,
}) => {
  return (
    <section className="section" id="products-section" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <h2>Sản Phẩm Vật Liệu Xây Dựng Tiêu Biểu</h2>
            <p>Hàng có sẵn tại bãi cát, bãi đá và kho thép MinhQuanVLXD (Kim Trung, Đa Phúc, Hà Nội) - Vận chuyển ngay trong ngày</p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="cat-filters">
          <button
            className={`cat-pill ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => onSelectCategory(null)}
          >
            Tất cả vật tư ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              {/* Clickable Image to view detail */}
              <div
                className="product-img-wrap"
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() => onViewProduct(p)}
                title="Bấm để xem chi tiết sản phẩm"
              >
                <img src={p.imageUrl} alt={p.name} loading="lazy" />
                <div className="product-badge-wrap">
                  {p.isFeatured && <span className="badge-tag badge-featured">Bán chạy</span>}
                  {p.brand && <span className="badge-tag badge-brand">{p.brand}</span>}
                </div>
                {/* View Detail overlay hint */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.688rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <Eye size={12} /> Chi tiết
                </div>
              </div>

              <div className="product-body">
                <div className="product-sku">{p.sku}</div>
                <h3
                  className="product-title"
                  title={p.name}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onViewProduct(p)}
                >
                  {p.name}
                </h3>
                <p className="product-desc">{p.description}</p>

                {p.specifications && (
                  <div style={{ fontSize: '0.75rem', color: '#475569', background: '#f1f5f9', padding: '0.375rem 0.5rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
                    <Shield size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                    {p.specifications}
                  </div>
                )}

                <div className="product-price-box">
                  <div className="price-main">{p.price.toLocaleString('vi-VN')} đ</div>
                  <div className="price-unit">/ {p.unit}</div>
                  {p.oldPrice && (
                    <div className="price-old">{p.oldPrice.toLocaleString('vi-VN')} đ</div>
                  )}
                </div>

                <div className="product-card-actions">
                  <button className="btn-card-quote" onClick={() => onOpenQuote(p.name)}>
                    <FileText size={15} />
                    <span>Báo giá</span>
                  </button>
                  <button className="btn-card-add" onClick={() => onAddToCart(p)}>
                    <ShoppingCart size={15} />
                    <span>Đặt mua</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
