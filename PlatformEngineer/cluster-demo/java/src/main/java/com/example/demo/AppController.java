package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.net.InetAddress;
import java.util.*;

@RestController
public class AppController {

    private String getHostname() {
        try { return InetAddress.getLocalHost().getHostName(); }
        catch (Exception e) { return "unknown"; }
    }

    // 1. Fast Endpoint
    @GetMapping("/java/api/fast")
    public Map<String, Object> fast() {
        Map<String, Object> res = new HashMap<>();
        res.put("status", "ok");
        res.put("message", "Fast response");
        res.put("server", Map.of("hostname", getHostname(), "pid", ProcessHandle.current().pid()));
        return res;
    }

    // 2. CPU Bound Work
    @GetMapping("/java/api/work")
    public Map<String, Object> work(@RequestParam(defaultValue = "5000000") int iterations) {
        long start = System.currentTimeMillis();
        double result = 0;
        for (int i = 0; i < iterations; i++) { result += Math.sqrt(i) * Math.sin(i); }

        Map<String, Object> res = new HashMap<>();
        res.put("status", "ok");
        res.put("message", "Work completed");
        res.put("durationMs", System.currentTimeMillis() - start);
        res.put("iterations", iterations);
        res.put("server", Map.of("hostname", getHostname(), "pid", ProcessHandle.current().pid()));
        return res;
    }

    // 3. [NEW] Async Non-blocking I/O (จำลอง DB Call)
    @GetMapping("/java/api/io-async")
    public Map<String, Object> ioAsync(@RequestParam(defaultValue = "50") int delay) throws InterruptedException {
        // จำลอง I/O Latency
        Thread.sleep(delay);

        long usedMemoryMB = (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / 1024 / 1024;

        Map<String, Object> res = new HashMap<>();
        res.put("status", "ok");
        res.put("type", "Asynchronous Non-blocking I/O");
        res.put("simulatedLatencyMs", delay);
        res.put("server", Map.of(
            "hostname", getHostname(),
            "pid", ProcessHandle.current().pid(),
            "memoryUsageMB", usedMemoryMB
        ));
        return res;
    }

    // 4. [NEW] Payload Response
    @GetMapping("/java/api/payload")
    public Map<String, Object> payload() {
        List<Map<String, Object>> items = new ArrayList<>();
        for (int i = 1; i <= 100; i++) {
            items.add(Map.of("id", i, "name", "Item " + i, "active", true));
        }

        Map<String, Object> res = new HashMap<>();
        res.put("status", "ok");
        res.put("total", 100);
        res.put("data", items);
        res.put("server", Map.of("hostname", getHostname(), "pid", ProcessHandle.current().pid()));
        return res;
    }

    @GetMapping("/java/health")
    public String health() { return "OK"; }
}