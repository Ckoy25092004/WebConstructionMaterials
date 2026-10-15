import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle, ShoppingBag } from 'lucide-react';
import type { CartItem, Order } from '../types';
import { api } from '../services/api';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, qty: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Chuyển khoản'>('COD');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber || !shippingAddress) {
      alert('Vui lòng điền Họ tên, Số điện thoại và Địa chỉ giao hàng!');
      return;
    }

    setLoading(true);
    const order: Order = {
      customerName,
      phoneNumber,
      shippingAddress,
      paymentMethod,
      note,
      totalAmount,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        unit: item.product.unit,
        unitPrice: item.product.price,
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity,
      })),
    };

    const res = await api.createOrder(order);
    setLoading(false);

    if (res.success) {
      setOrderSuccess(res.orderCode || 'VLXD-ORDER');
      onClearCart();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Giỏ Hàng Vật Tư Xây Dựng ({cartItems.length} mặt hàng)</h3>
            <span style={{ fontSize: '0.813rem', color: '#64748b' }}>
              Kiểm tra đơn hàng và địa điểm hạ hàng công trình
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {orderSuccess ? (
          <div style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
            <CheckCircle size={64} color="#16a34a" style={{ margin: '0 auto 1.25rem' }} />
            <h4 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Đặt Hàng Thành Công!
            </h4>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              Mã đơn hàng của bạn là: <strong style={{ color: '#ea580c' }}>{orderSuccess}</strong>
            </p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
              Điều phối viên bãi xe MinhQuanVLXD sẽ gọi điện xác nhận giờ xe ben/xe cẩu giao hàng tận nơi tại công trình.
            </p>
            <button className="btn-primary" onClick={onClose}>
              Tiếp tục xem sản phẩm
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <ShoppingBag size={54} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Giỏ hàng của bạn đang trống
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Hãy chọn các loại vật liệu xây dựng (cát, đá, thép, xi măng, gạch) vào giỏ để đặt hàng.
            </p>
            <button className="btn-primary" onClick={onClose}>
              Xem danh mục sản phẩm
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckout}>
            <div className="modal-body">
              {/* Items List */}
              <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Đơn giá: {item.product.price.toLocaleString('vi-VN')} đ / {item.product.unit}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.25rem 0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        style={{ padding: '0.25rem' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem', minWidth: '24px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        style={{ padding: '0.25rem' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ fontWeight: 800, color: '#ea580c', fontSize: '0.938rem', minWidth: '90px', textAlign: 'right' }}>
                      {(item.product.price * item.quantity).toLocaleString('vi-VN')} đ
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      style={{ color: '#94a3b8', padding: '0.25rem' }}
                      title="Xóa món"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Summary */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Tổng tiền vật tư tạm tính:</span>
                <span style={{ fontSize: '1.375rem', fontWeight: 800, color: '#dc2626' }}>
                  {totalAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>

              {/* Checkout Form */}
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                Thông tin nhận hàng tận chân công trình
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.813rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>
                    Họ và tên người nhận *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Anh Tuấn"
                    className="form-input"
                    style={{ background: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.813rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>
                    Số điện thoại liên hệ *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="VD: 0912 xxx xxx"
                    className="form-input"
                    style={{ background: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.813rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>
                  Địa chỉ giao nhận công trình (Số nhà, đường, quận/huyện) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: 120/5 Lê Trọng Tấn, P. Tây Thạnh, Tân Phú, TP.HCM"
                  className="form-input"
                  style={{ background: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.813rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>
                    Phương thức thanh toán
                  </label>
                  <select
                    className="form-input"
                    style={{ background: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                  >
                    <option value="COD">Thanh toán tiền mặt khi nhận hàng (COD)</option>
                    <option value="Chuyển khoản">Chuyển khoản ngân hàng (Ủy nhiệm chi)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.813rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>
                    Ghi chú hạ hàng / Loại xe
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Xe ben 5m3 vào hẻm được..."
                    className="form-input"
                    style={{ background: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-outline" onClick={onClose} disabled={loading}>
                Đóng
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Đang tạo đơn hàng...' : 'Xác Nhận Đặt Hàng Ngay'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
