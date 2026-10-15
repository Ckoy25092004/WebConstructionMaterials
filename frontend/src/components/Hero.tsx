import React from 'react';
import { Truck, CheckCircle, ShieldCheck, Flame, ArrowRight, Award } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreProducts: () => void;
  onViewPriceSheet: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onExploreProducts, onViewPriceSheet }) => {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="hero-badge">
              <Flame size={14} /> Nhà Phân Phối Cấp 1 Sắt Thép & Cát Đá Hà Nội & Miền Bắc
            </div>
            <h2 className="hero-title">
              Cung ứng Vật Liệu Xây Dựng <span>Tận Chân Công Trình</span> 24/7
            </h2>
            <p className="hero-desc">
              Hơn 15 năm kinh nghiệm phân phối thép Hòa Phát, Việt Ý, Việt Nhật, cát vàng sông Lô rửa sạch, đá 1x2 xanh Phủ Lý, xi măng Hoàng Thạch, Bút Sơn và gạch tuynel. Giá tốt tận gốc từ nhà máy, đủ tải trọng xe ben xe cẩu vào phố cấm và hẻm nhỏ tại Hà Nội.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={onOpenQuote} style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
                <span>Nhận báo giá dự thầu công trình</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn-outline" onClick={onExploreProducts} style={{ padding: '0.875rem 1.5rem', background: 'rgba(255,255,255,0.08)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                <span>Xem sản phẩm vật tư</span>
              </button>
              <button className="btn-outline" onClick={onViewPriceSheet} style={{ padding: '0.875rem 1.5rem', background: 'rgba(255,255,255,0.08)', color: '#fb923c', borderColor: 'rgba(251,146,60,0.4)' }}>
                <span>Bảng giá hôm nay</span>
              </button>
            </div>
          </div>

          <div className="hero-card-banner">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={22} color="#f59e0b" />
              Cam kết dịch vụ từ MinhQuanVLXD
            </h3>
            <div className="hero-features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <Truck size={20} />
                </div>
                <div className="feature-info">
                  <h4>Đoàn xe vận chuyển cơ động</h4>
                  <p>Sở hữu đội xe ben 3m³, 5m³, 15m³ và xe cẩu chuyên dụng có giấy phép vào phố, giao vật tư nhanh trong 2 giờ tại khắp các quận huyện Hà Nội.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <CheckCircle size={20} />
                </div>
                <div className="feature-info">
                  <h4>Chuẩn khối lượng, bao cân đo</h4>
                  <p>Cam kết cát đá đong đủ m³, sắt thép đúng barem cây/cuộn nhà máy, giao nhận có biên bản nghiệm thu tại chân công trình.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="feature-info">
                  <h4>Đầy đủ chứng chỉ CO/CQ & Hóa đơn VAT</h4>
                  <p>Cung cấp đầy đủ giấy kiểm định cơ lý, xuất xứ nhà máy giúp nhà thầu dễ dàng nghiệm thu thanh quyết toán dự án.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Strip */}
      <div className="trust-bar">
        <div className="container trust-grid">
          <div className="trust-item">
            <div className="trust-icon-box">
              <Truck size={24} />
            </div>
            <div className="trust-text">
              <strong>Giao Hàng Siêu Tốc</strong>
              <span>Có mặt chân công trình trong 2h</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box">
              <ShieldCheck size={24} />
            </div>
            <div className="trust-text">
              <strong>Hàng Chính Hãng 100%</strong>
              <span>Xuất thẳng kho nhà máy uy tín</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box">
              <CheckCircle size={24} />
            </div>
            <div className="trust-text">
              <strong>Giá Niêm Yết Cạnh Tranh</strong>
              <span>Chiết khấu cao cho nhà thầu & đại lý</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box">
              <Award size={24} />
            </div>
            <div className="trust-text">
              <strong>Bốc Xếp Chuyên Nghiệp</strong>
              <span>Hạ hàng gọn gàng, an toàn mặt bằng</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
