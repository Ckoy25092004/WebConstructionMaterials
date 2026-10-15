using ConstructionMaterials.Api.Data;
using ConstructionMaterials.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConstructionMaterials.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuoteRequestsController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuoteRequestsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuoteRequest>>> GetQuoteRequests()
    {
        var items = await _context.QuoteRequests
            .OrderByDescending(q => q.CreatedAt)
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<QuoteRequest>> CreateQuoteRequest([FromBody] QuoteRequest quote)
    {
        if (string.IsNullOrWhiteSpace(quote.CustomerName) || string.IsNullOrWhiteSpace(quote.PhoneNumber))
        {
            return BadRequest(new { message = "Vui lòng nhập họ tên và số điện thoại liên hệ" });
        }

        quote.CreatedAt = DateTime.UtcNow;
        quote.Status = "Chờ xử lý";
        _context.QuoteRequests.Add(quote);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Gửi yêu cầu báo giá thành công! Tư vấn viên sẽ liên hệ trong 15 phút.", quote });
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
        var quote = await _context.QuoteRequests.FindAsync(id);
        if (quote == null) return NotFound();

        quote.Status = status;
        await _context.SaveChangesAsync();
        return Ok(quote);
    }
}
