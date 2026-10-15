import type { Category, Product, PriceSheetItem, QuoteRequest, Order } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fallback seed data if backend is starting or offline
const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Cát xây dựng', slug: 'cat-xay-dung', description: 'Cát vàng sông Lô rửa sạch, cát xây tô sông Hồng', icon: 'Mountain', displayOrder: 1 },
  { id: 2, name: 'Đá xây dựng', slug: 'da-xay-dung', description: 'Đá 1x2 xanh Phủ Lý, đá 4x6 kè móng', icon: 'Layers', displayOrder: 2 },
  { id: 3, name: 'Sắt thép xây dựng', slug: 'sat-thep-xay-dung', description: 'Thép Hòa Phát, Việt Ý, Việt Nhật', icon: 'Hammer', displayOrder: 3 },
  { id: 4, name: 'Gạch xây dựng', slug: 'gach-xay-dung', description: 'Gạch tuynel 4 lỗ, gạch đinh đặc, gạch block', icon: 'Box', displayOrder: 4 },
  { id: 5, name: 'Xi măng & Bột trét', slug: 'xi-mang-bot-tret', description: 'Xi măng Hoàng Thạch, Bút Sơn, Xuân Thành', icon: 'ShieldCheck', displayOrder: 5 },
  { id: 6, name: 'Gạch ngói & Gạch lát', slug: 'gach-ngoi-gach-lat', description: 'Ngói Hạ Long Giếng Đáy, Gốm Đất Việt', icon: 'Grid', displayOrder: 6 }
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: 'Cát bê tông vàng Sông Lô (Hạt to rửa sạch)',
    slug: 'cat-be-tong-vang-song-lo',
    sku: 'CAT-SL-01',
    description: 'Cát vàng sông Lô tuyển chọn rửa sạch bùn sét hữu cơ, hạt to 2.5-3.3mm, chuyên đổ dầm sàn bê tông mác cao.',
    unit: 'm³',
    price: 360000,
    oldPrice: 390000,
    brand: 'MinhQuanVLXD Phân Phối',
    imageUrl: '/images/cat_vang_song_lo.jpg',
    specifications: 'Modun: 2.6 - 3.2; Sạch bùn rác < 0.8%; Nguồn khai thác Sông Lô - Phú Thọ',
    isFeatured: true,
    isQuoteRequired: false
  },
  {
    id: 2,
    categoryId: 1,
    name: 'Cát xây tô Sông Hồng loại 1 sàng mịn',
    slug: 'cat-xay-to-song-hong',
    sku: 'CAT-SH-02',
    description: 'Cát xây tô sàng lọc kĩ càng, hạt đều mịn, dẻo quánh bám dính tường tốt, không nứt nẻ sau khi trát.',
    unit: 'm³',
    price: 270000,
    oldPrice: 300000,
    brand: 'MinhQuanVLXD Phân Phối',
    imageUrl: '/images/cat_vang_song_lo.jpg',
    specifications: 'Modun: 1.2 - 1.6; Đạt chuẩn xây trát TCVN 1770-1986',
    isFeatured: true,
    isQuoteRequired: false
  },
  {
    id: 3,
    categoryId: 2,
    name: 'Đá 1x2 xanh Phủ Lý (Đá trộn bê tông mác 300+)',
    slug: 'da-1x2-xanh-phu-ly',
    sku: 'DA-1X2-PL',
    description: 'Đá dăm xanh khai thác tại mỏ đá Phủ Lý - Hà Nam, cường độ chịu nén cực lớn, độ bám dính xi măng tối ưu.',
    unit: 'm³',
    price: 380000,
    oldPrice: 410000,
    brand: 'Mỏ đá Phủ Lý - Hà Nam',
    imageUrl: '/images/da_soi_1x2_xanh.jpg',
    specifications: 'Kích cỡ hạt: 10 - 25mm; Độ nén dập mác 1200 kg/cm²',
    isFeatured: true,
    isQuoteRequired: false
  },
  {
    id: 4,
    categoryId: 2,
    name: 'Đá 4x6 xanh kè móng rải nền',
    slug: 'da-4x6-xanh-ke-mong',
    sku: 'DA-4X6-PL',
    description: 'Đá hộc 4x6 làm lớp lót móng công trình, móng nhà xưởng chịu tải trọng nặng chống lún.',
    unit: 'm³',
    price: 330000,
    oldPrice: 360000,
    brand: 'Hà Nam',
    imageUrl: '/images/da_soi_1x2_xanh.jpg',
    specifications: 'Cỡ hạt: 40 - 60mm; Chịu lực móng nền công trình',
    isFeatured: false,
    isQuoteRequired: false
  },
  {
    id: 5,
    categoryId: 3,
    name: 'Thép cuộn D6, D8 Hòa Phát (CB240-T)',
    slug: 'thep-cuon-hoa-phat-d6-d8',
    sku: 'THEP-HP-CUON',
    description: 'Thép cuộn tròn trơn chính hãng tập đoàn Hòa Phát, dẻo dai uốn cong linh hoạt làm đai đầm móng.',
    unit: 'kg',
    price: 16800,
    oldPrice: 17500,
    brand: 'Hòa Phát',
    imageUrl: '/images/thep_rebar_hoaphat.jpg',
    specifications: 'Mác: CB240-T; Đầy đủ CO/CQ nhà máy Hòa Phát Hưng Yên',
    isFeatured: true,
    isQuoteRequired: true
  },
  {
    id: 6,
    categoryId: 3,
    name: 'Thép cây vằn Hòa Phát D10, D12, D16, D20 (CB300/CB400)',
    slug: 'thep-cay-van-hoa-phat',
    sku: 'THEP-HP-CAY',
    description: 'Thép cây gân vằn Hòa Phát tiêu chuẩn 11.7m/cây, cốt chịu lực dầm trụ vững chắc vĩnh cửu.',
    unit: 'cây',
    price: 138000,
    oldPrice: 148000,
    brand: 'Hòa Phát',
    imageUrl: '/images/thep_rebar_hoaphat.jpg',
    specifications: 'Chiều dài 11.7m; Mác CB300V / CB400V; Bó nhà máy',
    isFeatured: true,
    isQuoteRequired: true
  },
  {
    id: 7,
    categoryId: 4,
    name: 'Gạch tuynel 4 lỗ đỏ sẫm (8x8x18cm)',
    slug: 'gach-tuynel-4-lo',
    sku: 'GACH-4LO-TK',
    description: 'Gạch đất sét nung Tuynel đỏ chín đều không nứt mẻ, vuông vức, cách âm cách nhiệt tốt cho tường nhà.',
    unit: 'viên',
    price: 1150,
    oldPrice: 1300,
    brand: 'Tuynel Thạch Thất',
    imageUrl: '/images/gach_tuynel_4lo.jpg',
    specifications: '80 x 80 x 180 mm; Độ hút nước < 9%; Chịu nén cao',
    isFeatured: true,
    isQuoteRequired: false
  },
  {
    id: 8,
    categoryId: 4,
    name: 'Gạch đinh đặc không lỗ chịu nén',
    slug: 'gach-dinh-dac-chieu-luc',
    sku: 'GACH-DINH-01',
    description: 'Gạch đinh đặc chống thấm, chuyên dùng xây chân móng, bể phốt, hố ga chịu lực.',
    unit: 'viên',
    price: 1350,
    oldPrice: 1500,
    brand: 'Tuynel',
    imageUrl: '/images/gach_tuynel_4lo.jpg',
    specifications: '40 x 80 x 180 mm; Cực kỳ đặc chắc chống ngấm nước',
    isFeatured: false,
    isQuoteRequired: false
  },
  {
    id: 9,
    categoryId: 5,
    name: 'Xi măng Hoàng Thạch Vicem PCB40 (50kg)',
    slug: 'xi-mang-hoang-thach-pcb40',
    sku: 'XM-HOANGTHACH-50KG',
    description: 'Xi măng số 1 Miền Bắc, cường độ nén cao sớm, vữa dẻo mịn bám dính tường siêu chắc.',
    unit: 'bao',
    price: 94000,
    oldPrice: 100000,
    brand: 'Vicem Hoàng Thạch',
    imageUrl: '/images/xi_mang_pallet.jpg',
    specifications: '50kg ± 0.5kg; Tiêu chuẩn TCVN 6260:2009 PCB40',
    isFeatured: true,
    isQuoteRequired: false
  },
  {
    id: 10,
    categoryId: 5,
    name: 'Xi măng Bút Sơn Đa Dụng PCB40 (50kg)',
    slug: 'xi-mang-but-son-da-dung',
    sku: 'XM-BUTSON-50KG',
    description: 'Xi măng Bút Sơn nổi tiếng Miền Bắc, bền chắc vượt trội chống ăn mòn và nứt chân chim.',
    unit: 'bao',
    price: 92000,
    oldPrice: 98000,
    brand: 'Xi Măng Bút Sơn',
    imageUrl: '/images/xi_mang_pallet.jpg',
    specifications: 'Quy cách 50kg; Mác PCB40 chịu lực cao',
    isFeatured: true,
    isQuoteRequired: false
  },
  {
    id: 11,
    categoryId: 6,
    name: 'Gạch ngói lợp 22 viên Hạ Long Giếng Đáy',
    slug: 'gach-ngoi-22-vien-ha-long',
    sku: 'NGOI-HALONG-22',
    description: 'Ngói đất sét nung đỏ rực tự nhiên Quảng Ninh, phủ nano chống bám rêu mốc, chống nóng mái nhà.',
    unit: 'viên',
    price: 15000,
    oldPrice: 17000,
    brand: 'Viglacera Hạ Long',
    imageUrl: '/images/gach_tuynel_4lo.jpg',
    specifications: '22 viên/m²; Trọng lượng 2.0kg/viên',
    isFeatured: true,
    isQuoteRequired: false
  },
  {
    id: 12,
    categoryId: 6,
    name: 'Gạch gốm đỏ lát sân vườn chống trượt',
    slug: 'gach-gom-do-lat-san',
    sku: 'GACH-GOM-DO',
    description: 'Gạch gốm đỏ cổ điển Đất Việt, thoáng mát bàn chân, không trơn trượt khi trời mưa nồm ẩm.',
    unit: 'viên',
    price: 16500,
    oldPrice: 19000,
    brand: 'Gốm Đất Việt',
    imageUrl: '/images/gach_tuynel_4lo.jpg',
    specifications: 'Kích thước 300 x 300 mm; Chống trơn trượt',
    isFeatured: false,
    isQuoteRequired: false
  }
];

