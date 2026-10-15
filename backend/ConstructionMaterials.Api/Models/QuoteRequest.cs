namespace ConstructionMaterials.Api.Models;

public class QuoteRequest
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string ProjectAddress { get; set; } = string.Empty;
    public string? RequestedMaterials { get; set; }
    public string? Notes { get; set; }
    public string Status { get; set; } = "Chờ xử lý"; // Chờ xử lý, Đã báo giá, Đã chốt đơn, Hủy
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
