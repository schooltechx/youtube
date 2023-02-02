# Form Actions + Prisma ORM


[![IMAGE ALT TEXT](https://img.youtube.com/vi/i_kcfA8_4bQ/0.jpg)](https://youtu.be/i_kcfA8_4bQ "SvelteKit Full Stack Part-5 - Form Actions and Prisma ORM")

สอนการใช้งาน SvelteKit Form Actions กับฐานข้อมูล SQLite ใช้ผ่าน Prisma [ORM](https://www.codesanook.com/advantages-of-object-relational-mapping-orm) ซึ่งเป็นเครื่องมือสำหรับใช้งานฐานข้อมูลโดยไม่จำเป็นต้องรู้คำสั่ง SQL

## วิธีการติดตั้ง  
``` sh
npm create svelte@latest actions-prisma
cd actions-prisma
npm install
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
code .
# เพิ่ม model ใน prisma/schema.prisma แล้วค่อยรันคำสั่งต่อไป ดูหัวข้อด้านล่าง
# pnpx prisma db push
npx prisma migrate dev --name init
npx prisma studio
``` 
ก็อปโค้ดจาก +page.svelte และ +page.server ไปใส่ที่ src/routes/prisma-actions

## prisma/schema.prisma
``` 
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String
}
```

## ลิงค์ที่ใช้ในวีดีโอ
- https://kit.svelte.dev/
- https://kit.svelte.dev/docs/form-actions
- https://github.com/schooltechx/youtube/tree/main/svelte/svelte-kit/sveltekit-fullstack/src/routes/actions
- https://www.prisma.io/docs/getting-started/quickstart
- https://www.prisma.io/docs/concepts/components/prisma-client/crud
- https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
