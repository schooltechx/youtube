# Cluster Demo
เรียนรู้และทดสอบคลัสเตอร์ จะใช้ Load Test ด้วย K6

## 1 VM
เหมาะสำหรับ Node.js เพื่อให้ใช้ได้ทุก CPU core
- **Runtime:** Node.js 
- **Framework:** Express.js
- **Process Manager:** PM2 (Cluster Mode)
- **Docker Container:** Cluster แบบ Microservice
- **Reverse Proxy & Load Balancer:** Traefik v3
- **Load Testing Tool:** Grafana k6
- เทียบกับ Framework อื่นๆที่ใช้งานได้ทุก core โดยไม่จำเป็นต้องทำ Cluster .NET(C#), Go, Java

---

### Architecture Overview
Cluster แบบง่ายด้วย PM2
```text
               [ Traffic / Requests ]
                         │
                         ▼
             [ PM2 Cluster Mode ] (Port 3000)
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
 [ App Instant 1 ]              [ App Instant 2 ]
```
Cluster โดยใช้ Docker

```text
               [ Traffic / Requests ]
                         │
                         ▼
             [ Traefik Load Balancer ] (Port 80)
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
 [ App Container 1 ]              [ App Container 2 ]
```

---

## 📂 Structure
```
express-bun-traefik-k6/
├── dotnet/                 <-- .NET Web API
│   ├── dotnet-app.csproj   
│   ├── Program.cs
│   └── Dockerfile
├── go/                     <-- GO Web API
│   ├── main.go
│   └── Dockerfile
├── java/                   <-- Java Web API
│   ├── pom.xml
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/demo/
│   │       │   ├── DemoApplication.java
│   │       │   └── AppController.java
│   │       └── resources/
│   │           └── application.properties
│   └── Dockerfile
├── node/                   <-- Express.js Web API
│   ├── src/app.js
│   ├── ecosystem.config.js <--  PM2 Cluster Configuration
│   ├── package.json
│   └── Dockerfile
├── k6/                     <-- K6 Load test tools
│   ├── io-test.js            <-- Simulates I/O Intensive Task
│   └── load-test.js          <-- Simulates CPU Intensive Task
├── docker-compose.yml      <-- node, go, .NET, java, k6
└── README.md
```
---
## install
- สร้าง VM Linux(Debian) 8GB, 6Core(Optional: แบบ hotplug จะได้ปรับ vcore โดยไม่ต้อง Restart )
- ติดตั้ง btop, [docker](https://docs.docker.com/engine/install/debian/), 
[nvm](https://github.com/nvm-sh/nvm), 
[pm2](https://pm2.io/docs/runtime/guide/installation/),
[k6](https://grafana.com/docs/k6/latest/set-up/install-k6/)
```sh
## install docker
sudo apt install btop
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
## install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash
nvm install --lts
## install pm2
npm install pm2 -g
```
- ติดตั้ง [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) ไว้อีกเครื่อง

```
sudo apt install gpg
curl -fsSL https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```
---
## ทดสอบระบบ

### ทดสอบ Express.js เบื้องต้น

```sh
cd node
npm i 
npm start # development on port 3000
curl http://localhost:3000/node/health
curl http://localhost:3000/node/api/fast
curl http://localhost:3000/node/api/work
```
### ทดสอบ Express.js PM2 Cluster
รันที่พอร์ต 3000 แนะนำให้ลองเริ่มจาก 1 instances จนถึง

```sh
# รัน Cluster เลือก ในสองแบบบนี้
pm2 start ecosystem.config.js
pm2 start src/app.js --name my-api --instances 2
# Monitor
pm2 list
pm2 monit
btop
# หยุดการทำงานและนำออกจากรายการ
bm2 stop my-api
pm2 delete all
# Bench mark ด้วย k6 จากอีกเครื่อง 

curl http://192.168.2.37:3000/node/api/work?iterations=50000000
TARGET_URL=http://192.168.2.37:3000/node k6 run k6/load-test.js
docker compose up -d traefik app-node --build


```
### ทดสอบ docker Cluster Express.js + traefik
- Web Application จะให้บริการที่: `http://localhost`
- Traefik Dashboard จะให้บริการที่: `http://localhost:8080`

```bash
docker compose up -d traefik app-node --build --scale app-node=1

docker compose up -d traefik app-node --scale app-node=2
# Traefik Dashboard (http://localhost:8080) จะเห็น HTTP Services มี app-node 2 Servers
TARGET_URL=http://192.168.2.37/node k6 run k6/load-test.js
# รันบน VM เพื่อการทดสอบ
docker compose run --rm -e TARGET_URL=http://traefik/node k6 run /scripts/load-test.js 
# ตัวอย่างยิงโหลดหนักๆ ไปที่ CPU-bound calculation (`/api/work`) เพื่อทดสอบขีดจำกัดของ CPU:
docker compose run --rm -e TARGET_URL=http://traefik/node k6 run --vus 100 --duration 30s /scripts/load-test.js
```

### เปรียบเทียบกับ .NET, Go, Java 
.NET, Go, Java ทำงานแบบ multi-thread ทำให้ใช้ได้ทุก core โดยไม่ต้องทำ cluster บน VM(เดียว)

```bash
docker compose up -d --scale app-node=6
# .NET
TARGET_URL=http://192.168.2.37/dotnet k6 run k6/load-test.js
# Go
TARGET_URL=http://192.168.2.37/go k6 run k6/load-test.js
# Java
TARGET_URL=http://192.168.2.37/java k6 run k6/load-test.js

# ตัวอย่างยิงโหลดหนักๆ ไปที่ CPU-bound calculation (`/api/work`) เพื่อทดสอบขีดจำกัดของ CPU:
TARGET_URL=http://192.168.2.37/go k6 run --vus 100 --duration 30s k6/load-test.js

# ยิง Request ต่อเนื่องเพื่อดูว่า Traefik กระจายงานไปยัง Container / Worker ของ Express.js ตัวไหนบ้าง:
for i in {1..15}; do curl -s http://localhost/node/api/fast | grep hostname; done


TARGET_URL=http://192.168.2.37/node k6 run k6/io-test.js

```


---

## ตัวอย่างผลลัพธ์ที่ควรสังเกตในการเรียนรู้
1. **Response Time (p95):** เปรียบเทียบระยะเวลาตอบสนองระหว่าง 1 Container vs 4 Containers เมื่อเจอ Concurrency สูงๆ
2. **CPU Utilization:** ตรวจสอบการกระจายภาระงานผ่าน PM2 `cluster` mode + Traefik Round-robin ใช้ btop
3. **HTTP Success Rate:** ตรวจสอบว่ามี Request ที่หลุด หรือเป็น 5xx / Timeout หรือไม่ขณะทำ High Concurrency Test