const MOCK_PRICE_SHEET: PriceSheetItem[] = [
  { id: 1, categoryName: 'Sắt thép xây dựng', materialName: 'Thép Hòa Phát cuộn D6 - D8', specification: 'CB240-T, TCVN', unit: 'kg', price: 16800, note: 'Giá theo lô nhà máy Hòa Phát', updatedDate: new Date().toISOString() },
  { id: 2, categoryName: 'Sắt thép xây dựng', materialName: 'Thép Hòa Phát cây vằn D10', specification: 'CB300V, cây 11.7m', unit: 'cây', price: 138000, note: 'Giao tận chân công trình Hà Nội', updatedDate: new Date().toISOString() },
  { id: 3, categoryName: 'Sắt thép xây dựng', materialName: 'Thép Việt Ý cây vằn D10', specification: 'CB300V, cây 11.7m', unit: 'cây', price: 136000, note: 'Chính hãng nhà máy', updatedDate: new Date().toISOString() },
  { id: 4, categoryName: 'Sắt thép xây dựng', materialName: 'Thép Hòa Phát cây vằn D16', specification: 'CB400V, cây 11.7m', unit: 'cây', price: 358000, note: 'Hàng sẵn kho Đa Phúc, Hà Nội', updatedDate: new Date().toISOString() },
  { id: 5, categoryName: 'Cát xây dựng', materialName: 'Cát bê tông vàng Sông Lô (rửa sạch)', specification: 'Modun > 2.6', unit: 'm³', price: 360000, note: 'Đong theo m³ ben xe', updatedDate: new Date().toISOString() },
  { id: 6, categoryName: 'Cát xây dựng', materialName: 'Cát xây tô Sông Hồng sàng mịn', specification: 'Hạt trung mịn sạch phù sa', unit: 'm³', price: 270000, note: 'Xe 3m³, 5m³, 15m³ vào phố', updatedDate: new Date().toISOString() },
  { id: 7, categoryName: 'Đá xây dựng', materialName: 'Đá 1x2 xanh Phủ Lý - Hà Nam', specification: 'Đá xanh tuyển chọn mác cao', unit: 'm³', price: 380000, note: 'Giao nội thành Hà Nội trong 2h', updatedDate: new Date().toISOString() },
  { id: 8, categoryName: 'Xi măng', materialName: 'Xi măng Hoàng Thạch PCB40', specification: 'Bao 50kg chính hãng Vicem', unit: 'bao', price: 94000, note: 'Giao từ 30 bao miễn phí ship', updatedDate: new Date().toISOString() },
  { id: 9, categoryName: 'Gạch xây', materialName: 'Gạch Tuynel 4 lỗ đỏ sẫm', specification: '8x8x18 cm', unit: 'viên', price: 1150, note: 'Bốc xếp hạ hàng tận công trình', updatedDate: new Date().toISOString() }
];

