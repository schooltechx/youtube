using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hello");
app.MapGet("/auth", [Authorize] (HttpContext context) =>
{
    var id = context.User.FindFirst("id")?.Value; 
    var n = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var gn = context.User.FindFirst("fname")?.Value;
    var sn = context.User.FindFirst("lname")?.Value;
    return Results.Ok($"Authenticated: {id}:{n}:{gn}:{sn}") ;
});
app.MapGet("/auth1", (ClaimsPrincipal user) => $"Hello {user.Identity?.Name}").RequireAuthorization();
app.MapGet("/auth2", () => "Check Claim pass").RequireAuthorization(p => p.RequireClaim("lname", "Bholsithi"));
app.MapGet("/admin1", [Authorize(Roles = "admin")] () => "Administrator");
app.MapGet("/dev1", [Authorize(Roles = "dev")] () => "Developer");
app.MapGet("/dev2", [Authorize(Roles = "admin,dev")] () => "Administrator or Developer");
app.Run();
