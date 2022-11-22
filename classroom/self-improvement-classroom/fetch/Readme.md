# WEB API
การใช้งานเวปแบบพื้นฐานไคลเอ็นต์จะเชื่อมต่อเซิร์ฟเวอร์ เพื่อใช้ส่งค่า(Request) แล้วได้ข้อมูลกลับมา(Respose) แล้วก็ตัดการเชื่อมต่อ ปกติจำไม่รู้เลยว่า Request ครั้งต่อไปจะเป็นไคลเอ็นต์เดิมหรือเปล่า บางทีเรียกว่าเป็นแบบ stateless จะต้องใช้  Cookie หรือวิธีการอื่นๆ ช่วยเพื่อให้รู้ว่าไคลเอ็นที่เข้ามาเป็นใคร แต่เดิมเซิร์ฟเวอร์ทำการสร้าง(Render)ทั้งหน้าเวปแล้วส่งกลับมาที่ไคลเอ็นต์ ปัจจุบันมีการเขียนเวปแบบ Single Page Application(SPA) แทนที่จะส่งทั้งหน้าเวป ก็จะส่งเฉพาะข้อมูลกลับมา(ใช้ Bandwidth น้อยกว่า) ผ่าน Web API โดยใช้โปรโตคอล HTTP ดั้งเดิมกำหนดรูปแบบการส่งข้อมูลโดยใช้ 
fetch ซึ่งเป็นฟังก์ชันพื้นฐานที่อยู่บน Browser เพื่อ Request ไปที่เซิร์ฟเวอร์ โดยใช้ method (POST,GET,PUT,DELETE) ช่วยกำหนดวิธีการทำงาน

## CRUD
พื้นฐานการทำงานกับข้อมูลคือ สร้าง อ่าน เขียน ลบ ฝั่งเซิร์ฟเวอร์รับคำขอจากไคลเอ็น เมื่อทำขบวนการเสร็จแล้วจะส่ง status กลับมาถ้าสำเร็จจะได้ค่า 2xx ถ้าไม่สำเร็จจะส่งค่า 4xxx หรือ 5xx ตัวอย่าง 
[Web API](https://www.moesif.com/blog/technical/api-design/Which-HTTP-Status-Code-To-Use-For-Every-CRUD-App/) ทำการ request/respose ดังนี้
- Create (POST) ส่งข้อมูลการสร้างไปด้วย ตอบกลับเป็น 201 Created
- Read (GET) ตอบกลับเป็น 200 OK 
- Update (PUT)  ส่งข้อมูลที่จะอัปเดตไปและตอบกลับเป็น 204 No Content
- Delete (DELETE) ตอบกลับเป็น 204 No Content
ข้อมูลที่ส่งไปและรับกลับมาจะอยู่ในส่วนของ body
เนื่องจากเป็นข้อตกลงข้อผู้ส่งและรับ บาง API อาจจะส่งค่าแตกต่างกันออกไป ให้ดูเอกสารประกอบการใช้งานด้วย

แนะนำให้ดูวีดีโอนี้

[![IMAGE ALT TEXT](http://img.youtube.com/vi/c49Y5VKKW34/0.jpg)](https://www.youtube.com/watch?v=c49Y5VKKW34&list=PLWMbTFbTi55ODjx2GXM_PCEh5sMgEo8nq "Full Stack Dev: เข้าใจการทำงาน Web API")

## Svelte Client
ตัวอย่างการใช้ [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 
ในการดึงข้อมูลจากเวปด้วย svelte ให้สร้างโปรเจ็ก Svelte แล้วแก้ App.svelte ตามตัวอย่างด้านล่าง
- [ตัวอย่าง](./load-users.svelte) ดึงข้อมูลจาก JsonPlaceholder  
- [ตัวอย่าง](./load-pokemon.svelte) ดึงข้อมูลจาก pokeapi
Note: ไฟล์ app.css แก้ text-align เป็น left จะได้ชิดด้านซ้าย

## Svelte Exercise
ทำ Frontend สำหรับ CRUD ตัวอย่างการใช้งานดู [fetch.js](./fetch.js)
- ให้ตั้ง [json-server](https://github.com/typicode/json-server) ตามในวีดีโอข้างต้น ใช้ db.json ตามตัวอย่างในเวป
- ทดสอบ CRUD ผ่าน Thunder Client หรือ Postman เพื่อให้เข้าใจการทำงาน  
- สร้างโปรเจ็ก Svelte แล้วเอาเนื้อหาจาก [crue_exercise.svelte](./crud_exercise.svelte) ไปใส่ใน App.svelte 
- ในตัวอย่าสามารถดึงรายการ Post จาก เซิร์ฟเวอร์ออกมาแสดง กรอกข้อมูลในฟอร์มเพื่อสร้างโพสได้ 
- ปุ่ม x จะแสดงข้อความว่าจะลบ Post ตัวนี้ให้เขียนโปรแกรมเพื่อทำการลบแล้วอัปเดตรายการ Post ที่คงเหลือ
- เมื่อคลิ้กที่ด้านหน้ารายการ Post จะเป็นการเลือกโพสซึ่งจะอัปเดตข้อมูลในฟอร์มด้วย สามารถเลือก Create หรือ ๊Update ได้ ให้ทำฟังก์ชั่นการอัปเดตให้สมบูรณ์
