# ใช้งาน Docker บน Production

ตัวอย่าาง Dockerfile สำหรับการพัฒนา node.js
``` dockerfile
FROM node:18 as build
WORKDIR /app
# copy package.json and install library
COPY package*.json ./
RUN npm install
# copy everything else and build app
COPY . .
RUN npm run build
# final stage/image
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 80
ENV PORT=80
CMD ["node", "./build/index.js"]
```

ตัวอย่าาง Dockerfile สำหรับการพัฒนา dotnet
``` dockerfile
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source
# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore
# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet publish -c release -o /app --no-restore
# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```


## Official Image
อิมเมจของ docker ออกแบบมาให้สามารติดตั้งหรือดัดแปลงได้ตามต้องการ สิ่งที่ควรทำคือพยายามใช้ Official ของโปรแกรมหลักนั้น เช่นใช้ FROM node:18 แทน FROM ubuntu แล้วมาติดตั้ง node เพิ่มเอง จะได้อิมเมจที่ประสิทธิ์ภาพดีกว่า ขนาดเล็กด้วย เวลาอัปเกรดทำได้ง่าย

## หนึ่งเซอร์วิสหนึ่งอิมเมจ
การรันเวปแอปหนึ่งตัวยกตัวอย่าง Wordpress จะประกอบไปด้วยอิมเมจ Apache(มี PHP ในตัว) กับ MySQL จะรันแยกคนละ Container ไม่ควรเอามารวมกันในอิมเมจเดียวเพราะจัดการได้ยาก อัปเกรดแต่ละตัวก็ต้องทำใหม่ การรันแยกกันไม่มีผลต่อประสิทธิ์ภาพเพราะ Docker ไม่ใช้ VM จะแชร์ Linux kernel อยู่แล้วเพื่อรันโปรแกรมคนละตัว

## Image version
ให้กำหนดแท็กเวอร์ชั่นของอิมเมจ(node:18) ไม่ควรแท็ก latest (node:latest) หรือไม่กำหนดเวอร์ชั่น(node) เพราะจะได้รุ่นล่าสุดแต่ไม่รู้ว่าเป็นเวอร์ชั่นไหนกันแน่ ในการเรียกใช้งานแต่ละเครื่องอาจจะได้คนละเวอร์ชั่นกัน ใช้ทั้งตอนสร้างอิมเมจ,  docker run หรือ docker compose

## เลือกอิมเมจที่เหมาะสม
- พยายามเลือกที่ขนาดเล็ก ทำงานได้เร็ว เช่นอาจจะเลือกอิมเมจที่เป็น alpine
- มีเฉพาะเครื่องมือที่จำเป็น เอาโปรแกรมที่ไม่จำเป็นออก จะได้มีขนาดเล็ก มีจุดให้แฮกเกอร์โจมตีได้น้อย

## Cache Image Layer
Docker จะสร้างอิมเมจจะทำเป็น Layer ซ้อนกันไปเรื่อยๆ ถ้าขั้นตอนไหนไม่มีการเปลี่ยนแปลงจะนำ Cache มาใช้ ถ้าตอนสร้างอิมเมจ เลือกขั้นตอนที่เหมาะสม โดยลำดับขั้นตอน ที่ไม่มีการเปลี่ยนแปลงบ่อยมาเป็น Layer แรกๆ จะทำให้สร้าง และโหลดอิมเมจจะทำได้เร็ว ในการพัฒนา node.js ตัวไลบารีที่ติดตั้งไม่ค่อยเปลี่ยนแปลงบ่อย แต่โค้ดโปรแกรมใน src ที่เราพัฒนาจะแก้ไขข่อยกว่า 
คำสั่ง "COPY package*.json ./" และ "RUN npm install" เป็นติดตั้งไลบารีก่อน ส่วน "COPY . ." ก็อปโค้ดและไฟล์ต่างๆเข้าทีหลังเพื่อ build 
เมื่อ build image อีกรอบจะไม่ต้องทำขั้นตอนติดตั้งไลบารีซ้ำ จะก็อปปี้โค้ดที่มีการเปลี่ยนแปลงละทำการ build เลย การทำงานของ CI/CD เร็วขึ้นไปด้วย ใช้ที่เก็บใน Repository น้อยลง ถ้ากรณีมีการติดตั้งไลบารีเพิ่มไฟล์ package.json จะเปลี่ยนแปลงก็จะเริ่มทำการติดตั้งไลบารีใหม่ให้

## .dockerignore
นำไฟล์ที่ไม่จำเป็น ไฟล์ที่มีข้อมูลเป็นความลับ(เช่น รหัสผ่าน, private key) ออกตอน COPY เข้าไปในอิมเมจ โดยนำรายการไฟล์นั้นใส่ไว้ใน .dockerignore 

## Multi State Builds
การควบคุมสภาพแวดล้อมสำหรับการ build เป็นสิ่งจำเป็นในการทำงาน จะใช้ docker เพื่อการนี้ในตัวอย่างที่ให้จะ 
- แยกอิมเมจสำหรับการ build "FROM node:18 as build"
- ทำการ build โค้ดออกมา
- ใช้อิมเมจที่เหมาะแก่การรันโปรแกรม "FROM node:18-alpine"
- ก้อปไฟล์ที่ได้จากขั้นตอน build ออกมาใส่ในอีกอิมเมจที่จะใช้รันโปรแกรม "COPY --from=build /app ."
- จบขั้นตอนทั้งหมดจะได้อิมเมจพร้อมใช้งาน

การรันโปรแกรม ตอน build จะมีโค้ดโปรแกรมและเครื่องมือสำหรับการ build เช่น SDK ถ้า build เสร็จแล้ว จะเรียกใช้โปรแกรมต้องการค่ runtime ก็พอ 
ตัวอย่างเป็น node:18 ตอน build  ใช้อิมเมจ node:18-alpine ตอนรัน จะมีขนาดเล็กลง ถ้าเป็น Java หรือ .NET จะชัดเจนกว่าตอนbuild ใช้รุ่น SDK ตอนรันใช้รุ่น runtime จำเป็นต้องมีการทดสอบด้วยว่าอิมเมจตอนรันมีเครื่องมือหรือ library ที่จำเป็นในการใช้งาน

## ไม่ใช้ root
ไม่ใช้ยูสเซอร์ root รันโปรแกรมใน container โดยการสร้างยูสเซอร์และกรุปที่มีสิทธิ์เพียงพอในการรันโปรแกรม บางอิมเมจจะมีมาให้เช่น node จะมียูสเซอร์ชื่อ node สำหรับรันโปรแกรม


## Scan image
ตรวจสอบอิมเมจสม่ำเสมอโดยการ scan ใน docker hub จะมีให้ให้มันทำตอน push อิมเมจหรือทำผ่านคอมมานไลน์

``` bash
docker login
docker scan app:1.0
```
หรือใช้เครื่องมืออื่นๆช่วยด้วย




อ่านเพิ่ม
https://www.youtube.com/watch?v=8vXoMqWgbQQ