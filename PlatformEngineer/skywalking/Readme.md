# Apache Skywalking

[SkyWalking](https://skywalking.apache.org/) 
เป็นระบบ APM (Application Performance Monitoring) แบบ Opensource. ออกแบบมาเฉพาะสำหรับ Microservice, Cloud Native และ สถาปัตยกรรมแบบคอนเทนเนอร์

มี Agent สำหรับการพัฒนาภาษาต่างๆ Java, .Net Core, PHP, NodeJS, Golang, LUA, Rust, C++, Client JavaScript และ Python

![alt text](topology.png)

![alt text](trace.png)
## SkyWalking 10.x showcase

[skywalking-showcase](https://skywalking.apache.org/docs/skywalking-showcase/next/readme/) เป็น demo แสดงความสามารถของ Skywalking

เป็นตัวอย่างแอปเพลงที่ประกอบไปด้วย microservice สร้างจากหลายตัวจากหลายภาษา และคอมโปเน้นอื่นๆ จะมี load generator เพื่อจำลองกรทำงานตลอดเวลา จะใช้ Skywalking เพื่อดึงค่าต่างๆมาแสดง จะมีการเรียก docker compose หลายรายการกินเนื้อที่ RAM และใช้เวลามาก เรียกแบบน้อยที่สุดดังนี้ (ถ้าไม่กำหนด FEATURE_FAGS มันจะเรียกหลายตัว)

```bash
git clone https://github.com/apache/skywalking-showcase.git
cd skywalking-showcase
make deploy.docker FEATURE_FLAGS=single-node,agent
```
เวอร์ชั้นที่ clone มา ถ้าเรียงมางฟีเจอร์มีปัญหาว่าตัวแปร OTEL_COLLECTOR_VERSION ไม่ได้เซ็ตค่า ตัวแปรน่าจะผิดให้แก้เป็น OTEL_COLLECTOR_IMAGE_TAG ถึงจะใช้ได้
ไปที่ http://localhost:9999 จะดูได้แบบนี้



[![SkyWalking 10.x showcase](https://img.youtube.com/vi/7d1Obv9XTvw/0.jpg)](https://youtu.be/7d1Obv9XTvw?si=p3fmoBXbe3laoIkr "SkyWalking showcase Intro")

## Agent Node.js
ตัวอย่างการโปรแกรมด้วย Web API ด้วย Express.js ติดตั้ง Agent

```
$ npm install --save skywalking-backend-js
```
app.ts
```ts
import agent from "skywalking-backend-js"
agent.start({})
import dotenv from 'dotenv'; 
dotenv.config();
import express from 'express'
const app = express()
const port: number = Number(process.env.PORT) || 80;
app.get('/count/:count', async (req, res, next) => {
    if(req.params.count==="13") throw new Error('Uh oh!');
    res.status(200).send('The API service works fine! '+req.params.count);
});
app.listen(port, () => console.log(`Application is running on port ${port}`))
```
.env
```
PORT=3003
```