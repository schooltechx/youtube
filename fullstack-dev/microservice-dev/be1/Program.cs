var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseHttpsRedirection();
app.MapGet("/", () => "Hello .NET!");
app.MapGet("/api/be1-1", () => "Hello Backend 1-1!");
app.MapGet("/api/be1-2", () => "Hello Backend 1-2!");
app.Run();
