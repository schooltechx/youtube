# Traefik ใช้งาน Docker Provider และ Let's Encrypt Certificate
เป็นตัวอย่างการใช้ Traefik เพื่อ Deploy บน Production
- โดเมนควรชี้มาที่ public IP ของโฮสนี้ แล้วแก้ค่า Label ให้เหมาะสม
- ใช้ Volume /var/run/docker.sock เพื่อดูค่าตอนฟิกจาก Label ของแต่ละ container อื่นๆแบบไดนามิก
- firewall เปิดพอร์ต 80 และ 443 สำหรับการเชื่อมต่อกับภายนอก 
- พอร์ต 8080 สำหรับดู Dashboard ควรใช้ภายใน
- คอนเทนเนอร์ใน host เดียวกันไม่จำเป็นต้องเปิดพอร์ตเพราะคุยกันใน docker network ได้
- Reverse Proxy/API Gateway โดยทำ HTTPS ด้วย Let's Encrypt จะตรวจสอบกับ Traefik โดเมนกับ IP ที่พอร์ต 80 เพื่อเป็นการแสดงว่าเป็นเจ้าของโดเมนจริงๆแล้วจะสร้าง certificate ให้ วิธีนี้เรียก [HTTP-01 challenge](https://letsencrypt.org/th/docs/challenge-types/#http-01-challenge)

## อธิบายโครงสร้างไฟล์
- traefik/compose.yaml สำหรับเรียกใช้ Traefik
- traefik/traefik.yaml คอนฟิกต่างๆของ Traefik ที่จะต้องแก้ไขคือ caServer ให้ทดสอบด้วย staging ก่อนเมื่อ https ใช้งานได้ให้เปลี่ยนเป็น prod 
- traefik/traefik-certs ใช้เก็บ certificate ในไฟล์ acme.json
- static-web/compose.yaml ใช้ nginx ทำเวปเซิร์ฟเวอร์ ใช้ label ในการกำหนด domain https 
- simple-web/web1/index.html ตัวอย่างหน้าเวปที่ 1
- simple-web/web2/index.html ตัวอย่างหน้าเวปที่ 2


