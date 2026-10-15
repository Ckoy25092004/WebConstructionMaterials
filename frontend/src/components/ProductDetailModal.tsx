import React, { useState } from 'react';
import type { Product } from '../types';
import { X, ShoppingCart, FileText, Phone, ShieldCheck, Truck, CheckCircle2, Award } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenQuote: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenQuote,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const subtotal = product.price * quantity;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '850px', padding: '0', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mã sản phẩm: {product.sku}
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {product.name}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Đóng">
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
            {/* Left: Product Image */}
            <div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', aspectRatio: '4/3', background: '#f1f5f9' }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Badges / Guarantees */}
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.813rem', color: '#16a34a', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> Có sẵn tại bãi kho Kim Trung, Đa Phúc, Hà Nội
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.813rem', color: '#475569' }}>
                  <Truck size={16} color="#ea580c" /> Đội xe ben 3m³, 5m³, 15m³ giao trong 2h
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.813rem', color: '#475569' }}>
                  <ShieldCheck size={16} color="#0284c7" /> Đầy đủ CO/CQ và hóa đơn VAT nhà máy
                </div>
              </div>
            </div>

            {/* Right: Info & Pricing */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#0f172a', color: '#fff', fontSize: '0.688rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {product.brand || 'MinhQuanVLXD'}
                </span>
                {product.isFeatured && (
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.688rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    Vật tư bán chạy
                  </span>
                )}
              </div>

              {/* Price Box */}
              <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ea580c' }}>
                    {product.price.toLocaleString('vi-VN')} đ
                  </span>
                  <span style={{ color: '#64748b', fontWeight: 600, fontSize: '0.938rem' }}>
                    / {product.unit}
                  </span>
                  {product.oldPrice && (
                    <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '0.938rem', marginLeft: 'auto' }}>
                      {product.oldPrice.toLocaleString('vi-VN')} đ
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#c2410c', marginTop: '0.25rem' }}>
                  * Giá niêm yết xuất tại kho Kim Trung, Đa Phúc, Hà Nội (Đã gồm bốc xếp xe)
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                  Mô tả sản phẩm:
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: '1.6' }}>
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.875rem', marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.813rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Award size={15} color="#ea580c" /> Tiêu chuẩn kỹ thuật:
                  </h4>
                  <div style={{ fontSize: '0.813rem', color: '#334155', lineHeight: '1.5' }}>
                    {product.specifications}
                  </div>
                </div>
              )}

              {/* Quantity Picker & Total */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>Số lượng ({product.unit}):</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.2rem 0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0.25rem 0.5rem', fontWeight: 700, color: '#475569' }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 800, minWidth: '30px', textAlign: 'center', color: '#0f172a' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '0.25rem 0.5rem', fontWeight: 700, color: '#475569' }}
                  >
                    +
                  </button>
                </div>

                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Tạm tính:</span>
                  <strong style={{ fontSize: '1.125rem', color: '#ea580c' }}>
                    {subtotal.toLocaleString('vi-VN')} đ
                  </strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAdd}
                  style={{ width: '100%', padding: '0.875rem', fontSize: '0.938rem' }}
                >
                  <ShoppingCart size={18} />
                  <span>Thêm vào giỏ hàng</span>
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => { onClose(); onOpenQuote(product.name); }}
                  style={{ width: '100%', padding: '0.875rem', fontSize: '0.938rem', borderColor: '#ea580c', color: '#ea580c' }}
                >
                  <FileText size={18} />
                  <span>Báo giá dự án</span>
                </button>
              </div>

              {/* Direct call button */}
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                <a
                  href="tel:0989147773"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.813rem', color: '#dc2626', fontWeight: 700 }}
                >
                  <Phone size={14} /> Tư vấn kỹ thuật & báo giá số lượng lớn: 0989 147 773
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
