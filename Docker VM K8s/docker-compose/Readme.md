# Docker Compose
ใช้จัดการ Container หลายตัวพร้อมๆกัน ใช้งานได้สะดวกกว่าใช้ จะมีคำสั่ง docker คำสั่งพื้นฐานที่ควรรู้
``` sh
docker compose up db
docker compose up 
docker compose up -d
docker compose ps 
docker compose stop
docker compose down
```

## docker-compose.yaml
ในแต่ละโฟลเดอร์จะมี ตัวอย่าง docker-compose.yaml สำหรับการเซิร์ฟเวอร์ต่างๆ สามารถสำเนาทั้งโฟลเดอร์ไปใช้งานได้เลย
- Microsoft SQL Server
- Nginx เป็น Web Server แบบ ธรรมดา 
- WikiJS ใช้เขียนเอกสารในบริษัทแบบออนไลน์
- Word Press เป็น CMS ยอดนิยม
- MongoDB ฐานข้อมูล NO SQL ยอดนิยม