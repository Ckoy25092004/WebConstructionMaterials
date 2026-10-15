using ConstructionMaterials.Api.Data;
using ConstructionMaterials.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConstructionMaterials.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PriceSheetsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PriceSheetsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PriceSheet>>> GetPriceSheets()
    {
        var items = await _context.PriceSheets
            .OrderBy(p => p.CategoryName)
            .ThenBy(p => p.Id)
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<PriceSheet>> Create([FromBody] PriceSheet priceSheet)
    {
        priceSheet.UpdatedDate = DateTime.UtcNow;
        _context.PriceSheets.Add(priceSheet);
        await _context.SaveChangesAsync();
        return Ok(priceSheet);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] PriceSheet priceSheet)
    {
        var existing = await _context.PriceSheets.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Price = priceSheet.Price;
        existing.Specification = priceSheet.Specification;
        existing.Unit = priceSheet.Unit;
        existing.Note = priceSheet.Note;
        existing.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(existing);
    }
}
