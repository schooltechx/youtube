import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // อัดผู้ใช้ขึ้นเป็น 100 VUs ใน 10 วินาที
    { duration: '20s', target: 300 }, // ถล่มด้วย 300 VUs พร้อมกัน
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],    // Error ห้ามเกิน 1%
    http_req_duration: ['p(95)<300'],  // 95% ต้องได้รับการตอบกลับใน 300ms ทั้งๆ ที่ DB latency คือ 50ms
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://traefik';

export default function () {
  // ทดสอบจุดเด่น: Async Non-blocking I/O ยิงพร้อมกัน 300 คน
  const ioRes = http.get(`${BASE_URL}/api/io-async?delay=50`);
  check(ioRes, {
    'async I/O status is 200': (r) => r.status === 200,
    'handled asynchronously': (r) => r.json().type === 'Asynchronous Non-blocking I/O',
  });

  // ทดสอบการส่ง JSON Payload
  const payloadRes = http.get(`${BASE_URL}/api/payload`);
  check(payloadRes, {
    'payload status is 200': (r) => r.status === 200,
  });

  sleep(0.1);
}