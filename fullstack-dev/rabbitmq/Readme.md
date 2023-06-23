# RabbitMQ

ใช้เพื่อรับและส่งข้อความระหว่างโปรแกรม  (message broker) เหมือนเป็นที่ทำการไปรษณีย์ที่ ผู้ส่ง(Producer) ส่งจดหมายไปที่ทำการไปรษณีย์(Exchange) ไปให้ผู้รับ(Consumer)

- ส่งเป็นแบบ asynchronous ทำให้ไม่ต้องรอส่งข้อความสำเร็จ ไปทำอย่างอื่นต่อได้เลยเหมาะกับงานที่ไม่ต้องรอผลเสร็จทันที 

- ผู้รับสามารถมีหลายคนแบ่งงานจากคิว ไปทำได้ รับรวดเดียวหมดหรือ จะค่อยๆทะยอยทำเสร็จแล้วค่อยรับงานต่อไปก็ได้ 

- เหมาะกับรูปแบบ Microservice  แต่ละ service ไม่ผูกพันหรือขึ้นแก่กันมากจนเกินไป ทำการ broadcast โดยไม่ต้องรู้จักผู้รับก็ได้

- มีความทนทานต่อการสูญหายข้อมูล เช่นข้อความอยู่ในคิวแล้ว RabbitMQ หรือ ผู้รับข้อความ crash ไปก่อนที่จะยืนยันว่าได้รับข้อมูล เมื่อระบบกลับมาทำงานใหม่ ก็สามารถรับข้อความที่ยังทำไม่สำเร็จมาทำได้อีกครั้ง มักพบกับจุดที่เชื่อมต่อกับภายนอกที่ควบคุมไม่ได้ อาจจะหยุดทำงานแบบคาดเดาไม่ได้ เช่นส่งเมลล์ หรือ External API ใน ถ้าทำไม่สำเร็จก็ทำซ้ำได้

- รองรับ cluster กินหน่วยความจำน้อย ทำให้ระบบ scale up แบบรวดเร็วได้ง่าย เพื่อรองรับงานจำนวนมากได้ทันที service อื่นที่ไม่สามารถรับโหลดได้มากก็ค่อยๆทะยอยส่งงานให้ทำ 

- รองรับหลายภาษา ส่งข้อมูลข้าม Platform ได้ ยังมี Plugin เพื่อรองรับโปรโตคอลต่างๆได้

- แนะนำให้ลอง ติดตั้ง RabbitMQ ในเอกสารย่อย Install และรันโค้ดตัวอย่างบน Node.js หรือ .NET เพื่อให้เข้าใจการทำงาน ในตัวอย่างหลักจะใช้เป็น Node.js เพื่อให้เข้าใจได้ง่าย

## Install
ติดตั้ง RabbitMQ ด้วย docker compose

```yaml
version: "3.2"
services:
  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: 'rabbitmq'
    environment:
      - RABBITMQ_DEFAULT_USER=frappet
      - RABBITMQ_DEFAULT_PASS=Password
    ports:
        - 5672:5672
        - 15672:15672 # UI
    volumes:
        - ./data/:/var/lib/rabbitmq/
```
## ส่วนประกอบต่างๆ 

![Basic Diagram](./images/basic-diagram.png)

### Connection

เป็นช่องการสื่อสารกับ RabbitMQ ใช้ connect() สามารถต่อได้หลาย Channel ใช้ connection.createChannel()

### Producer

โพรดิวเซอร์มีหน้าที่ สร้างข้อความแล้วส่งไปที่ Exchange การส่งข้อมูลไม่ระบุ Exchange จะเป็น Default(nameless) Exchange

### Consumer

คอนซูมเมอร์รับข้อความ เมื่อมีการ acknowledgement(ack) แล้วข้อความนั้นจะถูกเอาออกจาก queue สามารถมีได้หลายคอนซูมเมอร์ในหนึ่งคิว เพื่อแบ่งโหลดได้(แย่งกันทำงาน) เพื่อไม่ให้รับโหลดงานมากเกินไป จะใช้ manual acknowledgement และจำกัดข้อความที่รับได้ด้วย Quality Of Service(Qos) ควรมี Consumer ที่สามารถทำงานได้ทันก่อนที่คิวจะยาวเกินไปจนทรัพยากรณ์ไม่เพียงพอ 

### Queue

