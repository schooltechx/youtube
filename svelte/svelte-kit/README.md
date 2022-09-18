# [SvelteKit](https://kit.svelte.dev/)
SvelteKit ใกล้ออกเวอร์ชั่นจริงแล้ว มีการเปลี่ยนแปลงมากพอสมควร โดยเฉพาะการ routing การ load(), Rest API, Form Actions แต่ก็ทำให้ใช้งานง่าย และชัดเจนขึ้นกว่าเวอร์ชั่นก่อนหน้ามาก เอกสารนี้จะทำเพื่อแสดงวิธีใช้ SvelteKit เบื้องต้นจนทำงานได้ครบทุกส่วนแบบ Full Stack Developer ครอบคลุมการใช้งานหลักๆที่จำเป็น เอกสารกำลังอัปเดตตลอดเวลา โค้ด เอกสารการสอน วีดีโอ ของ SvelteKit ก่อนหน้าทั้งหมดจำเป็นต้องเปลี่ยนแปลงใหม่หมด ส่วน Svelte (ไม่มี Kit) ใช้งานได้เหมือนเดิมไม่ต้องเปลี่ยน

## อ่านเพิ่มเติม

SvelteKit มี Break Change ช่วงก่อนหน้านี้ค่อนข้างเยอะเพราะจะทำให้ทันออกเวอร์ชั้น 1.0 ตอนนี้เป็นรุ่น RC แล้วการเปลี่ยนแปลงจะน้อยลงเน้นการแก้บัก

- [Major Svelte Kit API Change - Fixing `load`, and tightening up SvelteKit's design before 1.0](https://youtu.be/OUGn7VifUCg)
- [Migration guide](https://github.com/sveltejs/kit/discussions/5774?fbclid=IwAR0WN2uJxcNGaugWCsSkyFw0cUzrgOgVkPz1jFhry_YjTaF3WNSw-_uOrSw)

## SvelteKit Fullstack

Play List สอนการใช้งานตั้งแต่เบื้องต้นจนเป็นนักพัฒนาแบบ Full Stack 

[![IMAGE ALT TEXT](http://img.youtube.com/vi/P5aJrzlK3ZM/0.jpg)](https://www.youtube.com/watch?v=0KENjveIbt0&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=8 "SvelteKit Full Stack Part0 - Intro")


# Setup

ก่อนทำตามในวีดีโอสอนควรติดตั้ง Visual Studio Code และ Extension ที่เกี่ยวข้องจะได้ทำได้เหมือนในวีดีโอ ให้ติดตั้ง node.js เป็นรุ่นล่าสุด (LTS) ด้วย เนื่องจาก SveltKit มีอัปเตดอยู่ให้พยายามอัปเดตเป็นรุ่นล่าสุดด้วย

## VS Code Extensions

- Svelte for VS Code
- Vite by Anthony Fu
- Prettier - Code formatter
- Thunder Client
- vscode-icons

## คำสั่งอัปเดตและติดตั้ง module ต่างๆ

ในวีดีโอสอนจะใช้ SvelteKit 

- พื้นฐานและการใช้ [Route](https://kit.svelte.dev/docs/routing) 
ดูโค้ดใน [sveltekit-fullstack/src/route](sveltekit-fullstack/src/routes)
- ใช้ [Carbon Components Svelte](https://carbon-components-svelte.onrender.com/) เพื่อทำ UI
ดูโค้ดใน [+layout.svelte](sveltekit-fullstack/src/routes)
- ใช้ [Prisma](https://www.prisma.io/docs/getting-started/quickstart) เพื่อติดต่อฐานข้อมูล SQLite 
ดูโค้ดใน [route/user](sveltekit-fullstack/src/routes/user) 
- ใช้ mongoose ต่อฐานข้อมูล mongodb ให้  
ดูโค้ดใน [route/mongodb](sveltekit-fullstack/src/routes/mongodb) 
- ใช้ [Form Actions](https://kit.svelte.dev/docs/form-actions) เพื่อรับข้อมูลจากฟอร์มผ่าน POST ซึ่งต่างไปจากเดิม
ดูโค้ดใน [route/actions](sveltekit-fullstack/src/routes/actions)

รายการคำสั่งที่ใช้ติดตั้ง ทำตามนี้ครับ อาจจะมีบางขั้นตอนต้องทำก่อนใน VS Code ศึกษาจากในวีดีโอด้วยครับ

    # อัปเดต npm รุ่นล่าสุด
    npm install npm@latest -g
    # สร้างโปรเจ็ก sveltekit
    npm create svelte@latest sveltekit-fullstack
    cd sveltekit-fullstack
    npm install
    # ติดตั้ง Carbon Components Svelte
    npm i -D carbon-components-svelte
    # ติดตั้ง Prisma, ใช้ฐานข้อมูลเป็น sqlite
    npm install prisma --save-dev 
    npx prisma init --datasource-provider sqlite
    # แก้ไฟล์ prisma/schema.prisma ก่อนทำ migrate
    npx prisma migrate dev --name init
    # โปรแกรมสำหรับป้อนข้อมูลลงในฐานข้อมูล
    npx prisma studio
    # ติดตั้ง mongoose เพื่อต่อ ฐานข้อมูล mongodb (ดู )
    npm install mongoose
    เรียกใช้ mongo (ดู sveltekit-fullstack/docker-compose.yml)
    docker-compose up -d mongo

# อธิบายการทำงาน

## Folder base routing

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


## อ่านเพิ่มเติม
[เข้าใจฐานข้อมูลแบบต่างๆ](https://www.youtube.com/watch?v=W2Z7fbCLSTw)
