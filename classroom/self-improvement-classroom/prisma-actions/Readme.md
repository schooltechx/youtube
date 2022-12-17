# Form Actions + Prisma ORM
ให้ศึกษาการใช้ Form Actions ให้เข้าใจ งานนี้จะใช้ฐานข้อมูลมาร่วมด้วย

[![IMAGE ALT TEXT](https://img.youtube.com/vi/4tdfzpepxv4/0.jpg)](https://youtu.be/4tdfzpepxv4 "SvelteKit Full Stack Part-4 - Form Actions")

จะมีตัวอย่างโค้ดการใช้งาน Prisma [ORM](https://www.codesanook.com/advantages-of-object-relational-mapping-orm) ซึ่งเป็นเครื่องมือสำหรับใช้งานฐานข้อมูลโดยไม่จำเป็นต้องรู้คำสั่ง SQL

## ให้สร้างโปรเจ็กตามนี้ครับ  
``` sh
npm create svelte@latest db-actions
cd db-actions
npm install
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
code .
# เพิ่ม model ใน prisma/schema.prisma แล้วค่อยรันคำสั่งต่อไป ดูหัวข้อด้านล่าง
npx prisma migrate dev --name init
npx prisma studio
``` 
## prisma/schema.prisma
``` 
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
}
```
## เอาโค้ดไปใช้งาน

ก็อปโค้ดจาก +page.svelte และ +page.server ไปใส่ที่ src/routes/prisma-actions
โปรแกรมจะแสดงสร้าง(Create)และแสดง(Read)รายการ Posts จากฐานข้อมูล 
ให้นักเรียนทำการ อัปเดต(Update)และ ลบ(Delete) เพื่อให้โปรแกรมสมบูรณ์

## อ่านเพิ่มเติม 

- https://www.prisma.io/docs/getting-started/quickstart
- https://www.prisma.io/docs/concepts/components/prisma-client/crud
