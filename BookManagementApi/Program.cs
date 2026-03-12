using BookManagementApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ── CORS ──────────────────────────────────────────────────────────────────────
const string AngularOrigin = "AllowAngularDevServer";

builder.Services.AddCors(options =>
{
    options.AddPolicy(AngularOrigin, policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ── Services ──────────────────────────────────────────────────────────────────
builder.Services.AddSingleton<IBookService, BookService>();
builder.Services.AddControllers();

// ── Build ─────────────────────────────────────────────────────────────────────
var app = builder.Build();

// app.UseHttpsRedirection(); // Commented out for development (HTTP only)
app.UseCors(AngularOrigin);
app.UseAuthorization();
app.MapControllers();

app.Run();


record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
