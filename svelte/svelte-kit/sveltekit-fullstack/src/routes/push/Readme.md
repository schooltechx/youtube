# Web Push
  เป็นบริการ Push notification สามารถส่งการแจ้งเตือนให้ client โดยที่ Browser ปิดอยู่ก็ได้ 
ตำแหน่งการแสดงการแจ้งเตือนขึ้นขึ้นกับระบบปฎิบัติการ Push notification เป็นบริการฟรีเซิร์ฟเวอร์สำหรับการส่งข้อความรับผิดชอบโดยผู้ผลิด Browser แต่ละเจ้า แต่การเขียนโปรแกรมเป็นมาตรฐานเหมือนกันหมด เอกสารในเวปค่อนข้างเข้าใจยากหวังว่าตัวอย่างโค้ดและวีดีโอจะทำให้เข้าใจการทำงานมากขึ้น

  ยกระดับให้ส่งแจ้งเตือนได้เหมือน mobile app และมักใช้ในการทำ Progressive Web App (PWA) การทำงานเบื้องหลังจะใช้ Service Worker ช่วย 
การทำงานคล้ายกับ [Web Worker](../web-worker/) แต่จะเฉพาะทางมากกว่า ใช้ใน PWA เป็นหลัก

วีดีโอเป็นต้วอย่างสำหรับการเรียนรู้ จริงๆแล้วค่า endpoint สำหรับการส่ง Nitification ให้แต่ละ client ควรเก็บในฐานข้อมูลของ Backend 

[![IMAGE ALT TEXT](https://img.youtube.com/vi/y_FwlkxtrvA/0.jpg)](https://www.youtube.com/watch?v=y_FwlkxtrvA&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=15 "SvelteKit Full Stack Part-7- Web Push ")

## ติดตั้ง
- สร้างโปรเจ็ก SvelteKit ใช้ JSDoc และติดตั้ง web-push และสร้าง public/private key
```
npm install web-push -g
web-push generate-vapid-keys --json
```
- ให้ก็อปเนื้อหาในโฟลเดอร์ [push](./) (ยกเว้น Readme.md และ static) ไปใส่ใน src/routes/push 
- ให้ก็อปเนื้อหาในโฟลเดอร์ [static](./static) ไปใส่โฟลเดอร์ static ที่อยู่รูตของโปรเจ็ก

## เอกสาร
- https://github.com/web-push-libs/web-push
- https://web.dev/notifications/
- https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/push_event
- https://web.dev/push-notifications-overview/
- https://web.dev/push-notifications-web-push-protocol/

## อื่นๆ
chrome://serviceworker-internals/