[![RabbitMQ Basic](https://img.youtube.com/vi/2vcApGyfiVs/0.jpg)](https://youtu.be/2vcApGyfiVs "RabbitMQ เบื้องต้น")


คิว(queue)เป็นลักษณะการทำงานแบบเข้าก่อนออกก่อน ต้องผูกกับ Exchange เสมอ สร้างคิวด้วย channel.assertQueue() ถ้าไม่มีการตั้งค่าจะแจกงานออกให้เร็วที่สุด ปกติการแจกงานเป็น round robin ในบางครั้ง Consumer อาจจะทำงานไม่เสร็จพร้อมกันทำให้รับโหลดงานไม่สมดุล สามารถเซ็ต QOS เพื่อให้ทำงานแบบ Fair Dispatch ได้ในตัวอย่างใช้
```
channel.prefetch(1)
```
###Exchange 

Default(nameless) Exchange มีอยู่แล้วไม่ต้องสร้าง ส่งข้อความก็ระบุชื่อคิวได้เลยไม่ต้องระบุ Exchange
channel.sendToQueue(queue_name,Buffer.from(message),opt)
Exchange แบบอื่นๆต้องสร้างด้วยคำสั่ง 
```js
channel.assertExchange(exchange_name, exchange_type, opt)
```
ถ้าไม่ใช่แบบเป็นคิวจะมีรูปแบบการส่ง Public/Subscribe ตัวโพรดิวเซอร์คุยกับ Exchange โดยที่ไม่รู้จักชื่อคิว จะใช้คำสั่งนี้เพื่อส่ง
```js
channel.publish(exchange, routingKey, Buffer.from(message),opt);
```
การได้รับข้อความอย่างไรขึ้นกับชนิดของ Exchange จะอยู่ในห้วข้อ “รูปแบบ Publish/Subscribe“

### Binding

เชื่อมคิวกับ Exchange โดยใช้ Binding Key เพื่อกรองข้อความที่มี routingKey ตรงกับที่ต้องการ ใช้
```js
channel.bindQueue(queue, exchange, bindingKey)
```

## รูปแบบคิว
ตัวอย่างโค้ดจะใช้ Node.js แบบ ES module
ติดตั้ง amqplib 
```
npm init
npm install amqplib
code .
```
package.json แก้เพื่อให้ใช้แบบ ES module (import แทน require)
```json
{
...
  "type": "module",
...
} 
```

เป็น Default Exchange ใช้คิวชื่อ concurrent-queue โพรดิวเซอร์ producer.js โค้ดจะวนลูปส่งข้อความสิบครั้ง

```js
import { connect } from "amqplib"
const queue = "concurrent-queue"
const connection =  await connect("amqp://oom:Password@localhost")
const channel = await connection.createChannel()
await channel.assertQueue(queue,{durable:true})
for(let i=0;i<10;i++){
    const message = "Hello "+i
    channel.sendToQueue(queue,Buffer.from(message),{persistent: false})
}
await channel.close()
await connection.close()
```

คอนซูมเมอร์ consumer.js จำลองการหน่วงเวลาเหมือนรับโหลดงานไว้ เมื่อทำงานเสร็จถึงจะตอบว่าทำงานเสร็จแล้ว (manual act)

``` js
import { connect } from "amqplib";
const queue = "concurrent-queue"
const connection =  await connect("amqp://frappet:Password@localhost")
const channel = await connection.createChannel();
await channel.assertQueue(queue,{durable:true})
//channel.prefetch(1);
channel.consume(queue,async (msg)=>{
    let processingTime = Math.floor(Math.random() * 8)+1;//1-8 sec
    console.log(`Received: ${msg.content.toString()}`)
    await sleep(processingTime*1000);
    console.log(`done ${msg.content.toString()}`)
    channel.ack(msg)
},{noAck:false}) //manual ack
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```
วิธีการเรียกใช้งาน
``` bash
# Terminal 1(Producer)
node producer.js
# Terminal 2 (Consumer)
node consumer.js
```

## รูปแบบ Publish/Subscribe
ในตัวอย่างก่อนหน้าจะเป็น Exchange ที่ไม่มีชื่อหรือ Default Exchange ส่วนคิวจะมีชื่อ โพรดิวเซอร์ส่งไปที่คิว คอนซูมเวอร์ก็รอรับจากคิวข้อมูลในคิวจะไม่หายถ้ายังไม่ถูก ack ถ้าเป็น Pub/Sub จะมีรูปแบบต่างออกไป

- ทำ Broadcast(Pub) ออกไปไม่สนใจผู้รับว่าจะเป็นใคร คอนซูมเมอร์ที่ต้องการรับข้อความต้องมาสมัคร(Sub) บางทีเรียกว่า Publish/Subscribe ถ้าไม่มีผู้รับข้อความจะหายไป ไม่มีการเก็บไว้

- คอนซูมเมอร์ทำการสร้างคิวเป็นชื่อแบบสุ่มทำการ bind กับ Exchange แบบ exclusive (ไม่ใช้ร่วมกับคนอื่น)

- Exchange มีหลายแบบจะมีการ route ข้อความในแบบต่างๆ จะขึ้นกับชนิดของมันมีดังนี้

  - fanout ทำการ broadcast ข้อความถึงทุก queue ที่ bind กับ exchange โดยไม่มีเงื่อนไขอะไร ถ้าไม่มี consumer 

  - direct ทำการ broadcast ข้อความถึง queue ที่ bind กับ exchange โดยมีการฟิวเตอร์ตาม bind key ที่ตรงกับ routing key ของ message

  - topic ให้ producer ส่งข้อความ โดยกำหนด topic โดยมีฟอร์แม็ตเป็น topicA.topicB.topicC จะเป็นตัวอักษรขั้นด้วยจุด ส่วนคอนซูมเมอร์ Subscribe ตาม topic คล้าย direct แต่ใส่เป็น ลักษณะ wildcard ได้  เช่น topicA.*. *
*.topicB.*  
topicA.#  

  - headers ไม่ใช้ routing key จะใช้ headers ของข้อความแทน เป็น JSON Object การ match จะมีแบบ all และ any

p.pub.js โค้ดโพรดิวเซอร์รับอากิวเมต์เป็น ชื่อ Exchange, ชนิดของ Exchange('fanout','direct','topic') 

  - assertExchange สร้าง Exchange ตามชื่อและประเภท durable: false จะไม่เก็บคิวลงดีสก์

  - channel.publish(exchange, routingKey, Buffer.from(message));  โปรแกรมอ่านจากคีย์บอร์ดในรูปแบบ
 routingKey+message 
ค่าของ routingKey จะเป็น string เพื่อกำหนดรูปแบบการส่ง ส่วน message เป็นข้อความอะไรก็ได้ห้ามมีเครื่องหมาย “+“ ในข้อความ

  - Exchange แบบ 'headers' จะไม่ใช้ routingKey จะใช้ property headers ใน option แทน

```js 
const [,,exchange,exchange_type] = process.argv
if( process.argv.length!=4 ||
    !['fanout','direct','topic','headers'].includes(exchange_type)){
        help()
}
function help(){ //exchange_type: 'fanout','direct','topic'
    console.log("Usage: node p.pub.js [exchange_name] [exchange_type]")
    console.log("Example: node p.pub.js pub-sub fanout")
    console.log("Example: node p.pub.js pub-sub-headers headers")
    process.exit()
}
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { connect } from "amqplib";
const rl = readline.createInterface({ input, output })
const connection =  await connect("amqp://frappet:Password@localhost")
const channel = await connection.createChannel();
await channel.assertExchange(exchange, exchange_type, {durable: false})
console.log("Message format 'routingKey | message' or type q to quit)");

rl.on('line', async (line) => { 
    if(line==='q'){
        await channel.close();
        await connection.close()
        process.exit()
    }
    const [routingKey,msg] = line.split('+')
    const message = msg
    if(exchange_type==='headers'){
        let opts={headers: JSON.parse(routingKey)}
        channel.publish(exchange, '' , Buffer.from(message),opts);
    }else{
        channel.publish(exchange, routingKey, Buffer.from(message));
    }
        
});
```

- โค้ดคอนซูมเมอร์ c.sub.js รับอากิวเมต์เป็น ชื่อ Exchange, ชนิดของ Exchange ('fanout','direct','topic',’headers’), รูปแบบที่จะรับจาก routingKey ซึ่งเป็นส่วนที่จะให้คิว bind กับ Exchange สามารถใช้เครื่องหมาย ”,” 

- assertExchange สร้าง Exchange ตามชื่อและประเภท durable: false จะเก็บข้อความหน่วยความจำอย่างเดียว

- channel.assertQueue("",{exclusive: true}) แบบ ไม่มีชื่อ(ให้ระบบสร้างให้) ,แบบ exclusive จะลบคิวเมื่อตัดการเชื่อมต่อ 

- channel.bindQueue(queue, exchange,  bindingKey); ทำการ bind คิวกับ exchange ค่า routingKey จะต้องเข้ากันได้กับ bindingKey ข้อความถึงจะเข้าคิวนี้

```
const [,,exchange,exchange_type,bkeys] = process.argv
if( process.argv.length!=5 ||
    !['fanout','direct','topic','headers'].includes(exchange_type)){
        help()
}
function help(){
    console.log("Usage: node c.sub exchange exchange_type binding_keys")
    console.log("example: node c.pub.js pub-sub direct info+danger ")
    process.exit()
}
import { connect } from "amqplib";
const connection =  await connect("amqp://frappet:Password@localhost")
const channel = await connection.createChannel();
await channel.assertExchange(exchange, exchange_type, {durable: false})

const q = await channel.assertQueue("",{exclusive: true})
const queue = q.queue //get random name queue
bkeys.split('+').forEach(async (bindingKey) => {
    if(exchange_type==='headers'){
        let opts =JSON.parse(bindingKey)
        await channel.bindQueue(queue, exchange,'',opts);
    }else
        await channel.bindQueue(queue, exchange, bindingKey);    
});
channel.consume(queue,async (msg)=>{
    console.log(`Received: ${msg.content.toString()} `)
},{noAck:true}) //auto ack
```

## รูปแบบ Request-Response

TBD

## รูปแบบ Exchange ต่อกับ Exchange

TBD 