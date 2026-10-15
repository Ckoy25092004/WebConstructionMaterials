namespace ConstructionMaterials.Api.Models;

public class PriceSheet
{
    public int Id { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string MaterialName { get; set; } = string.Empty;
    public string Specification { get; set; } = string.Empty;
    public string Unit { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Note { get; set; } = "Giá đã bao gồm VAT và vận chuyển nội thành";
    public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
}
