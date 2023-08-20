# ติดตั้งฐานข้อมูล Oracle ด้วย Docker

[![Oracle DB in docker](https://img.youtube.com/vi/7tOBKEf-y-8/0.jpg)](https://youtu.be/7tOBKEf-y-8 "ติดตั้งฐานข้อมูล Oracle ฟรีๆ ด้วย Docker")

# Official image

วิธีการใช้ไปที่ https://container-registry.oracle.com ดูหัวข้อ Database เลือกหัวข้อ free จะเป็นวิธีการใช้กับ Podman ปรับเป็น docker compose ถ้าจะ mount volume ออกมาใช้ มีปัญหานิดหน่อย ต้องมีขั้นตอนการทำที่ถูกต้อง error ที่แสดงจะไม่สื่อเท่าไหร่ทำให้สับสนตอนทำ 
ให้สร้างโฟลเดอร์ ./oracle-data กำหนดสิทธิ์ให้ยูสเซอร์ "oracle" (uid: 54321) ใน container มีสิทธิ์เขียน 
ให้ใช้ sqlplus หรือ Oracle SQL Developer ในการทดสอบการเชื่อมต่อ
``` yaml
# compose.yaml
version: '3.1'
services:
  oracle-db:
#    image: container-registry.oracle.com/database/express:latest
    image: container-registry.oracle.com/database/free:latest
    environment:
      - ORACLE_PWD=Oracle123
      - ORACLE_CHARACTERSET=AL32UTF8
    ports:
      - 1521:1521
#    volumes:
#      - ./oracle-data:/opt/oracle/oradata
```
ตอนเริ่มฐานข้อมูลครั้งแรกค่อนข้างนานพอสมควรควรตรวจสอบ logs ว่ามันเสร็จหรือยัง ( จะขึ้นคำว่า “DATABASE IS READY TO USE!“)  สำหรับ CPU ไม่ได้ใช้หนักนักแต่ใช้ RAM ค่อนข้างเยอะ
``` bash
docker compose up -d
docker compose logs -f oracle-db
# CTRL+C เพื่อยกเลิกดู logs
# ให้เข้าไปเรียก sqlplus ใน container ด้วยยูสเซอร์ system รหัส Oracle_123
docker compose exec oracle-db sqlplus system/Oracle123

```

## Build อิมเมจเอง
จะใช้เวลาค่อนข้างนานในการ build แต่ก็สามารถแก้ไขติดตั้งโปรแกรมหรืออัปเดตได้ตามต้องการ
ให้อ่าน docker-images/OracleDatabase/SingleInstance/dockerfiles/Readme.md จะมี script สำหรับการ build
``` bash
git clone git clone https://github.com/oracle/docker-images.git
cd docker-images/OracleDatabase/SingleInstance/dockerfiles
./buildContainerImage.sh -v 21.3.0 -t oracle21.3.0xe -x
docker run --name OracleDBxe \
-p 1521:1521 \
-p 5500:5500 \
-e ORACLE_PWD=Oracle123 \
-e ORACLE_CHARACTERSET=AL32UTF8 \
-d \
oracle21.3.0xe

docker exec -it OracleDBxe sqlplus system/Oracle123
```

