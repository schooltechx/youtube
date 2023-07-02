# Minecraft

## ติดตั้งเซิร์ฟเวอร์ Minecraft(Java) บน Docker

[![Install Minecraft Docker Server](https://img.youtube.com/vi/ALUa4cFnR-Y/0.jpg)](https://youtu.be/ALUa4cFnR-Y "ติดตั้งเซิร์ฟเวอร์ Minecraft บน Docker")

สำหรับมือใหม่แนะสำให้ติดตั้งรุ่นธรรมดา ไม่มี Mod ดูก่อน

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
      - 40001:25575
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

## ติดตั้งเกม Minecraft 
- ติดตั้ง [java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [UltimMC](https://github.com/UltimMC/Launcher) เป็น Launcher เล่นได้โดยไม่ต้องมี Microsoft account 
