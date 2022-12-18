# SvelteKit Web API

[![IMAGE ALT TEXT](https://img.youtube.com/vi/pGsCDl4GJJU/0.jpg)](https://www.youtube.com/watch?v=pGsCDl4GJJU&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=11 "SvelteKit Full Stack Part-3-แนะนำการสร้าง Web API ")

SvelteKit รองรับการทำ Single Page Application(SPA) และ Multiple Page Application 
การทำ SPA สามารถส่งข้อมูลกลับไปที่ Backend ผ่าน WEB API ซึ่งเป็นที่นิยมกันในปัจจุบัน นอกจาก Web App แล้ว ก็สามารถทำเป็น Backend ให้ Mobile App ก็ได้ 
วีดีโอจะสอนการใช้งานเบื้องต้น ยังไม่ได้ใช้กับฐานข้อมูลจริง 

## File
เวลาติดตั้งให้สร้างโปรเจ็ก SvelteKit แล้วแค่ก็อปปี้ src/routes/actions ไปใส่ในโปรเจ็กก็จะใช้งานได้เลย
- src/routes/api/user/+server.js
- src/routes/api/user/user.js
- src/routes/api/user/[id]/+server.js

## Note
WEB API ของ SvelteKit เป็นฟีเจอร์หนึ่งที่มีการเปลี่ยนแปลง ตอนนี้ SvelteKit ออก 1.0 เรียบร้อยแล้ว ก็เลยทำวีดีโอสอนการใช้ API ออกมา
