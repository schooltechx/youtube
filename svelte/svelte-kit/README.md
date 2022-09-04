# SvelteKit
SvelteKit ใกล้ออกเวอร์ชั่นจริงแล้ว มีการเปลี่ยนแปลมากพอสมควร โดยเฉพาะการ routing การ load() แต่ก็ทำให้ใช้ง่าย และชัดเจนขึ้นกว่าเวอร์ชั่นก่อนหน้ามาก เอกสารนี้จะทำเพื่อแสดงวิธีใช้ sveltekit เบื้องต้น ครอบคลุมการใช้งานหลักๆที่จำเป็น เดี๋ยวผมจะอัปเดตเอกสารถ้ามีการเปลี่ยนแปลงนะครับ 

## อ่านเพิ่มเติม
- [Major Svelte Kit API Change - Fixing `load`, and tightening up SvelteKit's design before 1.0](https://youtu.be/OUGn7VifUCg)
- [Migration guide](https://github.com/sveltejs/kit/discussions/5774?fbclid=IwAR0WN2uJxcNGaugWCsSkyFw0cUzrgOgVkPz1jFhry_YjTaF3WNSw-_uOrSw)

# Setup
โค้ดตัวอย่างนี้จะติดตั้งสิ่ง Extension และ module ที่จำเป็นดังข้างล่า ถ้าติดตั้ง Vite มันจะรันโปรเจ็กให้ไม่ต้อง npm run dev

## VS Code Extensions

- Svelte for VS Code
- Vite by Anthony Fu

## [SvelteKit](https://kit.svelte.dev/)

    npm create svelte@latest my-app
    cd my-app
    npm install
    npm run dev -- --open

## SvelteKit Fullstack

Play List สอนการใช้งานตั้งแต่เบื้องต้นจนเป็นนักพัฒนาแบบ Full Stack 

[![IMAGE ALT TEXT](http://img.youtube.com/vi/P5aJrzlK3ZM/0.jpg)](https://www.youtube.com/watch?v=0KENjveIbt0&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=8 "SvelteKit Full Stack Part0 - Intro")

## [ติดตั้ง Carbon Components Svelte](https://carbon-components-svelte.onrender.com/)

    npm i -D carbon-components-svelte

ใส่ไว้ใน +layout.svelte 

    import "carbon-components-svelte/css/white.css";

## [ติดตั้ง Prisma](https://www.prisma.io/docs/getting-started/quickstart) 

    npm install prisma --save-dev
    npx prisma init --datasource-provider sqlite
    npx prisma migrate dev --name init
    npx prisma studio

# อธิบายการทำงาน

## Folder base routing

[`Routing`](https://kit.svelte.dev/docs/routing). คือการเปลี่ยนหน้าเวป รวมถึง path สำหรับหน้าต่างๆ จะใช้ โครงสร้างขอโฟลเดอร์ในการทำ Routing ซึ่งง่ายตรงไปตรงมา ภายในโฟลเดอร์จะมีไฟล์ที่ขึ้นต้นด้วย + สำหรับการประมวลผลเพื่อแสดงหน้านั้น สำหรับชื่อโฟลเดอร์เป็นปีกกา จะเป็นตัวแปร ส่งให้ไฟล์โปรแกรมประมวลผลได้

| หน้าเวป                  |  โครงสร้างโค้ด                  |
| -----------------------|---------------------------------|
| https://xxx.com        | routes/+page.svelte             |
| http://xxx.com/about   | routes/about/+page.svelte       |
| http://xxx.com/blog/34 | routes/blog/[slug]/+page.svelte |

 
## ไฟล์ต่างๆ สำหรับการ routes

ไฟล์ที่อยู่ภายใต้โฟลเดอร์ routes จะขึ้นต้นเครื่องหมายบวก ไฟล์หลายตัวทำงานคู่กันดูจากชื่อที่หล้ายกัน ไฟล์ที่นามสกุล .js จะใช้เรียกฟังก์ชั่น load() ซึ่งทำงานก่อนการเรนเดอร์หน้า
อันไหนมีคำว่า server ฟังก์ชั้น load() มันจะทำงานที่ฝั่งเซิร์ฟเวอร์เท่านั้น ไฟล์อื่นๆนอกจากนี้จะไม่ผลในการ routing

ไฟล์ที่ทำงานฝั่งเซิร์ฟเวอร์เหมาะสำหรับติดต่อฐานข้อมูลหรืออ่านค่า environment variable ที่เป็น private 

ไฟล์ที่ทำงานฝั่ง browser เหมาะสำหรับการเรนเอร์หน้าตอนทำการ Navigate ไปหน้าต่างๆ สามารถเข้าถึง environment variable ที่เป็น public ได้

environment variable สามารถใส่ในไฟล์ .env ไว้ในโฟลเดอร์ของโปรเจ็ก 


| File                  |  โครงสร้างโค้ด                  |
| --------------------|---------------------------------|
| +page.svelte        | หน้าเวปทั่วๆไปทำงานคู่กับ +page.js หรือ +page.server.js 
| +page.js            | ทำงานก่อนเรนเดอร์หน้า แล้วส่งค่าให้ +page.svelte เพื่อเรนเดอร์หน้าต่อไป ทำการเรนเอร์หน้าเวปเช่นใช้ดึงข้อมูลจาก Storage, API 
| +page.server.js     | คล้าย +page.js แต่ทำเซิร์ฟเวอร์เท่านั้น
| +server.js          | เป็น rout สำหรับทำ API
| +layout.svelte      | เป็นโครงหน้าเวปเช่นส่วนหัวหรือเมนู กับส่วนล่างของหน้า 
| +layout.server.js   | รัน load ฝังเซิร์ฟเวอร์ 
| +error.svelte       | แสดงหน้า Error ของตัวเองได้เช่น 404 ก็แสดงว่าหน้านี้ค้นหาไม่พบ ให้ติดต่อ Web master
| 
| 

## ฟังก์ชัน load() 

จะเรียกใช้ก่อนการเรนเดอร์หน้าเวป +page.js +page.server.js หรือ +layout.server.js แล้วทำการส่ง data ให้ +page.svelte 

ไฟล์ +page.js

    /** @type {import('./$types').PageLoad} */
    export function load({ }) {
        return {
        title: 'Hello SvelteKit!',
        content: 'Welcome to <b>SvelteKit</b>'
        };  
    }

ไฟล์ +page.svelte

    <script>
        /** @type {import('./$types').PageData} */
        export let data;
    </script>
    <h1>{data.title}</h1>
    <div>{@html data.content}</div>


## POST, PATCH, PUT และ DELETE

POST, PUT และ PATCH จะไม่ส่ง data กลับแต่จะส่ง error และ status กลับได้ (ถ้าส่ง error กลับ status จะมีค่า default เป็น 400) ฝั่ง UI ควรดูค่า status ที่กลับมาเป็นหลัก

POST ถ้าทำสำเร็จสามารถ location 

DELETE จะไม่ส่งค่าใดๆกลับ.


+server.js ส่งค่ากลับผ่าน Response(...)

    export function GET() {
    return new Response(JSON.stringify({ answer: 42 }), {
        headers: {
        'content-type': 'application/json; charset=utf-8'
        'x-foo': 'bar'
        }
    });
    }

ถ้า set-cookie มีหลายตัว ให้ใช้ออปเจ็ก Headers จัดการ

    const headers = new Headers();
    headers.append('set-cookie', a);
    headers.append('set-cookie', b);
    return new Response('blah', { headers });

+page.server.js, server.js สามารถดัก POST, PATCH, PUT และ DELETE ได้ 


## Error 
load() ที่อยู่ใน +page.js ถ้าพบปัญหาให้ใช้การ throw error ออกมา

    import { error } from '@sveltejs/kit';
    export function load() {
        ...
        throw error(400, 'not found');
    }

## Redirect ก็ใช้การ throw เหมือน error
    import { redirect } from '@sveltejs/kit';
    export function load() {
    throw redirect(307, '/login');
    }

