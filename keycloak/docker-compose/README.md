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
Keycloak บน Docker เปลี่ยนวิธีการเรียกใช้งานด้วย จากคำสั่งข้างต้น จะมีโหมดการรันแบบนักพัฒนา(start-dev) และแบบใช้งานจริง(start) จำเป็นต้องมีขั้นตอนการ build ด้วยค่อนข้างน่าปวดหัวตอนอ่านเอกสาร เราสามารถเซ็ตค่าผ่าน พารามิเตอร์ของ command หรือ
ตัวแปรแวดล้อมได้ ถ้ามีการเซ็ตที่เกี่ยวข้องกับการ build มันจะทำการ build ใหม่

แนะนำให้อ่านเอกสาร 
- [Running Keycloak in a container](https://www.keycloak.org/server/containers)
- [Enabling and disabling features](https://www.keycloak.org/server/features)
- [เอกสารเซิร์ฟเวอร์ทั้งหมด](https://www.keycloak.org/guides#server)

ควรใช้ Postgres หรือ CockroachDB เพื่อรองรับ [storage](https://www.keycloak.org/2022/07/storage-map.html) แบบใหม่
## โหมดสำหรับนักพัฒนา
จะใช้เป็น start-dev 
- ใช้ http
- โหมดนี้ theme จะไม่มีการ cache ไว้แก้แล้วเห็นเลยไม่ต้อง restart
- embeded database จะเก็บในโฟลเดอร์ data ให้สิทธิ์ ในการเขียนด้วย
- "--import-realm" ใส่ไฟล์ใน ./data/import เพื่อนำเข้า Realams ได้ ไฟล์เอามาจาก Realam settings/Action/Partial export เพื่อที่จะได้ตั้งค่าได้อย่างรวดเร็ว

[docker-compose.dev.yaml](./sample/docker-compose.dev.yaml) สำหรับนักพัฒนาในการการทดสอบโปรแกรม ใช้เป็น embeded database

```yaml
# docker compose -f docker-compose.dev.yaml up
version: "3.1"
services:
  keycloak:
    container_name: keycloak-dev
    image: quay.io/keycloak/keycloak:20.0.3
    command: start-dev --import-realm
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=changeme
      - TZ=Asia/Bangkok
    volumes:
#      - ./themes:/opt/keycloak/themes:rw
      - ./data:/opt/keycloak/data:rw
    ports:
      - 9080:8080
```
คำสั่งที่ใช้ 
```
mkdir data
chmod uo+w data/
docker compose -f docker-compose.dev.yaml up
```

ถ้าต้องการล้างข้อมูลทั้งหมดลบ container ก่อน และ ลบข้อมูลใน data ทิ้ง 
```bash
docker compose -f docker-compose.dev.yaml down
rm -Rf data/*
```

## โหมดใช้งาน
ผลจากการ build จะอยู่ยังคงอยู่ใน container เหมาะกับการใช้สำหรับ Test/Production ในกรณีที่มีการแก้ไขค่าคอนฟิกอยู่เนืองๆ ตัวอย่างจะใช้ร่วมกับฐานข้อมูล PostgresQL จริงแต่ build ตามคอนฟิกที่กำหนดได้ จะเป็นการเลือกชนิดฐานข้อมูล และเปิดใช้ฟีเจอร์ต่างๆ 
การ build จะกินเวลาเพิ่มเล็กน้อย และมันจะเตือนให้ใส่พารามิเตอร์ "--optimized" เป็นการปิดการ build ให้ดูวิธีใช้ในหัวข้อถัดไป (หัวข้อนี้ห้ามทำ) 

[docker-compose.test.yaml](./sample/docker-compose.test.yaml)
- "start" รันแบบใช้งาน Production
- "--db-url-host postgres" ชื่อโดเมนของฐานข้อมูลในกรณีนี้เป็นชื่อของ service ใน docker-compose.yaml
- "--proxy edge" ไม่ได้ทำ HTTPS ให้ Reverse Proxy เป็นตัวทำ
- "--hostname-strict=false" ให้ reverse proxy กำหนดชื่อโฮสให้
- ขั้นตอนการ build ใช้คอนฟิกเหล่านี้ KC_FEATURES, ENV KC_HEALTH_ENABLED,ENV KC_METRICS_ENABLED,KC_DB 
- ถ้าไม่เซ็ต KC_DB ก็จะใช้ embeded database เป็นค่าตั้งต้น
- จะเป็นตอนใช้งาน keycloak จะใช้ค่าจาก KC_DB_URL,KC_DB_USERNAME,KC_DB_PASSWORD และ command 
- Health check endpoints https://localhost:9080/health, https://localhost:9080/health/ready และ https://localhost:9080/health/live.

วิธีถอนการติดตั้งทั้งหมด
```
docker compose -f docker-compose.test.yaml down
sudo rm -Rf ./pgtest-volume/*
```

## โหมดใช้งานจริง
จะทำการสร้างอิมเมจใหม่ขึ้นมาค่าที่เกิดจากการ build จะอยู่ใน image ค่าตอนฟิกต่างๆ อยู่ในอิมเมจเลย อาจจะทำให้ไม่สามารถแก้ไขเพื่อเอาไปใช้ที่อื่นหรือทำการเปลี่ยนแปลงได้ เหมาะกับรันบน K8s หรือ Openshift ไม่ต้องมีคอนฟิกไฟล์ 
- ในตัวอย่างนี้จะฝังค่าคอนฟิกบางตัวใน image 
- แสดงการ overide ค่าคอนฟิกผ่าน command 
ใช้ Certificate ที่สร้างเอง
- เปิดใช้ HTTP/HTTPS
### Note
ใน production ไม่ควรป้อน command เพิ่มเติมใช้ Certificate ที่ถูกต้อง และเปิดแค่ HTTPS

### [buld/Dockerfile](./sample/build/Dockerfile)
- อิมเมจจะเป็นสำหรับ PostgresSQL 
- มีค่าตั้งต้นไว้ที่เซ็ต KC_DB_URL,KC_DB_USERNAME,KC_DB_PASSWORD
- ในตัวอย่างจะไม่เซ็ตค่า KC_HOSTNAME ให้เซ็ตผ่าน reverse proxy

### [docker-compose.yaml](./sample/docker-compose.yaml)
- "start --optimized" เป็นการบอกว่าจะไม่ build ใหม่แล้ว ใช้ HTTPS
- ถ้าจะคอนฟิกฐานข้อมูลใหม่ ให้ใช้พารามิเตอร์ผ่าน command --db-url, --db-username, --db-password
- "--hostname-strict=false" ให้ reverse proxy กำหนดชื่อให้
- "--proxy edge" เปิดใช้ HTTP ให้ reverse proxy ทำ HTTPS แทนได้
- ตัวอย่างนี้ใช้ HTTP(http://localhost:9080/) และ HTTPS(https://localhost:9443/) ได้  
