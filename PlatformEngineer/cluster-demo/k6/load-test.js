import http from 'k6/http';
import { check, sleep } from 'k6';

// Test Configuration / Scenarios
export const options = {
  stages: [
    { duration: '10s', target: 20 },  // Ramp-up to 20 users over 10s
    { duration: '30s', target: 50 },  // Stay at 50 users for 30s
    { duration: '10s', target: 0 },   // Ramp-down to 0
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
    http_req_duration: ['p(95)<500'], // 95% of requests should respond under 500ms
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://traefik';

export default function () {
  // Test 1: Fast API Endpoint
  const fastRes = http.get(`${BASE_URL}/api/fast`);
  check(fastRes, {
    'fast endpoint status is 200': (r) => r.status === 200,
    'fast response time OK': (r) => r.timings.duration < 200,
  });

  // Test 2: CPU-bound Work Endpoint (simulates calculation)
  const workRes = http.get(`${BASE_URL}/api/work?iterations=2000000`);
  check(workRes, {
    'work endpoint status is 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
