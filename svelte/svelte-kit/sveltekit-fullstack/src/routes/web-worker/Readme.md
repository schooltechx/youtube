# Web Worker
Web Worker เป็นโค้ด JavaScript ที่ทำงานแยก Thread ออกมาจาก Thread ของหน้าเวป สามารทำงานหลายๆอย่างพร้อมกันได้(Multithread) ผู้พัฒนาจึงสามารถออกแบบหน้าเว็บไซต์ให้มีความซับซ้อนมากๆ ได้โดยไม่ต้องกังวลว่า เครื่องพีซีของผู้ใช้จะเกิดการสะดุดขณะที่มีการเลื่อนหน้าหรือเกิดการหน่วง ขณะที่กำลังมีการป้อนข้อมูล เนื่องจากเป็นคนละ thread แยกออกทำให้มันไม่สามารถเข้าถึง DOM ได้

Web Worker ทำงานได้ดีกับทุกweb browser ยกเว้น IE  Internet Explorer ต้องเป็นเวอร์ชั่น 10 ขึ้นไป สำหรับมือถือ ใช้ได้ใน Android 4.4 และ iOS5

ในตัวอย่างใน Svelte และทำแบบ module บน Vite สำหรับ Framework อื่นที่ใช้ Vite ควรใช้ได้ในลักษณะเดียกกัน หรือกลับไปใช้แบบเดียวกับในเอกสารก็ได้
ที่ผมตกไปในวีดีโอจะให้ดีไฟล์ add.worker.js เราทำเป็น module ควรปิดท้ายด้วย
export {}


[![IMAGE ALT TEXT](https://img.youtube.com/vi/yCrFkJKfiqg/0.jpg)](https://www.youtube.com/watch?v=yCrFkJKfiqg&list=PLWMbTFbTi55ODDrafKItIGpJZl8r3XpyT&index=14 "SvelteKit Full Stack Part-6 - Web Worker ")

## ติดตั้ง
ให้ก็อปโฟลเดอร์ [web-worker](./) ไปใส่ใน src/routes ของ SvelteKit ได้เลย

