# แนะนำการใช้ Traefik เบื้องต้น
ตัวอย่างโค้ดสำหรับการเรียกใช้งาน Traefik แบบง่ายไม่ซับซ้อนใช้เรียกโปรแกรมพร้อมไฟล์คอนฟิกกูเรชั่นก็ใช้งานได้เลย แบบนี้เรียกว่า File Provider เป็นวิธีที่เข้าใจได้ง่าย 
## ไฟล์ที่ใช้
ไฟล์ traefik.yaml เพิ่มเติมจากในวีดีโอเล็กน้อยเมีการแสดงแสดง Dashboard ให้ด้วยให้ไปที่ http://localhost:8080
- [โปรแกรม traefik ดาว์นโหลดเป็นแบบ binary](https://github.com/traefik/traefik/releases)
- [Static คอนฟิก traefik.yaml](https://github.com/schooltechx/youtube/raw/main/traefik/traefik-intro/traefik.yaml)
- [Dynamic คอนฟิก routes.yaml](https://github.com/schooltechx/youtube/raw/main/traefik/traefik-intro/routes.yaml)
- [โปรแกรมตัวอย่างเป็น node.js server.js](https://github.com/schooltechx/youtube/raw/main/traefik/traefik-intro/server.js)

## วีดีโอสอนการใช้งาน
https://youtu.be/DgxRcFlccsU
วีดีโอนี้จะแสดงคอนเซ็บการใช้งานคร่าวๆ เพื่อให้เห็นประโยชน์และหลักการสำคัญๆ เท่านั้น ยังขาดฟีเจอร์หลักๆที่น่าสนใจอีกมาก ไว้ค่อยมาทำวีดีโอในภายหลัง ในตัวอย่างจะใช้ binary 
ที่รันได้เลยและใช้ provider แบบไฟล์ จะได้ไม่ซับซ้อนนัก ความรู้แค่นี้นักพัฒนาสามารถเอาไปใช้จัดการ API Gatewayม Microservice และทำ Loadbalance ได้แล้ว 

## เพิ่มเติม
การทำ API Gateway ด้วยฟีเจอร์ระดับ Enterprise จะมีค่าใช้จ่าย ก็พอมีทางออกสำหรับแบบฟรีครับ
- Nginx Plus 
- Kong & Konga 
- Traefik Enterprise มีความสามารถมากกว่ารุ่นฟรี แต่เป็นไปได้ที่หา Middleware ที่มีความสามารถที่ต้องการทดแทนได้
