

# Docker Compose
ใช้จัดการ Container หลายตัวพร้อมๆกัน ใช้งานได้สะดวกกว่าใช้คำสั่ง docker โดยตรง เวลาเรียกใช้งานต้องมีไฟล์ docker-compose.yaml หรือ compose.yaml จะเก็บการตั้งค่าเอาไว้ ทำให้ไม่ต้องคอยจำคำสั่ง ก็อปไปใช้ แก้ค่านิดหน่อย เก็บใน Git ได้ด้วย การเรียกใช้งาน จะเรียก docker-compose แต่รุ่นใหม่จะใช้ docker compose

คำสั่งพื้นฐานที่ควรรู้
``` sh
docker compose up db # รันเฉพาะเซอร์วิส db ขึ้นมา
docker compose up    # รันแบบเห็น logs ถ้ากด ctrl+c โปรแกรมจะหยุดทำงาน
docker compose up -d # รันแบบใช้งาน
docker compose ps    # ดูว่ามีเซอร์วิสไหนรันอยู่บ้าง
docker compose stop  # หยุดการทำงาน
docker compose down  # หยุดการทำงานและลบ Container ออก
docker compose exec nginx bash # เรียก bash shell ในเซอร์วิส nginx 

```

## docker-compose.yaml
ในแต่ละโฟลเดอร์จะมี ตัวอย่าง docker-compose.yaml สำหรับการเซิร์ฟเวอร์ต่างๆ สามารถสำเนาทั้งโฟลเดอร์ไปใช้งานได้เลย
- [Microsoft SQL Server](./mssql/)
- [Nginx](./simple-web/) เป็น Web Server แบบ ธรรมดา 
- [WikiJS](./wiki.js/) ใช้เขียนเอกสารในบริษัทแบบออนไลน์
- [WordPress](./wordpress/) เป็น CMS ยอดนิยม
- [MongoDB](./mongo/) ฐานข้อมูล NO SQL ยอดนิยม
- [minecraft](./minecraft/) รันเซิรืฟเวอร์ Minecraft ไว้เล่นกันหลายคน

## อ่านเพิ่ม

- [Playlist ติดตั้ง Docker และการใช้งาน](https://www.youtube.com/watch?v=8g_GwM60MaU&list=PLWMbTFbTi55P6Vzv9a-un9oFZY-PwMj98)

