# ติดตั้งและใช้งาน Home Assistant แบบ Container

[![setup Home Assistant, ESPHome and docker ](https://img.youtube.com/vi/mCRQKCA8ZWw/0.jpg)](https://youtu.be/mCRQKCA8ZWw "ทำ Smart Home ด้วย Home Assistant แบบ Container เบื้องต้น")

### Docker Desktop
ในวีดีโอใช้ Docker Desktop บนวินโดว์ (เพื่อให้ง่ายต่อการเริ่มต้น ไม่ต้องมีพื้นฐานคำสั่ง Linux) แสดงการต่อกับบอร์ด esp3 ด้วย esphome ใช้ led ที่อยู่บนบอร์ดแทนหลอดไฟ และต่อ DTH11 เพื่อวัดอุณหภูมิและความชื้น
- บอร์ด ESP32 ผมใช้ Lolin32
- DHT11 เซนเซอร์ อุณหภูมิ ความชื้น
- วินโดว์ติดตั้ง Docker แล้ว วิธีการติดตั้งและใช้งานดูได้ที่ [Playlist สอนใช้ Docker](https://www.youtube.com/watch?v=8g_GwM60MaU&list=PLWMbTFbTi55P6Vzv9a-un9oFZY-PwMj98)
- มีความรู้ Arudino และ esp32, มาบ้างศึกษาเพิ่มได้จากวีดีโอ ["ติดตั้ง Arduino IDE ร่วมกับ ESP32 และ ESP8266"](https://youtu.be/6gjpvlK6cdA)

ไฟล์ติดตั้งไฟล์ [compose.yaml](./compose-with-esphome.yaml)
คอนฟิก [bed-room-controller.yaml](./bed-room-controller.yaml)

เราสามารถเข้าไปใน docker container container เพื่อรันคำสั่งได้
```
docker compose exec esphome bash
esphome run bed-room-controller.yaml
```
ESPHome ถ้า mount ไฟล์ออกมาบนวินโดว์ จะทำงานค่อนช้างช้ามาก ใน compose.yaml จะ comment ไว้

### Container บน Linux
ถ้าคุ้นเคยกับ docker บนวินโดว์แล้ว แนะนำให้เปลี่ยนมา[ใช้บน WSL](https://youtu.be/ntLLCJk9LyY?si=GHG0SisyyZGI6IXY)  เวลา mount ไฟล์ออกมาใช้จะทำงานได้ เร็วกว่ามาก

ถ้าใช้งานได้คล่องแล้วสามารถใช้ Docker บน Linux ทั่วไปได้



