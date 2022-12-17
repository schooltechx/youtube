# SvelteKit Form Actions

[![IMAGE ALT TEXT](https://img.youtube.com/vi/4tdfzpepxv4/0.jpg)](https://youtu.be/4tdfzpepxv4 "SvelteKit Full Stack Part-4 - Form Actions")

เราสามารถส่งข้อมูลกลับไปที่ Backend ผ่าน HTML  Form เป็นวิธีการแบบดังเดิมซึ่งฟอร์มไม่จำเป็นต้องมี JavaScript ฝั่ง Client เพื่อใช้งาน ก็เป็นข้อดีอย่างหนึ่งแต่ต้องใช้การเปลี่ยนหน้าทำให้ต้องเห็นการโหลดหน้าเล็กน้อย ใน SvelteKit ทำให้การใช้งานง่ายขึ้นมาก ด้วย Form Actions การส่งข้อมูลผ่านฟอร์มจะใช้ POST เท่านั้น และจะใช้ Action เป้นฟังก์ชั่นในการจัดการงานแบบต่างๆ ในวีดีโอจะใช้ตัวอย่างในเอกสารมาดัดแปลงให้เข้าง่ายยิ่งขึ้น จะไม่ได้ใช้ฐานข้อมูลในวีดีโอนี้ ในวีดีโอยังขาดหัวข้อ Progressive enhancement  ทำให้ฟอร์มไม่ต้องโหลดหน้าใหม่เพราะใช้ JavaScript ช่วยกรณีที่ไคลเอ็นไม่สามารถใช้ JavaScript ได้ก็จะกลับไปใช้แบบเดิม แนะนำให้ไปลองดูในเอกสารจะทำการใช้งานฟอร์มดูดีขึ้นไม่ต้องรีโหลดหน้า
วีดีโอจะดัดแปลงโค้ดจาก[เอกสารของ Form Actions](https://kit.svelte.dev/docs/form-actions)
SvelteKit ทำให้ง่ายและอ่านเข้าใจ

## File
เวลาติดตั้งให้สร้างโปรเจ็ก SvelteKit แล้วแค่ก็อปปี้ src/routes/actions ไปใส่ในโปรเจ็กก็จะใช้งานได้เลย
- src/routes/actions/+page.server.js
- src/routes/actions/+page.svelte

## Note
Form Actions เป็นฟีเจอร์หนึ่งที่มีการเปลี่ยนแปลง ทำให้ต้องทำวีดีโอใหม่ ตัวอย่างทดสอบบน SvelteKit 1.0 เรียบร้อยแล้ว
