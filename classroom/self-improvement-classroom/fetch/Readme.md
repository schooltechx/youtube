# WEB API
การใช้งานเวปแบบพื้นฐานไคลเอ็นต์จะเชื่อมต่อเซิร์ฟเวอร์ เพื่อใช้ส่งค่า(Request) แล้วได้ข้อมูลกลับมา(Respose) แล้วก็ตัดการเชื่อมต่อ ปกติจะไม่รู้เลยว่า Request ครั้งต่อไปจะเป็นไคลเอ็นต์เดิมหรือเปล่า บางทีเรียกว่าเป็นแบบ stateless จะต้องใช้  Cookie หรือวิธีการอื่นๆ ช่วยเพื่อให้รู้ว่าไคลเอ็นที่เข้ามาเป็นใคร แต่เดิมเซิร์ฟเวอร์ทำการสร้าง(Render)ทั้งหน้าเวปแล้วส่งกลับมาที่ไคลเอ็นต์ ปัจจุบันมีการเขียนเวปแบบ Single Page Application(SPA) แทนที่จะส่งทั้งหน้าเวป ก็จะส่งเฉพาะข้อมูลกลับมา(ใช้ Bandwidth น้อยกว่า) ผ่าน Web API โดยใช้โปรโตคอล HTTP ดั้งเดิม มีการกำหนดรูปแบบการส่งข้อมูลโดยใช้ 
fetch ซึ่งเป็นฟังก์ชันพื้นฐานที่อยู่บน Browser เพื่อ Request ไปที่เซิร์ฟเวอร์ โดยใช้ method (POST,GET,PUT,DELETE) ช่วยกำหนดวิธีการทำงาน

