using ConstructionMaterials.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ConstructionMaterials.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<PriceSheet> PriceSheets => Set<PriceSheet>();
    public DbSet<QuoteRequest> QuoteRequests => Set<QuoteRequest>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed Categories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Cát xây dựng", Slug = "cat-xay-dung", Description = "Cát vàng sông Lô rửa sạch, cát xây tô sông Hồng", Icon = "Mountain", DisplayOrder = 1 },
            new Category { Id = 2, Name = "Đá xây dựng", Slug = "da-xay-dung", Description = "Đá 1x2 xanh Phủ Lý, đá 4x6 kè móng", Icon = "Layers", DisplayOrder = 2 },
            new Category { Id = 3, Name = "Sắt thép xây dựng", Slug = "sat-thep-xay-dung", Description = "Thép Hòa Phát, Việt Ý, Việt Nhật", Icon = "Hammer", DisplayOrder = 3 },
            new Category { Id = 4, Name = "Gạch xây dựng", Slug = "gach-xay-dung", Description = "Gạch tuynel 4 lỗ, gạch đinh đặc, gạch block", Icon = "Box", DisplayOrder = 4 },
            new Category { Id = 5, Name = "Xi măng & Bột trét", Slug = "xi-mang-bot-tret", Description = "Xi măng Hoàng Thạch, Bút Sơn, Xuân Thành", Icon = "ShieldCheck", DisplayOrder = 5 },
            new Category { Id = 6, Name = "Gạch ngói & Gạch lát", Slug = "gach-ngoi-gach-lat", Description = "Ngói Hạ Long Giếng Đáy, Gốm Đất Việt", Icon = "Grid", DisplayOrder = 6 }
        );

        // Seed Products
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                CategoryId = 1,
                Name = "Cát bê tông vàng Sông Lô (Hạt to rửa sạch)",
                Slug = "cat-be-tong-vang-song-lo",
                Sku = "CAT-SL-01",
                Description = "Cát vàng sông Lô tuyển chọn rửa sạch bùn sét hữu cơ, hạt to 2.5-3.3mm, chuyên đổ dầm sàn bê tông mác cao.",
                Unit = "m³",
                Price = 360000,
                OldPrice = 390000,
                Brand = "MinhQuanVLXD Phân Phối",
                ImageUrl = "/images/cat_vang_song_lo.jpg",
                Specifications = "Modun: 2.6 - 3.2; Sạch bùn rác < 0.8%; Nguồn khai thác Sông Lô - Phú Thọ",
                IsFeatured = true,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 2,
                CategoryId = 1,
                Name = "Cát xây tô Sông Hồng loại 1 sàng mịn",
                Slug = "cat-xay-to-song-hong",
                Sku = "CAT-SH-02",
                Description = "Cát xây tô sàng lọc kĩ càng, hạt đều mịn, dẻo quánh bám dính tường tốt, không nứt nẻ sau khi trát.",
                Unit = "m³",
                Price = 270000,
                OldPrice = 300000,
                Brand = "MinhQuanVLXD Phân Phối",
                ImageUrl = "/images/cat_vang_song_lo.jpg",
                Specifications = "Modun: 1.2 - 1.6; Đạt chuẩn xây trát TCVN 1770-1986",
                IsFeatured = true,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 3,
                CategoryId = 2,
                Name = "Đá 1x2 xanh Phủ Lý (Đá trộn bê tông mác 300+)",
                Slug = "da-1x2-xanh-phu-ly",
                Sku = "DA-1X2-PL",
                Description = "Đá dăm xanh khai thác tại mỏ đá Phủ Lý - Hà Nam, cường độ chịu nén cực lớn, độ bám dính xi măng tối ưu.",
                Unit = "m³",
                Price = 380000,
                OldPrice = 410000,
                Brand = "Mỏ đá Phủ Lý - Hà Nam",
                ImageUrl = "/images/da_soi_1x2_xanh.jpg",
                Specifications = "Kích cỡ hạt: 10 - 25mm; Độ nén dập mác 1200 kg/cm²",
                IsFeatured = true,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 4,
                CategoryId = 2,
                Name = "Đá 4x6 xanh kè móng rải nền",
                Slug = "da-4x6-xanh-ke-mong",
                Sku = "DA-4X6-PL",
                Description = "Đá hộc 4x6 làm lớp lót móng công trình, móng nhà xưởng chịu tải trọng nặng chống lún.",
                Unit = "m³",
                Price = 330000,
                OldPrice = 360000,
                Brand = "Hà Nam",
                ImageUrl = "/images/da_soi_1x2_xanh.jpg",
                Specifications = "Cỡ hạt: 40 - 60mm; Chịu lực móng nền công trình",
                IsFeatured = false,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 5,
                CategoryId = 3,
                Name = "Thép cuộn D6, D8 Hòa Phát (CB240-T)",
                Slug = "thep-cuon-hoa-phat-d6-d8",
                Sku = "THEP-HP-CUON",
                Description = "Thép cuộn tròn trơn chính hãng tập đoàn Hòa Phát, dẻo dai uốn cong linh hoạt làm đai đầm móng.",
                Unit = "kg",
                Price = 16800,
                OldPrice = 17500,
                Brand = "Hòa Phát",
                ImageUrl = "/images/thep_rebar_hoaphat.jpg",
                Specifications = "Mác: CB240-T; Đầy đủ CO/CQ nhà máy Hòa Phát Hưng Yên",
                IsFeatured = true,
                IsQuoteRequired = true
            },
            new Product
            {
                Id = 6,
                CategoryId = 3,
                Name = "Thép cây vằn Hòa Phát D10, D12, D16, D20 (CB300/CB400)",
                Slug = "thep-cay-van-hoa-phat",
                Sku = "THEP-HP-CAY",
                Description = "Thép cây gân vằn Hòa Phát tiêu chuẩn 11.7m/cây, cốt chịu lực dầm trụ vững chắc vĩnh cửu.",
                Unit = "cây",
                Price = 138000,
                OldPrice = 148000,
                Brand = "Hòa Phát",
                ImageUrl = "/images/thep_rebar_hoaphat.jpg",
                Specifications = "Chiều dài 11.7m; Mác CB300V / CB400V; Bó nhà máy",
                IsFeatured = true,
                IsQuoteRequired = true
            },
            new Product
            {
                Id = 7,
                CategoryId = 4,
                Name = "Gạch tuynel 4 lỗ đỏ sẫm (8x8x18cm)",
                Slug = "gach-tuynel-4-lo",
                Sku = "GACH-4LO-TK",
                Description = "Gạch đất sét nung Tuynel đỏ chín đều không nứt mẻ, vuông vức, cách âm cách nhiệt tốt cho tường nhà.",
                Unit = "viên",
                Price = 1150,
                OldPrice = 1300,
                Brand = "Tuynel Thạch Thất",
                ImageUrl = "/images/gach_tuynel_4lo.jpg",
                Specifications = "80 x 80 x 180 mm; Độ hút nước < 9%; Chịu nén cao",
                IsFeatured = true,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 8,
                CategoryId = 4,
                Name = "Gạch đinh đặc không lỗ chịu nén",
                Slug = "gach-dinh-dac-chieu-luc",
                Sku = "GACH-DINH-01",
                Description = "Gạch đinh đặc chống thấm, chuyên dùng xây chân móng, bể phốt, hố ga chịu lực.",
                Unit = "viên",
                Price = 1350,
                OldPrice = 1500,
                Brand = "Tuynel",
                ImageUrl = "/images/gach_tuynel_4lo.jpg",
                Specifications = "40 x 80 x 180 mm; Cực kỳ đặc chắc chống ngấm nước",
                IsFeatured = false,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 9,
                CategoryId = 5,
                Name = "Xi măng Hoàng Thạch Vicem PCB40 (50kg)",
                Slug = "xi-mang-hoang-thach-pcb40",
                Sku = "XM-HOANGTHACH-50KG",
                Description = "Xi măng số 1 Miền Bắc, cường độ nén cao sớm, vữa dẻo mịn bám dính tường siêu chắc.",
                Unit = "bao",
                Price = 94000,
                OldPrice = 100000,
                Brand = "Vicem Hoàng Thạch",
                ImageUrl = "/images/xi_mang_pallet.jpg",
                Specifications = "50kg ± 0.5kg; Tiêu chuẩn TCVN 6260:2009 PCB40",
                IsFeatured = true,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 10,
                CategoryId = 5,
                Name = "Xi măng Bút Sơn Đa Dụng PCB40 (50kg)",
                Slug = "xi-mang-but-son-da-dung",
                Sku = "XM-BUTSON-50KG",
                Description = "Xi măng Bút Sơn nổi tiếng Miền Bắc, bền chắc vượt trội chống ăn mòn và nứt chân chim.",
                Unit = "bao",
                Price = 92000,
                OldPrice = 98000,
                Brand = "Xi Măng Bút Sơn",
                ImageUrl = "/images/xi_mang_pallet.jpg",
                Specifications = "Quy cách 50kg; Mác PCB40 chịu lực cao",
                IsFeatured = true,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 11,
                CategoryId = 6,
                Name = "Gạch ngói lợp 22 viên Hạ Long Giếng Đáy",
                Slug = "gach-ngoi-22-vien-ha-long",
                Sku = "NGOI-HALONG-22",
                Description = "Ngói đất sét nung đỏ rực tự nhiên Quảng Ninh, phủ nano chống bám rêu mốc, chống nóng mái nhà.",
                Unit = "viên",
                Price = 15000,
                OldPrice = 17000,
                Brand = "Viglacera Hạ Long",
                ImageUrl = "/images/gach_tuynel_4lo.jpg",
                Specifications = "22 viên/m²; Trọng lượng 2.0kg/viên",
                IsFeatured = true,
                IsQuoteRequired = false
            },
            new Product
            {
                Id = 12,
                CategoryId = 6,
                Name = "Gạch gốm đỏ lát sân vườn chống trượt",
                Slug = "gach-gom-do-lat-san",
                Sku = "GACH-GOM-DO",
                Description = "Gạch gốm đỏ cổ điển Đất Việt, thoáng mát bàn chân, không trơn trượt khi trời mưa nồm ẩm.",
                Unit = "viên",
                Price = 16500,
                OldPrice = 19000,
                Brand = "Gốm Đất Việt",
                ImageUrl = "/images/gach_tuynel_4lo.jpg",
                Specifications = "Kích thước 300 x 300 mm; Chống trơn trượt",
                IsFeatured = false,
                IsQuoteRequired = false
            }
        );

        // Seed Daily PriceSheet
        modelBuilder.Entity<PriceSheet>().HasData(
            new PriceSheet { Id = 1, CategoryName = "Sắt thép xây dựng", MaterialName = "Thép Hòa Phát cuộn D6 - D8", Specification = "CB240-T, TCVN", Unit = "kg", Price = 16800, Note = "Giá theo lô nhà máy Hòa Phát", UpdatedDate = DateTime.UtcNow },
            new PriceSheet { Id = 2, CategoryName = "Sắt thép xây dựng", MaterialName = "Thép Hòa Phát cây vằn D10", Specification = "CB300V, cây 11.7m", Unit = "cây", Price = 138000, Note = "Giao tận chân công trình Hà Nội", UpdatedDate = DateTime.UtcNow },
            new PriceSheet { Id = 3, CategoryName = "Sắt thép xây dựng", MaterialName = "Thép Việt Ý cây vằn D10", Specification = "CB300V, cây 11.7m", Unit = "cây", Price = 136000, Note = "Chính hãng nhà máy", UpdatedDate = DateTime.UtcNow },
            new PriceSheet { Id = 4, CategoryName = "Sắt thép xây dựng", MaterialName = "Thép Hòa Phát cây vằn D16", Specification = "CB400V, cây 11.7m", Unit = "cây", Price = 358000, Note = "Hàng sẵn kho Đa Phúc, Hà Nội", UpdatedDate = DateTime.UtcNow },
            new PriceSheet { Id = 5, CategoryName = "Cát xây dựng", MaterialName = "Cát bê tông vàng Sông Lô (rửa sạch)", Specification = "Modun > 2.6", Unit = "m³", Price = 360000, Note = "Đong theo m³ ben xe", UpdatedDate = DateTime.UtcNow },
            new PriceSheet { Id = 6, CategoryName = "Cát xây dựng", MaterialName = "Cát xây tô Sông Hồng sàng mịn", Specification = "Hạt trung mịn sạch phù sa", Unit = "m³", Price = 270000, Note = "Xe 3m³, 5m³, 15m³ vào phố", UpdatedDate = DateTime.UtcNow },
            new PriceSheet { Id = 7, CategoryName = "Đá xây dựng", MaterialName = "Đá 1x2 xanh Phủ Lý - Hà Nam", Specification = "Đá xanh tuyển chọn mác cao", Unit = "m³", Price = 380000, Note = "Giao nội thành Hà Nội trong 2h", UpdatedDate = DateTime.UtcNow },
            new PriceSheet { Id = 8, CategoryName = "Xi măng", MaterialName = "Xi măng Hoàng Thạch PCB40", Specification = "Bao 50kg chính hãng Vicem", Unit = "bao", Price = 94000, Note = "Giao từ 30 bao miễn phí ship", UpdatedDate = DateTime.UtcNow },
            new PriceSheet { Id = 9, CategoryName = "Gạch xây", MaterialName = "Gạch Tuynel 4 lỗ đỏ sẫm", Specification = "8x8x18 cm", Unit = "viên", Price = 1150, Note = "Bốc xếp hạ hàng tận công trình", UpdatedDate = DateTime.UtcNow }
        );
    }
}
