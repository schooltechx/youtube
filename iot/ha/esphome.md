# ESPhome

ตัวอย่างการติดตั้งและใช้งาน ESPHome รใช้บอร์ด LOLIN32 ต่อเซนเซอร์ DHT11 เพื่อวัดอุณหภูมิและความชื้น แสดงการปิดปิดไฟ LED ควบคุมและแสดงผลผ่าน Home Assistant
[![setup Home Assistant, ESPHome and docker ](https://img.youtube.com/vi/mCRQKCA8ZWw/0.jpg)](https://youtu.be/mCRQKCA8ZWw "ทำ Smart Home ด้วย Home Assistant แบบ Container เบื้องต้น")


# TTGO T-Display (Comming Soon ...)
บอร์ด TTGO T-Display เป็นบอร์ด ESP32 หนึ่งที่ผมชอบใช้งานเพราะ ราคาไม่แพงมาก ฟึเจอร์น่าสนใจ มีหน้าจอสีสวยงาม ต่อชาร์ตได้แบ็ตเตอรี่ในตัว มีตัวอ่านระดับแบ็ตเตอรรี่ มีปุ่มสองปุ่ม แต่ไม่มีหลอดไฟในตัว แต่มีขา blacklight  ผมเคยเขียนบทความเกี่ยวกับบอร์ดนี้เอาไว้นานแล้ว พอเห็นว่าใช้กับ ESPHome ได้ก็เลยเอามาลองใช้ ดูในคอนฟิกได้เลย[t-display.yaml](./t-display.yaml)
- [บทความที่ผมเคยเขียนไว้](https://iot-thai.blogspot.com/2019/10/esp32-ttgo-T-Display.html)
- [platform: st7789v](https://esphome.io/components/display/st7789v.html) 
- [Display component](https://esphome.io/components/display/index.html)
- ดู[ตัวอย่าง](https://github.com/pulimento/TTGO-T-Display-esphome-sample) มาเป็นแนวทางปรับใช้ มันนานแล้วต้องแก้ไข
