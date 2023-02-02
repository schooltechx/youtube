# [SvelteKit](https://kit.svelte.dev/)
Version 1.0 is out!
## Topics

Dear english user please check each topic I will try to write in both English and Thai. Sorry I am not native English speaker.

### [Sveltekit Games](games/)
Develop HTML5 Games with Svelte and SvelteKit. I will make basic sample . I have one advance sample with Phaser.

### [Sveltekit Fullstack](sveltekit-fullstack/)
Develop Frontend/Backend application with SvelteKit 
Routing, UI, Database, API, Authentication



## Youtube Playlist (Thai)

SvelteKit ออกเวอร์ชั่นจริงแล้ว ดีพอที่จะพัฒนาเวปแอปได้เทียบเท่ากับเฟรมเวิร์กอื่นๆ แต่พัฒนาได้ง่ายและรวดเร็วกว่า
วีดีโอและเอกสารนี้จะทำเพื่อแสดงวิธีใช้ SvelteKit เบื้องต้นจนเป็น Full Stack Developer ครอบคลุมการใช้งานหลักๆที่จำเป็น หน้าแรกของ Svelte เองก็เปลี่ยนวิธีการสร้างโปรเจ็กเป็นแบบเดียวกับ SvelteKit แล้ว
เท่ากับว่าให้เปลี่ยนไปใช้ SvelteKit เป็นหลักตอน Build เลือกได้ว่าจะสร้างเป็น Frontend อย่างเดียว หรือมี backend
Youtube Play List สอนการใช้ Svelte และ SvelteKit งานตั้งแต่เบื้องต้น ทำเกมส์ จนเป็นนักพัฒนาแบบ Full Stack เป็นภาษาไทย แนะนำให้ดูข้อความใต้วีดีโอด้วยครับ

[![IMAGE ALT TEXT](https://img.youtube.com/vi/P5aJrzlK3ZM/0.jpg)](https://www.youtube.com/watch?v=0KENjveIbt0&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=8 "SvelteKit Full Stack Part0 - Intro")


# Setup

ก่อนทำตามในวีดีโอสอนควรติดตั้ง Visual Studio Code และ Extension ที่เกี่ยวข้อง จะได้ทำได้เหมือนในวีดีโอ ให้ติดตั้ง node.js เป็นรุ่นล่าสุด (LTS) ด้วย เนื่องจาก SveltKit มีอัปเตดอยู่ ให้พยายามอัปเดตเป็นรุ่นล่าสุดด้วย

## VS Code Extensions

- Svelte for VS Code
- Vite by Anthony Fu
- Prettier 
- Thunder Client หรือ Postman
- vscode-icons

## คำสั่งอัปเดตและติดตั้ง module ต่างๆ

รายการคำสั่งที่ใช้ติดตั้ง SvelteKit ทำตามนี้ครับ เนื่องจาก SveltKit ยังมีการอัปเดตอยู่ ควรมีการอัปเดตอยู่เสมอ ในแต่ละตัวอย่างจะมีการติดตั้ง module เพิ่มเติม อาจจะมีบางขั้นตอนต้องทำก่อนใน VS Code ศึกษาจากในวีดีโอ 

    # อัปเดต npm รุ่นล่าสุด
    npm install npm@latest -g
    # สร้างโปรเจ็ก sveltekit
    npm create svelte@latest sveltekit-fullstack
    cd sveltekit-fullstack
    npm install
    # อัปเดต SvelteKit ในโปรเจ็กที่ทำแล้ว
    npm update


## Authentication

- [Lucia](https://lucia-auth.vercel.app/sveltekit/start-here/getting-started)
จัดการยูสเซอร์กับ Session ฐานข้อมูลใช้ Prisma Mongoose ฯลฯ
- Pocketbase(https://pocketbase.io/)
คล้าย Firebase มี Authen ในตัว


- [Authen.js(NextAuth.js)](https://vercel.com/templates/svelte/sveltekit-authentication)
เป็นของ Next ตอนนี้รองรับ SvelteKit แล้ว รองรับ่หลาย Provider 

- [Keycloak](https://www.keycloak.org/docs/latest/securing_apps/) 
รองรับหลาย Provider รองรับหลายภาษา JavaScript(Browser), Node.js ฯลฯ

## UI
- [Konsta UI](https://konstaui.com/)
built with Tailwind CSS With iOS and Material Design components for React, Vue & Svelte
- [Svelte-chartjs](https://github.com/SauravKanchan/svelte-chartjs)

## Database
ในรายการนี้ใช้งาน Commercial ได้ฟรี มีบริการ Cloud ที่เสียเงิน
- [Prisma](https://www.prisma.io/) ใช้งานได้ดีมาก ใช้การเขียน Schema ในไฟล์ schema.prisma แล้วสั่ง migrate เพื่อสร้างโค้ด
- [TypeORM](https://typeorm.io/) ดูน่าสนใจ [Tutorial](https://www.youtube.com/watch?v=JaTbzPcyiOE) น่าจะใช้ไม่ยาก จากที่ทดสอบมีปัญหากับ "reflect-metadata" ปัญหาคือ [ESBuild/vite](https://stackoverflow.com/questions/68570519/why-cant-reflect-metadata-be-used-in-vite) ไม่รองรับ experimentalDecorators ใน TypeScript

-[MikroORM](https://mikro-orm.io/) คนใช้ยังน้อยแต่เขาว่าเป็นคู่แข่งกับ TypeORM น่าจะใช้กับ SvelteKit ได้ มี  
[ตัวอย่างวิธีการใช้](https://trenta3.gitlab.io/note:using-mikroorm-with-sveltekit/) กับSveltekit รุ่น Beta ต้องแก้นิดหน่อยให้ใช้ได้


## Tutorial
- [Learn SvelteKit from Join of Code](https://www.youtube.com/playlist?list=PLA9WiRZ-IS_zfHpxmztJQLeBISsQkh9-M)
- [From Level UP Tutorial](https://levelup.video/tutorials/sveltekit)
- [SvelteKit Tutorial for beginer](https://www.youtube.com/playlist?list=PLm_Qt4aKpfKjf77S8UD79Ockhwp_699Ms)


## Misc
- [Free Svelte Accelerators](https://sveltekitstarter.com/) 
โปรเจ็ก OpenSource ต่างๆ

