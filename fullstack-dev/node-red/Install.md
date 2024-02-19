# Install
ติดตั้งและใช้งานทำผ่าน Node.js , Docker หรือ Express Middleware โดยปกติไฟล์สำหรับตั้งค่าจะอยู่ที่ ~/.node-red/settings.js กรณี docker จะอยู่ที่ /data


## Node.js
ติดตั้งและใช้งานผ่าน Node (NPM) แนะนำให้ใช้ [node 20](https://nodered.org/docs/faq/node-versions) ขึ้นไป สำหรับ Linux หรือ macOS ให้ติดตั้ง Node ผ่าน [nvm](https://github.com/nvm-sh/nvm)
การติดตั้ง node-red ทำด้วยคำสั่งด้านล่างนี้
```
npm install -g --unsafe-perm node-red
```
ค่าตอนฟิกจะอยู่ที่  ~/.node-red/settings.js หรือกรณีวินโดว์จะอยู่ที่ c:\User\user_name\.node-red/settings.js

## Docker
ติดตั้งผ่าน [Docker](https://nodered.org/docs/getting-started/docker) ทำได้ง่ายเหมาะสำหรับทดสอบการใช้และใช้งานจริง(production) Default image ตอนนี้เป็น Node 16 ซึ่งเก่าเกินไปแนะนำให้ใช้ [nodered/node-red:latest-18](https://hub.docker.com/r/nodered/node-red/tags) หรือใหม่กว่า(ถ้ามี) ตัวอย่าง docker-compose.yaml 

``` yaml
version: "3.7"
services:
  node-red:
    image: nodered/node-red:latest-18
    environment:
      - TZ=Asia/Bangkok
    ports:
      - "1880:1880"
    volumes:
      - ./node-red-data:/data
```
เซ็ต permission และเรียกผ่าน docker-compose.yaml
```bash
mkdir ./node-red-data
sudo chown 1000:1000 ./node-red-data
docker compose up -d
```
ไฟล์สำหรับการตั้งค่าจะอยู่ที่ ./node-red-data/settings.js

## Express Middle ware
เหมาะสำหรับนักพัฒนาเพื่อใช้ Workflow ร่วมกับโปรแกรมที่พัฒนา ดู [embedding](https://nodered.org/docs/user-guide/runtime/embedding)

## Authentication
https://nodered.org/docs/user-guide/runtime/securing-node-red

