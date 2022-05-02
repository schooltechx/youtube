# ใช้งาน Docker Provider และ Self-signed Certificate
เป็นตัวอย่างการใช้ Traefik แบบเป็น Docker การคอนฟิกมีหลายแบบ ผมจะเลือกเป็นส่งค่าคอนฟิกจะทำผ่าน label 
ในวีดีโอก่อนหน้าเป็นแบบใช้ไฟล์ ในวีดีโอนี้แสดงให้เห็นว่ามันใช้ทั้งสองแบบพร้อมกันได้ 
จะมีการใช้ใบรับรองที่ทำเองจากในวีดีโอก่อนหน้าที่ใช้บน Nginx Proxy Manager(NPM) แต่คราวนี้จะทำแบบเดียวกันบน Traefik ถึงการตั้งค่าจะยากกว่า 
NPM เพราะต้องเขียนคอนฟิกเอง แต่จะยืดหยุ่นกว่ามาก 

## อธิบายโครงสร้างไฟล์
- traefik  เป็น reverse-proxy เปิดพอร์ตบนโฮสต์ 80 443
- /var/run/docker.sock:/var/run/docker.sock:ro mount volume ของ docker เพื่อดู label ที่เปลี่ยนแปลงในระบบจะได้ทำคอนฟิกแบบ dynamic  
- traefik/data/traefik.yml  เป็น static configuration 
- traefik/data/configuration/dynamic.html  เป็น dynamic configuration
- traefik/data/ssl/  โฟลเดอร์เก็บใบรับรอง
- simple-web  ใช้ nginx ทำเวปเซิร์ฟเวอร์เปิดพอร์ตบนโฮสต์ 8082
- simple-web/html/index.html  หน้าเวปที่แสดงมีหน้าเดียว
- whoami  แสดงข้อมูลของระบบ เปิดพอร์ตบนโฮสต์ 8081 ตัว traefik ดูว่าจะใช้คอนฟิกยังไงจาก label ใน docker-compose.yml

## วีดีโอการใช้งาน
https://youtu.be/z3TqJImsXPQ
