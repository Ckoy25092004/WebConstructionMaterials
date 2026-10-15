import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        <div className="top-bar-left">
          <div className="top-bar-item">
            <MapPin size={14} color="#ea580c" />
            <span>Tổng kho: Kim Trung, Đa Phúc, Thành Phố Hà Nội</span>
          </div>
          <div className="top-bar-item">
            <Clock size={14} color="#ea580c" />
            <span>Mở cửa: 06:30 - 21:00 (Cả CN & Ngày lễ)</span>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="top-bar-item">
            <ShieldCheck size={14} color="#16a34a" />
            <span>Cam kết sắt thép chính hãng 100% có CO/CQ</span>
          </div>
          <div className="top-bar-item">
            <Phone size={14} color="#ea580c" />
            <a href="tel:0989147773"><strong>Hotline kỹ thuật: 0989 147 773</strong></a>
          </div>
        </div>
      </div>
    </div>
  );
};
