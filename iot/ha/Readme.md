# Home Assistant
[Home Assistant](https://www.home-assistant.io/) ทำ Smart Home ง่ายๆไม่ต้องเขียนโค้ด(เขียนเพิ่มก็ได้() มีอุปกรณ์รองรับมากมายหาซื้อได้ง่าย 

# ESPHome
[ESPHome](https://esphome.io/) ใช้ทำให้อุปกรณ์ esp32, esp8266 หรือ RP2040 ใช้งานบน Home Assistant ได้ เหมาะกับการสร้างอุปกรณ์สำหรับ Smart Home ด้วยตัวเอง

## สอนการใช้แบบ Docker

[![setup Home Assistant, ESPHome and docker ](https://img.youtube.com/vi/mCRQKCA8ZWw/0.jpg)](https://youtu.be/mCRQKCA8ZWw "ทำ Smart Home ด้วย Home Assistant แบบ Container เบื้องต้น")

ใช้การติดตั้งแบบ Docker บนวินโดว์ เพื่อให้ง่ายต่อการเริ่มต้น ไม่ต้องมีพื้นฐาน Linux ไม่ต้องมีอุปกรณ์อะไรมาก จะใช้ led ที่อยู่บนบอร์ดแทนหลอดไฟ และต่อ DTH11 เพื่อวัดอุณหภูมิและความชื้น การใช้งานจริงแนะนำให้ใช้ docker บน Linx จะเร็วกว่ามาก

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

วีดีโอแนะนำ
- [This is SO Much Better! Getting Started with ESPHome 2021](https://www.youtube.com/watch?v=iufph4dF3YU)


## TTGO T-Display (Comming Soon ...)
บอร์ด TTGO T-Display เป็นบอร์ด ESP32 หนึ่งที่ผมชอบใช้งานเพราะ ราคาไม่แพงมาก ฟึเจอร์น่าสนใจ มีหน้าจอสวยงาม ต่อชาร์ตได้แบ็ตเตอรี่ในตัว มีตัวอ่านระดับแบ็ตเตอรรี่ มีปุ่มสองปุ่ม แต่ไม่มีหลอดไฟในตัว ผมเคยเขียนบทความเกี่ยวกับบอร์ดนี้เอาไว้นานแล้ว พอเห็นว่าใช้กับ ESPHome ได้ก็เลยเอามาลองใช้ ดูในคอนฟิกได้เลย[t-display.yaml](./t-display.yaml)
- ดู[ตัวอย่าง](https://github.com/pulimento/TTGO-T-Display-esphome-sample) มาเป็นแนวทางปรับใช้ มันนานแล้วต้องแก้ไข
- [platform: st7789v](https://esphome.io/components/display/st7789v.html) 
- [บทความที่ผมเคยเขียนไว้](https://iot-thai.blogspot.com/2019/10/esp32-ttgo-T-Display.html)


```

```
