# Minecraft

## ติดตั้งเกม Minecraft (Java)

- ติดตั้ง [java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [UltimMC](https://github.com/UltimMC/Launcher) เป็น Launcher เล่นได้โดยไม่ต้องมี Microsoft account ใช้หลาย Mod ได้ไม่ตีกัน ในวีดีโอใช้ MC-Launcher แต่ผมแนะนำให้ใช้ UltimMC ดีกว่า เวลาเล่นครั้งแรกจะให้สร้าง local account จะใส่ชื่ออะไรก็ได้ไม่ต้องใส่เมลล์จริงลงไป
สำหรับมือใหม่ให้ติดตั้งรุ่นธรรมดา แบบไม่มี Mod ดูก่อน 


## ติดตั้งเซิร์ฟเวอร์ Minecraft(Java) บน Docker
Minecraft ถ้าเล่นหลายคนใน World เดียวกัน จะเปิดใช้งานผ่าน Lan แต่ค่อนข้างมีปัญหาหลายอย่าง แนะนำให้เปิดเซิร์ฟเวอร์ต่างหาก เวลาเล่นหลายคนควรให้อยู่ใน Wifi เดียวกัน  เลือก Multi Player แล้วป้อน <IP>:40000 เช่น 192.168.2.43:40000 นอกจากเล่นกันในบ้านแล้ว ถ้าตั้งค่า router ให้ Forward (TCP/UDP) มาที่เซิร์ฟเวอร์คนอื่นๆ ที่อยู่คนละเน็ตเวิร์กเข้าใช้ได้ด้วย

[![Install Minecraft Docker Server](https://img.youtube.com/vi/ALUa4cFnR-Y/0.jpg)](https://youtu.be/ALUa4cFnR-Y "ติดตั้งเซิร์ฟเวอร์ Minecraft บน Docker")


- [1.14.4 Forge](./docker-compose.yml)
- 1.14.4 แบบธรรมดา
```
version: "3"
services:
  dad-craft:
    container_name: dad-craft1-14-4
    image: itzg/minecraft-server
    tty: true
    stdin_open: true
    ports:
      - 40000:25565
    environment:
      VERSION: "1.14.4"
      MOTD: "Dad Minecraft Server"
      MODE: "survival"
      MEMORY: "1G"
      LEVEL_TYPE: "DEFAULT"
      EULA: "TRUE"
      ONLINE_MODE: "false"
    restart: unless-stopped
    volumes:
      - ./data/dad-craft:/data
```
