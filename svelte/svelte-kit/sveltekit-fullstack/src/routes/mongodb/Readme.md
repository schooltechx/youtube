# SvelteKit with Mongodb 

This is simple CRUD in one page. 
You have to copy files to correct location of svelte project 
for running this demo.  
SvelteKit make some change for POST method. 
I use GET method for avoiding break change and remake tutorial.
You can check Form Actions tutorial for POST method.
I don't want to make complex demo so I use similar UI and schema for most of database demo. You can learn another dabase in few minute.

![Product UI](../../../asset/product-ui.png)

## File

- docker-compose.yml
- src/routes/mongodb/+page.server.js
- src/routes/mongodb/+page.svelte

## install

    npm create svelte@latest my-app
    cd my-app
    npm install
    npm install mongodb
    # copy file to project
    docker compose up -d mongo
    code .

Browse to [http://localhost:4000](http://localhost:4000)
## note

I found mongo not found error sometime. I don't know how to fix it yet. Some annoy problem can fix by. 
- npm update
- reload visual studio code

please check [main document](https://github.com/schooltechx/youtube/tree/main/svelte/svelte-kit) for other tutorial


[Program]

[Mongodb]


[Mongoose]
แยก +page.svelte/+page.js คือ FE/BE
เปลี่ยน DB หรือ business logic แก้แค่ BE
FE เหมือนเดิม


[prisma sqlite]
FE ค่อนข้างเหมือนเดิม
มี error เพราะยังไม่ได้ npx prisma init
schema.prisma สร้าง Schema Product
migrate แล้วจะเห็น .db, sql
เทียบ Schema กับ .sql ดู
tags เป็น string ไม่ใช่ array ทำแค่ table เดียวก่อน
Type Product,Products
Search ของ Prisma มันไม่มี like 
prisma.$disconnect

[firebase firestore]














