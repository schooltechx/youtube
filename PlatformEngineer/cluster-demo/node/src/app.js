const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;
const INSTANCE_ID = process.env.HOSTNAME || os.hostname();
app.use(express.json());
// Lightweight / Fast Endpoint
app.get('/node/api/fast', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Fast response',
    server: {
      hostname: INSTANCE_ID,
      pid: process.pid,
      uptime: process.uptime()
    },
    timestamp: new Date().toISOString()
  });
});

// Heavy CPU-bound Endpoint (Simulates CPU Intensive Task)
app.get('/node/api/work', (req, res) => {
  const iterations = parseInt(req.query.iterations || '5000000', 10);
  const start = Date.now();
  
  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) * Math.sin(i);
  }

  const duration = Date.now() - start;

  res.json({
    status: 'ok',
    message: 'Work completed',
    durationMs: duration,
    iterations,
    server: {
      hostname: INSTANCE_ID,
      pid: process.pid
    }
  });
});

// ชูจุดเด่น Asynchronous Non-blocking I/O ---
// Async I/O Simulation (จำลองการดึงข้อมูลจาก DB / Cache)
app.get('/node/api/io-async', async (req, res) => {
  const delay = parseInt(req.query.delay || '50', 10); // จำลอง latency ของ DB 50ms
  // ใช้ setTimeout แบบ Non-blocking ( Event loop นั่งรอได้โดยไม่กิน CPU )
  await new Promise((resolve) => setTimeout(resolve, delay));
  res.json({
    status: 'ok',
    type: 'Asynchronous Non-blocking I/O',
    simulatedLatencyMs: delay,
    server: {
      hostname: INSTANCE_ID,
      pid: process.pid,
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024 // MB
    }
  });
});

//High Concurrent Json Stream/Payload
app.get('/node/api/payload', (req, res) => {
  // สร้าง JSON Object ขนาดเล็กส่งกลับทันที
  const items = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    active: true
  }));

  res.json({
    status: 'ok',
    total: items.length,
    data: items,
    server: { hostname: INSTANCE_ID, pid: process.pid }
  });
});

// Health check endpoint for Traefik / Docker
app.get('/node/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`[Worker ${process.pid}] Express app running at http://localhost:${PORT}`);
});
