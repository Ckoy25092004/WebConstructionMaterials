namespace ConstructionMaterials.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    
    public string Description { get; set; } = string.Empty;
    public string Unit { get; set; } = "m3"; // m3, bao, cây, kg, tấn, viên, thùng
    public decimal Price { get; set; }
    public decimal? OldPrice { get; set; }
    public string? Brand { get; set; }
    public string? ImageUrl { get; set; }
    public string? Specifications { get; set; }
    public bool IsFeatured { get; set; } = false;
    public bool IsQuoteRequired { get; set; } = false; // Báo giá theo khối lượng/thời điểm
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
