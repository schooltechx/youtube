# Home Assistant
ทำ Smart Home ง่ายๆไม่ต้องเขียนโค้ดติดต่อกับอุปกรณ์ได้หลากหลาย

# ใช้งาน ESPHome เบื้องต้น
จะใช้การติดตั้งแบบ Docker เพื่อให้ง่ายต่อการเริ่มต้น ไม่ต้องมีอุปกรณ์อะไรมาก ใช้วินโดว์และ esp32 กับ dht11 ควรรู้วิธีใช้ docker และเคยใช้ Arudino กับ esp32 มาบางแล้ว
ให้ติดตั้งโดย compose ไฟล์ [compose.yaml](./compose-with-esphome.yaml)
การตั้งค่าอุปกรณ์จะใช้ led ที่อยู่บนบอร์ดแทนหลอดไฟ และต่อ DTH11 เพื่อวัดอุณหภูมิและความชื้น
[bed-room-controller.yaml](./bed-room-controller.yaml)

วีดีโอแนะนำ
- [ติดตั้ง Arduino IDE ร่วมกับ ESP32 และ ESP8266](https://youtu.be/6gjpvlK6cdA)
- [ติดตั้ง Docker บนวินโดว์](https://www.youtube.com/watch?v=8g_GwM60MaU&list=PLWMbTFbTi55P6Vzv9a-un9oFZY-PwMj98)
- [This is SO Much Better! Getting Started with ESPHome 2021](https://www.youtube.com/watch?v=iufph4dF3YU)


