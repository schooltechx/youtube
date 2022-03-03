# ใช้งาน Docker Provider และ Self-signed Certificate
เป็นตัวอย่างการใช้ Traefik แบบเป็น Docker การส่งค่าคอนฟิกจะทำผ่าน label ในวีดีโอจะเทียบกับแบบใช้ไฟล์ สามารถใช้ทั้งสองแบบพร้อมกันได้ 
จะมีการใช้ใบรับรองที่ทำเองในวีดีดอก่อนหน้าที่ใช้บน Nginx Proxy Manager(NPM) แต่คราวนี้จะทำแบบเดียวกันบน Traefik ถึงการตั้งค่าจะยากกว่า 
NPM เพราะต้องเขียนคอนฟิกเอง แต่จะยืดหยุ่นกว่ามาก 

## อธิบายโครงสร้างไฟล์
- traefik  เป็น reverse-proxy เปิดพอร์ตบนโฮสต์ 80 443
- traefik/traefik.yml  เป็น static configuration 
- traefik/data/configuration/dynamic.html  เป็น dynamic configuration
- traefik/data/ssl/  โฟลเดอร์เก็บใบรับรอง
- simple-web  ใช้ nginx ทำเวปเซิร์ฟเวอร์เปิดพอร์ตบนโฮสต์ 8082
- simple-web/html/index.html  หน้าเวปที่แสดงมีหน้าเดียว
- whoami  แสดงข้อมูลของระบบ เปิดพอร์ตบนโฮสต์ 8081

## วีดีโอการใช้งาน
https://youtu.be/z3TqJImsXPQ
