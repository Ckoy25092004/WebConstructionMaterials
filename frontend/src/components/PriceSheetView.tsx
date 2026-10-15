import type { PriceSheetItem } from '../types';
import { FileSpreadsheet, Send, Calendar } from 'lucide-react';

interface PriceSheetViewProps {
  items: PriceSheetItem[];
  onOpenQuote: (materialName?: string) => void;
}

export const PriceSheetView: React.FC<PriceSheetViewProps> = ({ items, onOpenQuote }) => {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <section className="section" id="price-sheet-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <h2>Bảng Báo Giá Vật Liệu Xây Dựng Hôm Nay</h2>
            <p>Cập nhật giá sắt thép, cát xây tô, đá bê tông, xi măng và gạch mới nhất thị trường</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Calendar size={15} color="#ea580c" /> Áp dụng ngày: <strong>{currentDate}</strong>
            </span>
            <button className="btn-primary" onClick={() => onOpenQuote()} style={{ fontSize: '0.813rem', padding: '0.5rem 1rem' }}>
              <Send size={14} /> Nhận báo giá lô lớn
            </button>
          </div>
        </div>

        <div className="price-table-card">
          <div className="price-table-header">
            <h3>
              <FileSpreadsheet size={20} color="#fb923c" />
              Báo Giá Niêm Yết Tại Kho MinhQuanVLXD (Đã gồm VAT & Hỗ trợ vận chuyển Hà Nội)
            </h3>
            <span style={{ fontSize: '0.813rem', color: '#94a3b8' }}>
              * Lưu ý: Đơn giá sắt thép có thể thay đổi theo biến động phôi thép hàng ngày
            </span>
          </div>

          <div className="table-responsive">
            <table className="price-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>STT</th>
                  <th>Chủng loại vật liệu</th>
                  <th>Quy cách / Tiêu chuẩn</th>
                  <th>Đơn vị tính</th>
                  <th>Đơn giá niêm yết (VNĐ)</th>
                  <th>Ghi chú giao nhận</th>
                  <th style={{ textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td><strong>{index + 1}</strong></td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{item.materialName}</span>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.categoryName}</div>
                    </td>
                    <td>{item.specification}</td>
                    <td>
                      <span style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                        {item.unit}
                      </span>
                    </td>
                    <td>
                      <span className="price-cell">{item.price.toLocaleString('vi-VN')} đ</span>
                    </td>
                    <td style={{ fontSize: '0.813rem', color: '#475569' }}>{item.note}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn-card-quote"
                        style={{ padding: '0.35rem 0.75rem', display: 'inline-flex' }}
                        onClick={() => onOpenQuote(item.materialName)}
                      >
                        Báo giá nhanh
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
