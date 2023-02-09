# Install Docker
ติดตั้งแบบรวดเร็ว
``` bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh
sudo usermod -aG docker username
```

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

## อ่านเพิ่ม
- [ติดตั้ง Docker และการใช้งาน](https://www.youtube.com/watch?v=8g_GwM60MaU&list=PLWMbTFbTi55P6Vzv9a-un9oFZY-PwMj98)

