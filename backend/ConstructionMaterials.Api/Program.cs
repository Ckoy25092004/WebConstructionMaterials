using System.Text.Json.Serialization;
using ConstructionMaterials.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add Database Context with SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var conn = builder.Configuration.GetConnectionString("DefaultConnection") 
               ?? "Data Source=construction_materials.db";
    options.UseSqlite(conn);
});

// Configure JSON serialization (avoid cycles)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Native .NET 9 OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// Ensure DB is created and seeded
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors("AllowAll");

app.MapOpenApi();

app.UseAuthorization();

app.MapControllers();

// Health check endpoint
app.MapGet("/", () => Results.Ok(new 
{ 
    Status = "Online", 
    Service = "Hệ thống Quản lý Bán Vật Liệu Xây Dựng (MinhQuanVLXD) API",
    Timestamp = DateTime.UtcNow,
    OpenApiSpec = "/openapi/v1.json"
}));

app.Run();
