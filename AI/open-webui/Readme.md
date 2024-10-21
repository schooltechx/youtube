# Ollama และ Open WebUI

[![Llamafile - Intro](https://img.youtube.com/vi/p5OM3nuf09M/0.jpg)](https://youtu.be/p5OM3nuf09M?si=3qD5CA8zzpB4nRBi "Open WebUI+Ollama ทำ AI ส่วนตัวสำหรับนักพัฒนา")

Ollama เป็นโปรแกรมที่ติดตั้งและใช้ LLMs บนเครื่องของเราเอง ใช้ได้ไม่จำกัด ใช้งานผ่านพิมพ์ข้อความ หรือเรียกผ่าน Web API ได้

Open WebUI เป็นหน้าเวปสำหรับเรียกใช้ Web API อีกทีหนึ่งจะเหมือนใช้งานผ่าน ChatGPT รองรับ Web API ของ Ollama, ChatGPT,  stable diffusion ฯลฯ


## Resource
- [compose.nvidia.yaml](./compose.nvidia.yaml) ไว้ทดสอบ GPU Nvidia บน docker
- [compose.services.yaml](./compose.services.yaml) สำหรับเรียกใช้ ollama กับ open webui แยกกัน
- [compose.yaml](./compose.yaml) สำหรับเรียกใช้ ollama กับ open webui เป็นอิมเมจเดียวกัน
- [rest.http](./rest.http) ติดตั้งส่วนขยายของ VS Code ชื่อ REST Client เพื่อเรียกใช้ Web API เหมือนใช้ Postman


ในวีดีโอใช้  llama 3.2:3b และ codegemma:7b เขียนโค้ดจาก prompt นี้
```
สร้างเกมเดาตัวเลขด้วย Node.js สุ่มเลข 1-10 หนึ่งครั้ง ให้ผู้เล่นเดาเลขนั้นจนกว่าจะถูก ถ้าเดาผิดให้ใบ้ว่ามากกว่าหรือน้อยกว่าเลขที่สุ่ม ถ้าเดาถูกก็จบเกมส์
```
## Generate vs Chat
- Generate: ส่งหนึ่งข้อความเข้าไป แล้วได้คำตอบ
- Chat: ส่งหนึ่งข้อความเข้าไป และข้อความที่คุยก่อนหน้าแล้วได้คำตอบ.

ยกตัวอย่างด้านล่างนี้นี้ถ้าเป็น Generate จะตอบไม่ได้ แต่แบบ Chat จะตอบได้ดีกว่า
```
ถาม : เมืองหลวงของลาวคืออะไร
ตอบ : เวียงจันทร์
ถาม : ของไทยละ
ตอบ : ?
```
