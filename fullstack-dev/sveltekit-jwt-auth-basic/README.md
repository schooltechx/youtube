# ตัวอย่างการใช้ SvelteKit ทำการ Authentication กับ Strapi v4
เป็นตัวอย่างสำหรับเรียบนรู้การใช้ JWT Authentication ดังนั้นจะทำหน้าง่ายๆไม่ซับซ้อน ให้ดูวิธีการใช้ตามวีดีโอในตัวอย่าง 
[วีดีโอประกอบการสอน]: https://youtu.be/k6OCzi_npTI

## ในตัวอย่างจะใช้ API สองตัวนี้ 
GET อ่านค่ายูสเซอร์ที่ login โดยแนบ JWT
http://localhost:1337/api/users/me
POST ทำการ login เข้าระบบ จะได้ JWT กลับมา
http://localhost:1337/api/auth/local


