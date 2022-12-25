# SvelteKit Fullstck Developer 

Dear English developer. The [basic routing](https://kit.svelte.dev/docs/routing) can be read from oficial document. Thai developer please check video below (นักพัฒนาคนไทยให้ดูวีดีโอด้านล่าง). 


## Setup Sveltekit and carbon component svelte
``` sh
    # Create Sveltekit Project
    npm create svelte@latest sveltekit-fullstack
    cd sveltekit-fullstack
    npm install
    # install Carbon Components Svelte
    npm i -D carbon-components-svelte
```

## [Basic Routing](https://kit.svelte.dev/docs/introduction)

The Sample source code. Click link to see code.
- [Backend Processing,load()](src/routes/%2Bpage.server.js) : 
How to use: url.searchParams, send data to frontend (+page.svelte), Private variable. Please check .env file.
- [Frontend Processing](src/routes/%2Bpage.svelte) : 
How to use: Read data from Backend, Read Public variable. Please check .env file. The prefix PUBLIC_ use for public variable.
- [Layout](src/routes/%2Blayout.svelte):
Apply layout to all page. The sample use carbon component
- [Error Page](src/routes/%2Berror.svelte) : 
Create custom error page use $page.
- [Client side processing(prerender)](src/routes/about/) : 
How to use: load() , params, pathname,routeId
- $lib (.sveltekit/tsconfig.json) : 
config this file to support  
- [$lib/asset/logo.png](src/lib/asset/logo.png) : 
use logo in about/+page.svelte
- [$lib/Nav.svelte](src/lib/Nav.svelte) : 
Share component in +layut.svelte
- .env : 
file for environment variable

## Form Actions
copy sample code folder [actions ](src/routes/actions/) to src/routes. 
Form Action is basic send data to backend by POST method, no javascript required.

## Database

Click link below link. You don't need +layout.svelte, +error.svelte to run this sample. Just copy all content in folder and follow Readme.me
- [SQLite with Prisma](src/routes/actions-prisma/)

## Web API
Check this [page](src/routes/api/)

# Sveltekit สำหรับ นักพัฒนาสาย Full Stack

SvelteKit ออกเวอร์ชั่น 1.0 แล้ว จำเป็นใช้ Node 16.14+.สามารถเรียนรู้การก้าวสู่นักพัฒนาสาย Full Stack โดยใช้ SvelteKit ได้จากวีดีโอนี้ครับ

[![IMAGE ALT TEXT](https://img.youtube.com/vi/P5aJrzlK3ZM/0.jpg)](https://www.youtube.com/watch?v=0KENjveIbt0&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=8 "SvelteKit Full Stack Part0 - Intro")


## ตัวอย่างโค้ดสำหรับการใช้งานพื้นฐาน

- [ส่วนการประมวลผลฝั้ง Backend การใช้ฟังก์ชั่น load()](src/routes/%2Bpage.server.js) :
แสดงวิธีการใช้ url.searchParams, การส่ง data จาก Backend มาที่ frontend (+page.svelte), ตัวแปรแบบ Private ให้ดูไฟล์ .env ประกอบ.
- [Frontend Processing](src/routes/%2Bpage.svelte) : 
แสดงวิธีการ อ่านข้อมูลจาก Backend, อ่านตัวแปรแวดล้อมแบบ Public. ให้ดูไฟล์ .env ประกอบ. ที่ขึ้นต้นด้วย PUBLIC_ จะเป็นแบบ public นอกนั้นเป็นแบบ private
- [Layout](src/routes/%2Blayout.svelte) : 
แสดงวิธีการใช้ layout เพื่อแสดงผลทุกหน้า. การใช้งาน carbon component
- [Error Page](src/routes/%2Berror.svelte) : 
การทำหน้าแสดง error แบบกำหนดเอง.
- [การทำงานก่อนการเรนเดอร์หน้าเวปฝั่ง client](src/routes/about/) : 
แสดงวิธีการใช้: load() , params, pathname,routeId
- $lib (.sveltekit/tsconfig.json) : 
config this file to support 
- [$lib/asset/logo.png](src/lib/asset/logo.png) : 
use logo in about/+page.svelte
- [$lib/Nav.svelte](src/lib/Nav.svelte) : 
Share component in +layut.svelte
- .env ไฟล์สำหรับประกาศตัวแปรแวดล้อม

## Web API
อ่านวิธีการใช้งานจาก[หน้านี้](src/routes/api/)

## Form Actions 
Form Action เป็นการส่งข้อมูลจากฟอร์มกลับไปที่ Backend ผ่าน method POST เป็นวิธีแบบดั้งเดิมโดยไม่ต้องใช้ JavaScript แต่จะมีการเปลี่ยนหน้าตอนส่งข้อมูล ดูตัวอย่างการใช้ได้ที่ [Form Actions](src/routes/actions/)

## ตัวอย่างโค้ดสำหรับหัวข้อ Database
การใช้งานฐานข้อมูล ให้อ่านเอกสารตามลิงค์ด้านล่าง 
- [SQLite with Prisma](src/routes/actions-prisma/)

## อธิบายการทำงาน SvelteKit พื้นฐานทั่วไป Folder base routing

[`Routing`](https://kit.svelte.dev/docs/routing). คือการเปลี่ยนหน้าเวป รวมถึง path สำหรับหน้าต่างๆ จะใช้ โครงสร้างของโฟลเดอร์ในการทำ Routing ซึ่งง่ายตรงไปตรงมา ภายในโฟลเดอร์จะมีไฟล์ที่ขึ้นต้นด้วย + สำหรับการประมวลผลเพื่อแสดงหน้านั้น สำหรับชื่อโฟลเดอร์เป็นปีกกา จะเป็นตัวแปร ส่งให้ไฟล์โปรแกรมประมวลผลได้

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


| File                |  โครงสร้างโค้ด                  |
| --------------------|---------------------------------|
| +page.svelte        | หน้าเวปทั่วๆไปทำงานคู่กับ +page.js หรือ +page.server.js 
| +page.js            | ทำงานก่อนเรนเดอร์หน้า แล้วส่งค่าให้ +page.svelte เพื่อเรนเดอร์หน้าต่อไป ทำการเรนเอร์หน้าเวปเช่นใช้ดึงข้อมูลจาก Storage, API 
| +page.server.js     | คล้าย +page.js แต่ทำเซิร์ฟเวอร์เท่านั้น
| +server.js          | เป็น rout สำหรับทำ API
| +layout.svelte      | เป็นโครงหน้าเวปเช่นส่วนหัวหรือเมนู กับส่วนล่างของหน้า 
| +layout.server.js   | รัน load ฝังเซิร์ฟเวอร์ 
| +error.svelte       | แสดงหน้า Error ของตัวเองได้เช่น 404 ก็แสดงว่าหน้านี้ค้นหาไม่พบ ให้ติดต่อ Web master
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


## [Form Action](https://kit.svelte.dev/docs/form-actions)
เป็นการส่งข้อมูลจากฟอร์ม(POST) ไปยัง Backend โดยจะมีฟังก์ชั้นของ actions ทำหน้าที่รับข้อมูล ตัวอย่างโค้ดเป็นดังข้างล่างแนะนำให้ดูในเอกสารด้วย

ตัวอย่างไฟล์ +page.svelte

    <form method="POST">
      <input name="email" type="email">
      <input name="password" type="password">
      <button>Log in</button>
      <button formaction="?/register">Register</button>
    </form>

ตัวอย่างไฟล์ +page.server.js

    export const actions = {
      login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        // ถึงข้อมูลจากฐานข้อมูลตรวจสอบรหัสผ่าน
        return { success: true };
      },
      register: async (event) => {
        // TODO โค้ดสำหรับลงทะเบียนยุสเซอร์ในฐานข้อมุล
      }
    };


## POST, PATCH, PUT และ DELETE

หัวข้อนี้เหมาะกับการทำ Web API POST, PUT และ PATCH จะไม่ส่ง data กลับแต่จะส่ง error และ status กลับได้ (ถ้าส่ง error กลับ status จะมีค่า default เป็น 400) ฝั่ง UI ควรดูค่า status ที่กลับมาเป็นหลัก

+page.server.js ไม่สามารถรับค่าจากฟอร์มผ่านฟังก์ชัน POST,PUT,DELETE ได้อีกต่อไปแล้ว ให้ใช้ Form Actions แทน

api/user/+server.js

    /** @type {import('./$types').RequestHandler} */
    export async function GET({}) {
        const users = await prisma.user.findMany()
        return new Response(JSON.stringify(users))    
    }
    /** @type {import('./$types').RequestHandler} */
    export async function POST({request}) {
        let data = await request.json()
        let user
        try{
            user = await prisma.user.create({data})
        }catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                return new Response("",{status:500,statusText:e.message})
              }else{
                return new Response("",{status:500,statusText:'Create user fail'})
              }    
        }
        return new Response(JSON.stringify(user),{status:201,statusText:"Create Success"})
    }

api/user/[id]/+server.js

    /** @type {import('./$types').RequestHandler} */
    export async function GET({ params }) {
        let id = Number(params.id)
        if(!id)
            return new Response("",{status:400,statusText:'Invalid user id, number is required'})
        const user = await prisma.user.findUnique({
            where:{id:id}
        })
        await prisma.$disconnect()
        if(user){
            return new Response(JSON.stringify(user))
        }
        else{
            return new Response("",{status:404,statusText:`User ${id} not found`})
        }
    }
    /** @type {import('./$types').RequestHandler} */
    export async function PUT({ params,request }) {
        let data = await request.json();
        let user
        try{
            user = await prisma.user.update({
                where:{id:Number(params.id)},data
            })
        }catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                return new Response("",{status:500,statusText:e.message})
              }else{
                return new Response("",{status:500,statusText:'Update user fail'})
              }    
        }
        await prisma.$disconnect() 
        return new Response(JSON.stringify(user),{status:200})
    }
    /** @type {import('./$types').RequestHandler} */
    export async function DELETE({ params }) {
        const user = await prisma.user.findUnique({
            where:{id:Number(params.id)}
        })
        if(!user){
            return new Response("",{status:404,statusText:"User not found"})
        }
        await prisma.user.delete ({
            where:{id:Number(params.id)}
        })
        await prisma.$disconnect() 
        return new Response()
    }

ถ้า set-cookie มีหลายตัว ให้ใช้ออปเจ็ก Headers จัดการ

    const headers = new Headers();
    headers.append('set-cookie', a);
    headers.append('set-cookie', b);
    return new Response('blah', { headers });

## Backend component

SvelteKit เพียงแค่เข้าใจการทำงาของ load(),Form Actions และการทำงาน API ของ server.js ก็สามารถใช้ component ในส่วน Backend ได้เหมือนกับ Node.js เลย 

## อ่านเพิ่มเติม
- [เข้าใจฐานข้อมูลแบบต่างๆ(วีดีโอภาษาอังกฤษ)](https://www.youtube.com/watch?v=W2Z7fbCLSTw)
- [SvelteKit PWA Plugin](https://vite-pwa-org.netlify.app/frameworks/sveltekit.html)
- [Offline-first PWA with Svelte & Vite](https://blog.unixfy.net/offline-first-pwa-with-svelte-vite/) 