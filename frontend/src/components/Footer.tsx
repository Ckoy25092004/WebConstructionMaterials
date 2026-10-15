import React from 'react';
import { MapPin, Phone, Mail, Clock, HardHat } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: '#ea580c', color: '#fff', padding: '0.5rem', borderRadius: '8px' }}>
                <HardHat size={24} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>MinhQuanVLXD</h3>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.7', color: '#94a3b8', marginBottom: '1.25rem' }}>
              Công ty Cổ Phần Vật Liệu Xây Dựng Minh Quân (MinhQuanVLXD). Hơn 15 năm kinh doanh - phân phối sắt thép xây dựng, cát vàng, cát tô, đá, xi măng và gạch ngói số 1 tại Hà Nội và các tỉnh Miền Bắc.
            </p>
            <div style={{ fontSize: '0.813rem', color: '#64748b' }}>
              <div>Mã số thuế: 0108950425</div>
              <div>Cấp bởi Sở Kế hoạch và Đầu tư Thành Phố Hà Nội</div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Hệ Thống Kho Bãi</h4>
            <ul>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} color="#ea580c" style={{ flexShrink: 0, marginTop: '4px' }} />
                <span>Trụ sở chính: Kim Trung, Đa Phúc, Thành Phố Hà Nội</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} color="#ea580c" style={{ flexShrink: 0, marginTop: '4px' }} />
                <span>Bến bãi cát đá: Kim Trung, Đa Phúc, TP. Hà Nội</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} color="#ea580c" style={{ flexShrink: 0, marginTop: '4px' }} />
                <span>Kho thép: Cụm kho trung chuyển Đa Phúc, Hà Nội</span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Liên Hệ Báo Giá</h4>
            <ul>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <Phone size={16} color="#ea580c" />
                <span>Hotline: <strong style={{ color: '#fff' }}><a href="tel:0989147773" style={{ color: '#fff' }}>0989 147 773</a></strong></span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <Phone size={16} color="#ea580c" />
                <span>Zalo kinh doanh: <strong style={{ color: '#fff' }}><a href="https://zalo.me/0989147773" target="_blank" rel="noreferrer" style={{ color: '#fff' }}>0989 147 773</a></strong></span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <Mail size={16} color="#ea580c" />
                <span>Email: contact@minhquanvlxd.vn</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <Clock size={16} color="#ea580c" />
                <span>Giờ làm việc: 06:30 - 21:00</span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Chính Sách & Quy Định</h4>
            <ul>
              <li><a href="#!">Chính sách vận chuyển & hạ hàng tại Hà Nội</a></li>
              <li><a href="#!">Quy định kiểm định chất lượng CO/CQ</a></li>
              <li><a href="#!">Chính sách thanh toán & công nợ nhà thầu</a></li>
              <li><a href="#!">Bảo hành và đổi trả vật tư lỗi</a></li>
              <li><a href="#!">Cam kết nguồn gốc xuất xứ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            Bản quyền © 2026 <strong>MinhQuanVLXD</strong>. Mua bán vật liệu xây dựng uy tín số 1 Hà Nội & Miền Bắc.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#94a3b8' }}>
            <span>Thép Hòa Phát</span>
            <span>Thép Việt Ý</span>
            <span>Xi măng Hoàng Thạch</span>
            <span>Cát Sông Lô</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
