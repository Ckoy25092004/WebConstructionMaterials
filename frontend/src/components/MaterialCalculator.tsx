import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

interface MaterialCalculatorProps {
  onOpenQuoteWithData: (notes: string) => void;
}

export const MaterialCalculator: React.FC<MaterialCalculatorProps> = ({ onOpenQuoteWithData }) => {
  const [calcType, setCalcType] = useState<'wall' | 'concrete'>('wall');
  const [wallArea, setWallArea] = useState<number>(50);
  const [wallType, setWallType] = useState<'10' | '20'>('10');
  const [concreteVolume, setConcreteVolume] = useState<number>(10);

  // Calculations for wall
  const brickPerM2 = wallType === '10' ? 68 : 136;
  const cementPerM2 = wallType === '10' ? 5.5 : 11;
  const sandPerM2 = wallType === '10' ? 0.04 : 0.08;

  const totalBricks = Math.round(wallArea * brickPerM2);
  const totalCementBags = Math.ceil((wallArea * cementPerM2) / 50);
  const totalSandM3 = Number((wallArea * sandPerM2).toFixed(2));

  // Calculations for concrete mác 250
  const concreteCementBags = Math.ceil(concreteVolume * 7); // ~350kg = 7 bags per m3
  const concreteSandM3 = Number((concreteVolume * 0.46).toFixed(2));
  const concreteStoneM3 = Number((concreteVolume * 0.86).toFixed(2));
  const concreteSteelKg = Math.round(concreteVolume * 30);

  const handleApplyToQuote = () => {
    let note = '';
    if (calcType === 'wall') {
      note = `Dự toán xây tường ${wallType === '10' ? '10cm' : '20cm'} (${wallArea} m²): Cần ${totalBricks.toLocaleString('vi-VN')} viên gạch tuynel, ${totalCementBags} bao xi măng, ${totalSandM3} m³ cát xây tô.`;
    } else {
      note = `Dự toán đổ bê tông mác 250 (${concreteVolume} m³): Cần ${concreteCementBags} bao xi măng, ${concreteSandM3} m³ cát bê tông, ${concreteStoneM3} m³ đá 1x2, ~${concreteSteelKg} kg thép.`;
    }
    onOpenQuoteWithData(note);
  };

  return (
    <section className="section" id="calculator-section">
      <div className="container">
        <div className="calc-section">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234,88,12,0.2)', padding: '0.375rem 0.875rem', borderRadius: '9999px', color: '#fb923c', fontSize: '0.813rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Calculator size={15} /> Công cụ kỹ thuật độc quyền
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
              Bảng Tính Dự Toán Định Mức Vật Tư Xây Dựng
            </h2>
            <p style={{ color: '#94a3b8' }}>
              Dễ dàng dự trù chính xác số lượng gạch, cát, đá, xi măng và sắt thép cần chuẩn bị cho ngôi nhà của bạn
            </p>
          </div>

          {/* Tab Selector */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
            <button
              onClick={() => setCalcType('wall')}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.875rem',
                background: calcType === 'wall' ? '#ea580c' : '#334155',
                color: '#fff',
                transition: 'all 0.2s'
              }}
            >
              1. Dự toán Xây Tường Gạch
            </button>
            <button
              onClick={() => setCalcType('concrete')}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.875rem',
                background: calcType === 'concrete' ? '#ea580c' : '#334155',
                color: '#fff',
                transition: 'all 0.2s'
              }}
            >
              2. Dự toán Đổ Bê Tông (Mác 250)
            </button>
          </div>

          <div className="calc-grid">
            {/* Input Controls */}
            <div className="calc-inputs">
              {calcType === 'wall' ? (
                <>
                  <div className="form-group">
                    <label>Diện tích tường cần xây (m²):</label>
                    <input
                      type="number"
                      min="1"
                      className="form-input"
                      value={wallArea}
                      onChange={(e) => setWallArea(Math.max(1, Number(e.target.value)))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Loại kết cấu tường:</label>
                    <select
                      className="form-input"
                      value={wallType}
                      onChange={(e) => setWallType(e.target.value as '10' | '20')}
                    >
                      <option value="10">Tường 10cm (Tường đơn ngăn phòng)</option>
                      <option value="20">Tường 20cm (Tường đôi chịu lực, cách nhiệt mặt tiền)</option>
                    </select>
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label>Khối lượng bê tông cần đổ (m³):</label>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={concreteVolume}
                    onChange={(e) => setConcreteVolume(Math.max(1, Number(e.target.value)))}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '0.25rem' }}>
                    * Mác bê tông chuẩn 250 dùng cho sàn, dầm, cột nhà ở dân dụng
                  </span>
                </div>
              )}

              <button
                className="btn-primary"
                onClick={handleApplyToQuote}
                style={{ marginTop: '0.5rem', width: '100%', padding: '0.875rem' }}
              >
                <span>Chuyển khối lượng này sang Yêu cầu báo giá</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Calculated Output */}
            <div className="calc-results-box">
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                Khối lượng vật tư dự tính chuẩn bị:
              </h4>

              {calcType === 'wall' ? (
                <>
                  <div className="calc-item">
                    <span className="calc-item-name">Gạch Tuynel 4 lỗ / Gạch ống:</span>
                    <span className="calc-item-val">{totalBricks.toLocaleString('vi-VN')} viên</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-item-name">Xi măng PCB40 (bao 50kg):</span>
                    <span className="calc-item-val">{totalCementBags} bao</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-item-name">Cát xây tô sàng mịn:</span>
                    <span className="calc-item-val">{totalSandM3} m³ (ben)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="calc-item">
                    <span className="calc-item-name">Xi măng Hà Tiên / Insee (bao 50kg):</span>
                    <span className="calc-item-val">{concreteCementBags} bao</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-item-name">Cát bê tông hạt vàng:</span>
                    <span className="calc-item-val">{concreteSandM3} m³</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-item-name">Đá 1x2 xanh Đồng Nai:</span>
                    <span className="calc-item-val">{concreteStoneM3} m³</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-item-name">Sắt thép xây dựng dự kiến:</span>
                    <span className="calc-item-val">~{concreteSteelKg.toLocaleString('vi-VN')} kg</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