## CRUD
พื้นฐานการทำงานกับข้อมูลคือ สร้าง อ่าน เขียน ลบ ฝั่งเซิร์ฟเวอร์รับคำขอจากไคลเอ็น เมื่อทำขบวนการเสร็จแล้วจะส่ง status กลับมาถ้าสำเร็จจะได้ค่า 2xx ถ้าไม่สำเร็จจะส่งค่า 4xx หรือ 5xx ตัวอย่าง 
[Web API](https://www.moesif.com/blog/technical/api-design/Which-HTTP-Status-Code-To-Use-For-Every-CRUD-App/) ทำการ request/respose ดังนี้
- Create (POST) ส่งข้อมูลการสร้างไปด้วย ตอบกลับเป็น 201 Created
- Read (GET) ตอบกลับเป็น 200 OK 
- Update (PUT)  ส่งข้อมูลที่จะอัปเดตไปและตอบกลับเป็น 204 No Content
- Delete (DELETE) ตอบกลับเป็น 204 No Content
ข้อมูลที่ส่งไปและรับกลับมาจะอยู่ในส่วนของ body
เนื่องจากเป็นข้อตกลงข้อผู้ส่งและรับ บาง API อาจจะส่งค่าแตกต่างกันออกไป ให้ดูเอกสารประกอบการใช้งานด้วย

แนะนำให้ดูวีดีโอนี้ "Full Stack Dev: เข้าใจการทำงาน Web API" (แค่วีดีโอเดียว)

[![IMAGE ALT TEXT](https://img.youtube.com/vi/c49Y5VKKW34/0.jpg)](https://www.youtube.com/watch?v=c49Y5VKKW34&list=PLWMbTFbTi55ODjx2GXM_PCEh5sMgEo8nq "Full Stack Dev: เข้าใจการทำงาน Web API")

## Svelte Client
ตัวอย่างการใช้ [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 
ในการดึงข้อมูลจากเวปด้วย svelte ให้สร้างโปรเจ็ก Svelte แล้วแก้ App.svelte ตามตัวอย่างด้านล่าง
- [ตัวอย่าง](./load-users.svelte) ดึงข้อมูลจาก JsonPlaceholder  
- [ตัวอย่าง](./load-pokemon.svelte) ดึงข้อมูลจาก pokeapi

Note: ไฟล์ app.css แก้ text-align เป็น left จะได้ชิดด้านซ้าย

## Exercise CRUD
  ก่อนทำงานนี้จำเป็นต้องทำการบ้านแสดง [รายชื่อผลไม้](../fruit-list/) ให้เรียบร้อยก่อน มาทำงาน Frontend สำหรับ CRUD ตัวอย่างการใช้งาน fetch() ดูที่ไฟล์ [fetch.js](./fetch.js)
- ให้ตั้ง [json-server](https://github.com/typicode/json-server) ตามในวีดีโอข้างต้น ใช้ db.json ตามตัวอย่างในเวป
- ทดสอบ CRUD ผ่าน Thunder Client หรือ Postman เพื่อให้เข้าใจการทำงาน  
- สร้างโปรเจ็ก Svelte แล้วเอาเนื้อหาจาก [crud_exercise.svelte](./crud_exercise.svelte) หรือ [crud_exercise2.svelte](./crud_exercise2.svelte) (ใช้ group-inputs) ไปใส่ใน App.svelte แล้วเรียนรู้การทำงาน
- ในตัวอย่างสามารถดึงรายการ Posts จาก เซิร์ฟเวอร์ออกมาแสดง กรอกข้อมูลในฟอร์มเพื่อสร้าง(Create)โพสได้ 
- ให้นักเรียนเขียนโค้ดเพื่อ Update และ Delete เพื่อให้โปรแกรมทำงานอย่างสมบูรณ์ 
- ไฟล์ต้นแบบจะมีการใช้ Svelte onMount, Arow Function, group-inputs ลองอ่านเอกสารใน Comment เพิ่มเติมด้วย
- งานมีการเรียนรู้หลายเรื่อง ด้วยเวลาจำกัดผมจะไม่สอนโดยละเอียด ถ้าไม่เข้าใจตรงไหนให้สอบถามเป็นเรื่องไปครับ
- การส่งงานให้นำไฟล์ App.svelte มาส่ง

### การศึกษาเพิ่มเติม
ทำการศึกษาเพิ่มเติม เพื่อทำให้เข้าใจการพัฒนา Frontend มากยิ่งขึ้น
- ให้ลองดัดแปลงข้อมูลเพิ่มเติม สร้างฟอร์มที่เหมาะสม ทำเป็นโปรแกรมแบบต่างๆดู ปรับแต่งให้สวยงามเช่นใช้ SvelteStrap, [Carbon Component Svelte](https://carbon-components-svelte.onrender.com/)  
- ลองทำเป็น[หลายๆหน้า](https://youtu.be/EPf7Ptwgvu8) 
- ลองหา API จากที่อื่นๆ มาฝึกใช้งาน

## Exercise Todo List 
ให้นำโค้ด [todo-list.svelte](./todo-list.svelte) ไปใช้ใน App.svelte หลังจากนั้นแปลงให้สามารถใช้กับ json-server ได้ จะใช้วิธีการเดียวกับแบบฝึกหัด CRUD ควรทบทวนให้เข้าใจก่อนมาทำแบบฝึกหัดนี้ คำแนะนำในการทำ การส่งงานให้นำไฟล์ App.svelte มาส่ง
- เพิ่มอาเรย์ todos ใน db.json เพิ่ม id ให้ด้วย  "todos": [{"text": "fsdafdsaf", "status": true,"id": 1}]
- สร้าง ฟังก์ชัน load() เพื่อเซ็ตค่า todoList เรียกด้วย onMount(load) ผลที่ได้ควรมีหนึ่งรายการมาแสดง
- แก้ addToList ให้เป็น async และเรียก fetch ด้วย method POST ผลที่ได้ควรจะเพิ่มรายการได้
- แก้ removeFromList ให้เป็น async แทนที่จะส่งอาเรย์ index เข้ามากก็ส่ง item.id และเรียก fetch ด้วย method DELETE 
 ผลที่ได้ควรจะลบรายการได้
- เพิ่ม on:click ให้กับ checkbox ส่งออปเจ็ก item เข้ามาในฟังก์ชั่นเลยจะได้ข้อมูลเพียงพอในการใช้ PUT เพื่ออัปเดต เราสามารถสลับค่า status โดยการใส่ not เช่น !item.status
