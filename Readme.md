# Hệ Thống Website Thương Mại Điện Tử Vật Liệu Xây Dựng (Tư Thành Phát)

Dự án website thương mại điện tử chuyên ngành **Vật liệu xây dựng** (Sắt thép, Cát bê tông/xây tô, Đá 1x2, Xi măng, Gạch tuynel) được xây dựng theo mô hình:
- **Backend:** ASP.NET Core Web API (.NET 9) + Entity Framework Core (SQLite / PostgreSQL) + Swagger OpenAPI
- **Frontend:** React 19 + Vite + TypeScript + Clean Vanilla CSS (chuẩn UX/UI công trình hiện đại)

---

## 1. Cấu Trúc Dự Án

```
WebConstructionMaterials/
├── backend/
│   ├── ConstructionMaterials.Api/
│   │   ├── Controllers/       # Products, Categories, PriceSheets, QuoteRequests, Orders
│   │   ├── Data/              # AppDbContext & Realistic Seed Data
│   │   ├── Models/            # Category, Product, PriceSheet, QuoteRequest, Order
│   │   └── Program.cs         # EF Core, CORS, Swagger Configuration
│   └── Dockerfile             # Multi-stage Docker build cho .NET 9
├── frontend/
│   ├── src/
│   │   ├── components/        # TopBar, Header, Hero, PriceSheet, Catalog, Calculator, Modals, AdminPanel
│   │   ├── services/          # API Client & Offline resilient cache
│   │   ├── types/             # TypeScript interfaces
│   │   └── index.css          # Hệ thống Design System cao cấp
│   ├── nginx.conf             # Cấu hình reverse proxy /api sang backend
│   └── Dockerfile             # Docker build Node + Nginx
├── docker-compose.yml         # Triển khai 1-click toàn bộ hệ thống
└── Readme.md
```

---

## 2. Các Tính Năng Nổi Bật Đặc Thù Ngành VLXD

1. **Bảng Báo Giá Thị Trường Hàng Ngày:** Cập nhật giá sắt thép Hòa Phát, Pomina, cát đá, xi măng theo ngày với biến động giá thời gian thực.
2. **Yêu Cầu Báo Giá Nhanh (RFQ):** Khách hàng hoặc nhà thầu điền thông tin công trình, hệ thống lưu trữ và chuyển đến bộ phận kinh doanh xử lý trong 15 phút.
3. **Công Cụ Tính Định Mức Vật Tư Xây Dựng (Exclusive):**
   - Tính tự động số lượng gạch, cát, xi măng khi nhập diện tích tường cần xây (m²).
   - Tính tự động lượng cát, đá, xi măng và sắt thép khi nhập khối lượng bê tông (m³).
4. **Giỏ Hàng & Đặt Hàng Trực Tuyến:** Hỗ trợ đơn vị tính phong phú (`m³`, `tấn`, `bao`, `viên`, `cây`), tính tổng tiền và tạo mã đơn hàng `VLXD-xxxx`.
5. **Admin CMS Portal:** Quản lý yêu cầu báo giá, xem đơn hàng mới, cập nhật bảng giá niêm yết kho bãi.
6. **Bộ Phím Tắt Liên Hệ Nổi (Floating Widgets):** Nút gọi hotline rung lắc 24/7, nút Zalo kỹ thuật và nút yêu cầu báo giá.

---

## 3. Hướng Dẫn Chạy Thử Trên Máy Local

### Bước 1: Khởi động Backend Web API (.NET 9)
```bash
cd backend/ConstructionMaterials.Api
dotnet run
```
* API chạy tại: `http://localhost:5000`
* Swagger UI tài liệu API: `http://localhost:5000/swagger`

### Bước 2: Khởi động Frontend React
Mở terminal thứ hai:
```bash
cd frontend
npm install
npm run dev
```
* Truy cập website tại: `http://localhost:5173`

---

## 4. Cách Deploy Lên Server Cho 1–2 Người Trải Nghiệm Thực Tế

### Cách 1: Chia sẻ tức thì qua Cloudflare Tunnel (Miễn phí 100%, không cần VPS)
Nếu bạn đang chạy project trên máy tính cá nhân và muốn gửi link cho khách hàng/bạn bè trải nghiệm:
1. Tải công cụ `cloudflared` (hoặc `ngrok`).
2. Chạy lệnh:
   ```bash
   cloudflared tunnel --url http://localhost:5173
   ```
3. Cloudflare sẽ cấp ngay cho bạn một đường link HTTPS công khai (ví dụ: `https://xxx.trycloudflare.com`) để người dùng bên ngoài truy cập vào trải nghiệm website ngay lập tức!

### Cách 2: Triển khai lên VPS Linux với Docker Compose (Chạy độc lập 24/7)
1. Thuê 1 VPS Linux giá rẻ (chỉ khoảng 60k - 100k/tháng).
2. Clone repository này về VPS.
3. Chạy 1 lệnh duy nhất:
   ```bash
   docker compose up -d --build
   ```
4. Hệ thống sẽ tự động build cả Backend (.NET 9) và Frontend (Nginx), cấu hình reverse proxy `/api` và mở cổng `80`. Người dùng chỉ cần truy cập vào địa chỉ IP của VPS!
