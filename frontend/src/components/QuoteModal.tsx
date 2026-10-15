import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import type { QuoteRequest } from '../types';
import { api } from '../services/api';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMaterial?: string;
  initialNotes?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialMaterial = '',
  initialNotes = '',
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [projectAddress, setProjectAddress] = useState('');
  const [requestedMaterials, setRequestedMaterials] = useState(initialMaterial);
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (initialMaterial) setRequestedMaterials(initialMaterial);
    if (initialNotes) setNotes(initialNotes);
  }, [initialMaterial, initialNotes]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }

    setLoading(true);
    const quote: QuoteRequest = {
      customerName,
      phoneNumber,
      email,
      projectAddress: projectAddress || 'Giao tại chân công trình',
      requestedMaterials,
      notes,
    };

    const res = await api.createQuoteRequest(quote);
    setLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Yêu Cầu Báo Giá Nhanh Vật Tư Xây Dựng</h3>
            <span style={{ fontSize: '0.813rem', color: '#64748b' }}>
              Bộ phận kinh doanh MinhQuanVLXD sẽ liên hệ phản hồi trong 15 phút
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {successMsg ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <CheckCircle size={60} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Tiếp Nhận Thành Công!
            </h4>
            <p style={{ color: '#475569' }}>{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label style={{ color: '#0f172a' }}>Họ và tên quý khách *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Anh Nam, Chị Thảo"
                    className="form-input"
                    style={{ background: '#f8fafc', color: '#0f172a', borderColor: '#cbd5e1' }}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#0f172a' }}>Số điện thoại (Zalo) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="VD: 0989 147 773"
                    className="form-input"
                    style={{ background: '#f8fafc', color: '#0f172a', borderColor: '#cbd5e1' }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ color: '#0f172a' }}>Email nhận báo giá chi tiết (không bắt buộc)</label>
                <input
                  type="email"
                  placeholder="VD: congtrinh@gmail.com"
                  className="form-input"
                  style={{ background: '#f8fafc', color: '#0f172a', borderColor: '#cbd5e1' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label style={{ color: '#0f172a' }}>Địa chỉ công trình / Điểm giao hàng</label>
                <input
                  type="text"
                  placeholder="VD: Sóc Sơn, Đông Anh, Long Biên, Cầu Giấy, Hà Nội..."
                  className="form-input"
                  style={{ background: '#f8fafc', color: '#0f172a', borderColor: '#cbd5e1' }}
                  value={projectAddress}
                  onChange={(e) => setProjectAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label style={{ color: '#0f172a' }}>Chủng loại vật liệu cần báo giá</label>
                <input
                  type="text"
                  placeholder="VD: Thép Hòa Phát D10, 50m³ cát bê tông, 30 bao xi măng..."
                  className="form-input"
                  style={{ background: '#f8fafc', color: '#0f172a', borderColor: '#cbd5e1' }}
                  value={requestedMaterials}
                  onChange={(e) => setRequestedMaterials(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label style={{ color: '#0f172a' }}>Ghi chú tiến độ hoặc xe vào hẻm</label>
                <textarea
                  rows={3}
                  placeholder="VD: Cần giao trước 7h sáng, hẻm rộng 4m xe ben 5 tấn vào lọt..."
                  className="form-input"
                  style={{ background: '#f8fafc', color: '#0f172a', borderColor: '#cbd5e1' }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-outline" onClick={onClose} disabled={loading}>
                Hủy bỏ
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                <Send size={16} />
                <span>{loading ? 'Đang gửi yêu cầu...' : 'Gửi Yêu Cầu Báo Giá'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
