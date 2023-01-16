# Keycloak รุ่นเก่า 
รัน Keycloak จาก docker-compose.yml เป็นวิธีที่ง่ายที่สุดสำหรับ Production และ Development 
รุ่นเก่าจะใช้อิมเมจ quay.io/keycloak/keycloak:legacy หรือ jboss/keycloak
ดูตัวอย่าง docker-compose.yaml [ที่นี้](https://github.com/keycloak/keycloak-containers/tree/main/docker-compose-examples)

# Keycloak รุ่นใหม่
เวอร์ชั้น 20 ขึ้นไปไม่รองรับคอนฟิกแบบเก่าแล้ว มีการเปลี่ยนแปลงมากพอสมควร ที่แตกต่างชัดๆจะมีตรง command เพิ่มขึ้นมาหลักๆจะใช้ start กับ start-dev แนะนำให้อ่านเอกสาร 
- [Running Keycloak in a container](https://www.keycloak.org/server/containers)
- [Enabling and disabling features](https://www.keycloak.org/server/features)
- [เอกสารเซิร์ฟเวอร์ทั้งหมด](https://www.keycloak.org/guides#server)

ควรใช้  Postgres หรือ CockroachDB เพื่อรองรับ [storage](https://www.keycloak.org/2022/07/storage-map.html)
แบบใหม่
## Quick Development
สำหรับการทดสอบ จะใช้ embeded database 
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
    ports:
      - 9080:8080 
```

## แบบมีฐานข้อมูล Development/Production

development ใช้แบบนี้
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
      - KC_DB=postgres
      - KC_DB_URL_HOST=postgres
      - KC_DB_URL_DATABASE=keycloak 
      - KC_DB_USERNAME=keycloak 
      - KC_DB_PASSWORD=P@ssw0rd
      - TZ=Asia/Bangkok
    ports:
      - 9080:8080 
      - 9443:8443
    depends_on:
      - postgres
  postgres:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=keycloak
      - POSTGRES_USER=keycloak
      - POSTGRES_PASSWORD=P@ssw0rd
      - TZ=Asia/Bangkok
    ports:
      - 5432:5432
    volumes:
      - ./pgtest-volume:/var/lib/postgresql/data

```
Production แบบอยู่หลัง [reverse proxy](https://www.keycloak.org/server/reverseproxy) 
ทำ https, กำหนดชื่อ sub domain ให้ และไม่มีการเข้ารหัสในเน็ตเวิร์กภายใน 
```
    command: ["start","--optimized","--proxy edge", "--hostname-strict=false"]
```
ถ้าต้องการถอนการติดตั้งทั้งหมด
```
docker compose down
sudo rm -Rf ./pgtest-volume
```