# [SvelteKit](https://kit.svelte.dev/)
Major change! Most tutorials need update.
- [Major Svelte Kit API Change - Fixing `load`, and tightening up SvelteKit's design before 1.0](https://youtu.be/OUGn7VifUCg)
- [Migration guide](https://github.com/sveltejs/kit/discussions/5774?fbclid=IwAR0WN2uJxcNGaugWCsSkyFw0cUzrgOgVkPz1jFhry_YjTaF3WNSw-_uOrSw)

## Topics

Dear english user please check each topic I will try to write in both English and Thai. Sorry I am not native English speaker.

### [Sveltekit Games](games/)
Develop HTML5 Games with Svelte and SvelteKit. I will make basic sample . I have one advance sample with Phaser.

### [Sveltekit Fullstack](sveltekit-fullstack/)
Develop Frontend/Backend application with SvelteKit 
Routing, UI, Database, API, Authentication



## Youtube Playlist (Thai)

SvelteKit ใกล้ออกเวอร์ชั่นจริงแล้ว มีการเปลี่ยนแปลงมากพอสมควร โดยเฉพาะการ routing การ load(), REST API, Form Actions โค้ด,เอกสารการสอน, วีดีโอ ของ SvelteKit ก่อนหน้าทั้งหมดจำเป็นต้องเปลี่ยนแปลงใหม่หมด ส่วน Svelte (ไม่มี Kit) ใช้งานได้เหมือนเดิมไม่ต้องเปลี่ยน อย่าพึ่งย่อท้อ การเปลี่ยนแปลงดีขึ้น ทำให้ใช้งานง่าย และชัดเจนขึ้นกว่าเวอร์ชั่นก่อนหน้ามาก 
SvelteKit แข็งแกร่งพอที่จะพัฒนาเวปแอปได้เทียบเท่ากับเฟรมเวิร์กอื่นๆ แต่พัฒนาได้ง่ายและรวดเร็วกว่า
วีดีโอและเอกสารนี้จะทำเพื่อแสดงวิธีใช้ SvelteKit เบื้องต้นจนเป็น Full Stack Developer ครอบคลุมการใช้งานหลักๆที่จำเป็น 
Youtube Play List สอนการใช้ Svelte และ SvelteKit งานตั้งแต่เบื้องต้น ทำเกมส์ จนเป็นนักพัฒนาแบบ Full Stack เป็นภาษาไทย แนะนำให้ดูข้อความใต้วีดีโอด้วยครับ

[![IMAGE ALT TEXT](http://img.youtube.com/vi/P5aJrzlK3ZM/0.jpg)](https://www.youtube.com/watch?v=0KENjveIbt0&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=8 "SvelteKit Full Stack Part0 - Intro")


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


[Authen.js(NextAuth.js)](https://vercel.com/templates/svelte/sveltekit-authentication)
เป็นของ Next ตอนนี้รองรับ SvelteKit แล้ว รองรับ่หลาย Provider 

[Keycloak](https://www.keycloak.org/docs/latest/securing_apps/) 
รองรับหลาย Provider รองรับหลายภาษา JavaScript(Browser), Node.js ฯลฯ

## UI
- [Konsta UI](https://konstaui.com/)
built with Tailwind CSS With iOS and Material Design components for React, Vue & Svelte
- [Svelte-chartjs](https://github.com/SauravKanchan/svelte-chartjs)
## Misc
- [Free Svelte Accelerators](https://sveltekitstarter.com/) 
โปรเจ็ก OpenSource ต่างๆ