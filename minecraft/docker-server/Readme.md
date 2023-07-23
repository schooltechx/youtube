# ติดตั้งเซิร์ฟเวอร์ Minecraft(Java) บน Docker
Minecraft ถ้าเล่นหลายคนใน World เดียวกัน จะเปิดใช้งานผ่าน Lan ถ้าไม่ใช่รุ่น official มีปัญหาหลายอย่าง เซิร์ฟเวอร์เถื่อนต่างๆก็โดนแบนไปแล้ว แนะนำให้เปิดเซิร์ฟเวอร์เพื่อใช้เอง จะใช้ [Docker](https://www.youtube.com/watch?v=8g_GwM60MaU&list=PLWMbTFbTi55P6Vzv9a-un9oFZY-PwMj98) ในการติดตั้ง  ในวีดีโอใช้ MC-Launcher แต่ผมแนะนำให้ใช้  [UltimMC](../UltimMC/) จะดีกว่า

[![Install Minecraft Docker Server](https://img.youtube.com/vi/ALUa4cFnR-Y/0.jpg)](https://youtu.be/ALUa4cFnR-Y "ติดตั้งเซิร์ฟเวอร์ Minecraft บน Docker")

## docker-compose.yaml
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

## ดูเพิ่มเติม
- [itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server)

