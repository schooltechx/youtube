package main

import (
	"fmt"
	"math"
	"net/http"
	"os"
	"runtime"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type Item struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Active bool   `json:"active"`
}

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Recovery())

	instanceID, err := os.Hostname()
	if err != nil {
		instanceID = "unknown"
	}

	// 1. Fast Endpoint
	r.GET("/go/api/fast", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "Fast response",
			"server":  gin.H{"hostname": instanceID, "pid": os.Getpid()},
		})
	})

	// 2. CPU Bound Work
	r.GET("/go/api/work", func(c *gin.Context) {
		iterStr := c.DefaultQuery("iterations", "5000000")
		iterations, _ := strconv.Atoi(iterStr)

		start := time.Now()
		var result float64
		for i := 0; i < iterations; i++ {
			result += math.Sqrt(float64(i)) * math.Sin(float64(i))
		}

		c.JSON(http.StatusOK, gin.H{
			"status":     "ok",
			"message":    "Work completed",
			"durationMs": time.Since(start).Milliseconds(),
			"iterations": iterations,
			"server":     gin.H{"hostname": instanceID, "pid": os.Getpid()},
		})
	})

	// 3. [NEW] Async Non-blocking I/O (จำลอง DB Call)
	r.GET("/go/api/io-async", func(c *gin.Context) {
		delayStr := c.DefaultQuery("delay", "50")
		delayMs, _ := strconv.Atoi(delayStr)

		// Go รัน handler บน Goroutine อิสระ การ Sleep จึงไม่บล็อก Goroutines อื่น
		time.Sleep(time.Duration(delayMs) * time.Millisecond)

		var m runtime.MemStats
		runtime.ReadMemStats(&m)

		c.JSON(http.StatusOK, gin.H{
			"status":             "ok",
			"type":               "Asynchronous Non-blocking I/O",
			"simulatedLatencyMs": delayMs,
			"server": gin.H{
				"hostname":      instanceID,
				"pid":           os.Getpid(),
				"memoryUsageMB": m.Alloc / 1024 / 1024,
			},
		})
	})

	// 4. [NEW] Payload Response
	r.GET("/go/api/payload", func(c *gin.Context) {
		items := make([]Item, 100)
		for i := 0; i < 100; i++ {
			items[i] = Item{ID: i + 1, Name: fmt.Sprintf("Item %d", i+1), Active: true}
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"total":  100,
			"data":   items,
			"server": gin.H{"hostname": instanceID, "pid": os.Getpid()},
		})
	})

	r.GET("/go/health", func(c *gin.Context) { c.String(http.StatusOK, "OK") })
	r.Run(":3000")
}