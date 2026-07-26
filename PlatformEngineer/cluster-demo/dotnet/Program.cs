using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

string instanceId = Environment.GetEnvironmentVariable("HOSTNAME") ?? Environment.MachineName;

// 1. Fast Endpoint
app.MapGet("/dotnet/api/fast", () => Results.Ok(new
{
    status = "ok",
    message = "Fast response",
    server = new { hostname = instanceId, pid = Environment.ProcessId }
}));

// 2. CPU Bound Work
app.MapGet("/dotnet/api/work", (int? iterations) =>
{
    int count = iterations ?? 5000000;
    var sw = Stopwatch.StartNew();
    double result = 0;
    for (int i = 0; i < count; i++) { result += Math.Sqrt(i) * Math.Sin(i); }
    sw.Stop();

    return Results.Ok(new
    {
        status = "ok",
        message = "Work completed",
        durationMs = sw.ElapsedMilliseconds,
        iterations = count,
        server = new { hostname = instanceId, pid = Environment.ProcessId }
    });
});

// 3. [NEW] Async Non-blocking I/O (จำลอง DB Call)
app.MapGet("/dotnet/api/io-async", async (int? delay) =>
{
    int delayMs = delay ?? 50;
    
    // Task.Delay คือ Non-blocking I/O ไม่กิน CPU Thread
    await Task.Delay(delayMs);

    return Results.Ok(new
    {
        status = "ok",
        type = "Asynchronous Non-blocking I/O",
        simulatedLatencyMs = delayMs,
        server = new
        {
            hostname = instanceId,
            pid = Environment.ProcessId,
            memoryUsageMB = Process.GetCurrentProcess().WorkingSet64 / 1024 / 1024
        }
    });
});

// 4. [NEW] Payload Response
app.MapGet("/dotnet/api/payload", () =>
{
    var items = Enumerable.Range(1, 100).Select(i => new { id = i, name = $"Item {i}", active = true });
    return Results.Ok(new
    {
        status = "ok",
        total = 100,
        data = items,
        server = new { hostname = instanceId, pid = Environment.ProcessId }
    });
});

app.MapGet("/dotnet/health", () => Results.Text("OK"));

app.Run("http://0.0.0.0:3000");