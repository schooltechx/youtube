# SvelteKit Web API

[![IMAGE ALT TEXT](https://img.youtube.com/vi/pGsCDl4GJJU/0.jpg)](https://www.youtube.com/watch?v=pGsCDl4GJJU&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=11 "SvelteKit Full Stack Part-3-แนะนำการสร้าง Web API ")

SvelteKit รองรับการทำ Single Page Application(SPA) และ Multiple Page Application 
การทำ SPA สามารถส่งข้อมูลกลับไปที่ Backend ผ่าน WEB API ซึ่งเป็นที่นิยมกันในปัจจุบัน นอกจาก Web App แล้ว ก็สามารถทำเป็น Backend ให้ Mobile App ก็ได้ 
วีดีโอจะสอนการใช้งานเบื้องต้น ยังไม่ได้ใช้กับฐานข้อมูลจริง 

## Command
``` sh
npm create svelte@latest demo-api
```
## File
เวลาติดตั้งให้สร้างโปรเจ็ก SvelteKit แล้วแค่ก็อปปี้ src/routes/actions ไปใส่ในโปรเจ็กก็จะใช้งานได้เลย
- src/routes/api/user/+server.js
- src/routes/api/user/user.js
- src/routes/api/user/[id]/+server.js

## Note

- ตัวอย่าง Cache API 1 ชั่วโมง (TypeScript)
``` js
  const responseInit : ResponseInit =
    {
        headers : 
            {
                'cache-control' : 'public, max-age=3600'
            }
    }
    return new Response(JSON.stringify(responseObject),responseInit);
```