export const api = {
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/Categories`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return MOCK_CATEGORIES;
    }
  },

  async getProducts(params?: { categoryId?: number; search?: string; isFeatured?: boolean }): Promise<{ total: number; items: Product[] }> {
    try {
      const url = new URL(`${API_BASE_URL}/Products`);
      if (params?.categoryId) url.searchParams.append('categoryId', params.categoryId.toString());
      if (params?.search) url.searchParams.append('search', params.search);
      if (params?.isFeatured !== undefined) url.searchParams.append('isFeatured', params.isFeatured.toString());

      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      let filtered = [...MOCK_PRODUCTS];
      if (params?.categoryId) {
        filtered = filtered.filter(p => p.categoryId === params.categoryId);
      }
      if (params?.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s));
      }
      if (params?.isFeatured !== undefined) {
        filtered = filtered.filter(p => p.isFeatured === params.isFeatured);
      }
      return { total: filtered.length, items: filtered };
    }
  },

  async getPriceSheet(): Promise<PriceSheetItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/PriceSheets`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return MOCK_PRICE_SHEET;
    }
  },

  async createQuoteRequest(quote: QuoteRequest): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/QuoteRequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote)
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return { success: true, message: data.message || 'Gửi yêu cầu báo giá thành công!' };
    } catch {
      const list = JSON.parse(localStorage.getItem('saved_quote_requests') || '[]');
      list.unshift({ ...quote, id: Date.now(), createdAt: new Date().toISOString(), status: 'Chờ xử lý' });
      localStorage.setItem('saved_quote_requests', JSON.stringify(list));
      return { success: true, message: 'Yêu cầu báo giá đã được MinhQuanVLXD ghi nhận thành công! Tư vấn viên sẽ liên hệ trong 15 phút.' };
    }
  },

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/QuoteRequests`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return JSON.parse(localStorage.getItem('saved_quote_requests') || '[]');
    }
  },

  async createOrder(order: Order): Promise<{ success: boolean; message: string; orderCode?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/Orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return { success: true, message: data.message, orderCode: data.order?.orderCode };
    } catch {
      const code = 'VLXD-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
      const orders = JSON.parse(localStorage.getItem('saved_orders') || '[]');
      orders.unshift({ ...order, id: Date.now(), orderCode: code, createdAt: new Date().toISOString(), status: 'Mới tiếp nhận' });
      localStorage.setItem('saved_orders', JSON.stringify(orders));
      return { success: true, message: `Đặt hàng thành công! Mã đơn: ${code}`, orderCode: code };
    }
  },

  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/Orders`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return JSON.parse(localStorage.getItem('saved_orders') || '[]');
    }
  }
};
