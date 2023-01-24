# Keycloak รุ่นเก่า 
รัน Keycloak จาก docker-compose.yml เป็นวิธีที่ง่ายที่สุดสำหรับ Test, Production และ Development 
รุ่นเก่าจะใช้อิมเมจ quay.io/keycloak/keycloak:legacy หรือ jboss/keycloak
ดูตัวอย่าง docker-compose.yaml [ที่นี้](https://github.com/keycloak/keycloak-containers/tree/main/docker-compose-examples)

# Keycloak รุ่นใหม่
เวอร์ชั้น 20 ขึ้นไปไม่รองรับคอนฟิกแบบเก่าแล้ว มีการเปลี่ยนแปลงมากพอสมควร คำสั่ง kc.sh ที่เรียกใน container จะมีพารามิเตอร์เพิ่ม

```
build                   Creates a new and optimized server image.
start                   Start the server.
start-dev               Start the server in development mode.
export                  Export data from realms to a file or directory.
import                  Import data from a directory or a file.
show-config             Print out the current configuration.
tools                   Utilities for use and interaction with the server.
```


ใน docker-compose.yaml จะมีส่วนของ command เพิ่มขึ้นมาหลักๆจะใช้ start กับ start-dev แนะนำให้อ่านเอกสาร 
- [Running Keycloak in a container](https://www.keycloak.org/server/containers)
- [Enabling and disabling features](https://www.keycloak.org/server/features)
- [เอกสารเซิร์ฟเวอร์ทั้งหมด](https://www.keycloak.org/guides#server)

ควรใช้ Postgres หรือ CockroachDB เพื่อรองรับ [storage](https://www.keycloak.org/2022/07/storage-map.html) แบบใหม่
## Quick Development
docker-compose.yaml สำหรับนักพัฒนาในการการทดสอบโปรแกรม 

```yaml
version: "3.1"
services:
  keycloak:
    container_name: keycloak
    image: quay.io/keycloak/keycloak:20.0.3
    command: ["start-dev"]
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=changeme
#      - KC_FEATURES=admin2
      - TZ=Asia/Bangkok
    volumes:
#      - ./themes:/opt/keycloak/themes:rw
      - ./data:/opt/keycloak/data:rw
    ports:
      - 9080:8080 
```
จะใช้ embeded database ข้อมูลจะเก็บในโฟลเดอร์ data ถ้าต้องการล้างข้อมูลทั้งหมดให้ลบข้อมูลใน data ทิ้ง
```bash
docker compose down
rm -Rf data/*
```

## แบบมีฐานข้อมูล 
docker-compose.yaml สำหรับ Test/Production ใช้ร่วมกับฐานข้อมูล PostgresQL

แบบอยู่หลัง [reverse proxy](https://www.keycloak.org/server/reverseproxy) 
ทำ https, กำหนดชื่อ sub domain ให้ และไม่มีการเข้ารหัสในเน็ตเวิร์กภายใน  
```yaml
version: "3.1"
services:
  keycloak:
    container_name: keycloak
    image: quay.io/keycloak/keycloak:20.0.3
    command: ["start","--optimized","--proxy edge", "--hostname-strict=false"]
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=changeme
      - KC_FEATURES=admin2 #build option
      - TZ=Asia/Bangkok
    ports:
      - 7080:8080 
    volumes:
#      - ./themes:/opt/keycloak/themes:rw
      - ./data:/opt/keycloak/data:rw
    depends_on:
      - postgres
  postgres:
    image: postgres:13-alpine
    environment:
      - POSTGRES_DB=keycloak
      - POSTGRES_USER=keycloak
      - POSTGRES_PASSWORD=P@ssw0rd
      - TZ=Asia/Bangkok
#    ports:
#      - 5432:5432
    volumes:
      - ./pgtest-volume:/var/lib/postgresql/data

```
สำหรับ Development ในสภาพแวดล้อมเดียวกัน ให้แก้เป็น
```
command: ["start-dev","--proxy edge", "--hostname-strict=false"]
```


วิธีถอนการติดตั้งทั้งหมด
```
docker compose down
sudo rm -Rf ./pgtest-volume/*
rm -Rf data/*
```