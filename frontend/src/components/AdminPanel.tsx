import React, { useState, useEffect } from 'react';
import type { QuoteRequest, Order, PriceSheetItem } from '../types';
import { api } from '../services/api';
import { FileText, ShoppingBag, DollarSign } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'orders' | 'prices'>('quotes');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [prices, setPrices] = useState<PriceSheetItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [qData, oData, pData] = await Promise.all([
      api.getQuoteRequests(),
      api.getOrders(),
      api.getPriceSheet()
    ]);
    setQuotes(qData);
    setOrders(oData);
    setPrices(pData);
    setLoading(false);
  };

  return (
    <div className="section" style={{ background: '#f1f5f9', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
              Hệ Thống Quản Trị Cửa Hàng Vật Liệu Xây Dựng (Admin CMS)
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Quản lý yêu cầu báo giá công trình, điều phối đơn đặt hàng và cập nhật đơn giá vật tư
            </p>
          </div>
          <button className="btn-outline" onClick={loadData} disabled={loading} style={{ background: '#fff' }}>
            {loading ? 'Đang tải...' : 'Làm mới dữ liệu'}
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setActiveTab('quotes')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: activeTab === 'quotes' ? '#ea580c' : '#fff',
              color: activeTab === 'quotes' ? '#fff' : '#0f172a',
              border: '1px solid #cbd5e1',
              boxShadow: activeTab === 'quotes' ? '0 4px 12px rgba(234,88,12,0.25)' : 'none'
            }}
          >
            <FileText size={16} />
            <span>Yêu cầu báo giá ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: activeTab === 'orders' ? '#ea580c' : '#fff',
              color: activeTab === 'orders' ? '#fff' : '#0f172a',
              border: '1px solid #cbd5e1',
              boxShadow: activeTab === 'orders' ? '0 4px 12px rgba(234,88,12,0.25)' : 'none'
            }}
          >
            <ShoppingBag size={16} />
            <span>Đơn đặt hàng trực tuyến ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: activeTab === 'prices' ? '#ea580c' : '#fff',
              color: activeTab === 'prices' ? '#fff' : '#0f172a',
              border: '1px solid #cbd5e1',
              boxShadow: activeTab === 'prices' ? '0 4px 12px rgba(234,88,12,0.25)' : 'none'
            }}
          >
            <DollarSign size={16} />
            <span>Bảng giá niêm yết kho ({prices.length})</span>
          </button>
        </div>

        {/* Tab 1: Quotes */}
        {activeTab === 'quotes' && (
          <div className="price-table-card">
            <div className="table-responsive">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Mã / Ngày gửi</th>
                    <th>Khách hàng</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ công trình</th>
                    <th>Vật tư yêu cầu</th>
                    <th>Ghi chú thi công</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                        Chưa có yêu cầu báo giá nào mới
                      </td>
                    </tr>
                  ) : (
                    quotes.map((q, idx) => (
                      <tr key={q.id || idx}>
                        <td style={{ fontSize: '0.813rem', color: '#64748b' }}>
                          #{q.id || (idx + 1)}
                          <div style={{ fontSize: '0.75rem' }}>{new Date(q.createdAt || Date.now()).toLocaleDateString('vi-VN')}</div>
                        </td>
                        <td><strong>{q.customerName}</strong></td>
                        <td>
                          <a href={`tel:${q.phoneNumber}`} style={{ color: '#ea580c', fontWeight: 600 }}>
                            {q.phoneNumber}
                          </a>
                        </td>
                        <td style={{ maxWidth: '200px' }}>{q.projectAddress}</td>
                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{q.requestedMaterials || 'Toàn bộ vật tư phần thô'}</td>
                        <td style={{ fontSize: '0.813rem', color: '#64748b' }}>{q.notes || '—'}</td>
                        <td>
                          <span style={{ background: '#fef3c7', color: '#d97706', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {q.status || 'Chờ xử lý'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div className="price-table-card">
            <div className="table-responsive">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách nhận</th>
                    <th>Số ĐT</th>
                    <th>Địa chỉ giao</th>
                    <th>Chi tiết vật tư</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                        Chưa có đơn hàng nào
                      </td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id || o.orderCode}>
                        <td><strong style={{ color: '#ea580c' }}>{o.orderCode}</strong></td>
                        <td><strong>{o.customerName}</strong></td>
                        <td>{o.phoneNumber}</td>
                        <td style={{ maxWidth: '200px' }}>{o.shippingAddress}</td>
                        <td>
                          {o.items?.map((it, i) => (
                            <div key={i} style={{ fontSize: '0.75rem' }}>
                              • {it.productName} ({it.quantity} {it.unit})
                            </div>
                          ))}
                        </td>
                        <td style={{ fontWeight: 800, color: '#dc2626' }}>
                          {o.totalAmount.toLocaleString('vi-VN')} đ
                        </td>
                        <td>
                          <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {o.status || 'Mới tiếp nhận'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Price Management */}
        {activeTab === 'prices' && (
          <div className="price-table-card">
            <div className="table-responsive">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Mặt hàng</th>
                    <th>Nhóm vật liệu</th>
                    <th>Quy cách</th>
                    <th>ĐVT</th>
                    <th>Giá kho (VNĐ)</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.materialName}</strong></td>
                      <td>{p.categoryName}</td>
                      <td>{p.specification}</td>
                      <td>{p.unit}</td>
                      <td>
                        <strong style={{ color: '#ea580c' }}>{p.price.toLocaleString('vi-VN')} đ</strong>
                      </td>
                      <td style={{ fontSize: '0.813rem', color: '#64748b' }}>{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
