# Arduino IDE

[Arduino IDE](https://www.arduino.cc/en/software/) เป็นโปรแกรมช่วยพัฒนา ไมโครคอนโทรลเลอร์  [Arduino](ไมโครคอนโทรลเลอร์) ที่นิยมสูง ใช้งานง่ายเหมาะกับผู้เริ่มต้น รองรับ Micro Controller อื่นๆนอกจาก Arduino ด้วย ผมแนะนำให้ใช้บอร์ดที่เป็น ESP32 หรือ ESP8266 หรือที่รองรับ Wifi หรือ Bluetooth จะเหมาะกับนิยาม IOT ในปัจจุบัน บอร์ด Arduino บางรุ่นต่ออินเตอร์เน็ตไม่ได้

## Setup ESP32, ESP8266

ตัวอย่างการติดตั้ง Arduino IDE บนวินโดว์ พร้อมทั้งติดตั้ง 3rd party board ในตัวอย่างเป็น ESP8266 และ ESP32 จากผู้ผลิดอื่นๆ แสดงการติดตั้งไดร์เวอร์ CP201x 

[![ติดตั้ง Arduino IDE with ESP32, ESP8266](https://img.youtube.com/vi/6gjpvlK6cdA/0.jpg)](https://youtu.be/6gjpvlK6cdA "ติดตั้ง Arduino IDE ร่วมกับ ESP32 และ ESP8266")

Boards manager link

- esp8266: https://arduino.esp8266.com/stable/package_esp8266com_index.json
- esp32: https://espressif.github.io/arduino-esp32/package_esp32_index.json
- [อื่นๆ](https://github.com/arduino/Arduino/wiki/Unofficial-list-of-3rd-party-boards-support-urls)

ข้อมูลเพิ่มเติม

- [Arduino](https://www.arduino.cc/en/software)
- [Unofficial list of 3rd party boards support urls](https://github.com/arduino/Arduino/wiki/Unofficial-list-of-3rd-party-boards-support-urls)
- [ESP8266](https://github.com/esp8266/Arduino)
- [ESP32](https://github.com/espressif/arduino-esp32)

ไดร์เวอร์ USB to serial
- [CP201x](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads) (แนะนำให้ซื้อบอร์ดที่ใช้ Chip รุ่นนี้)
- [ch340](https://www.wemos.cc/en/latest/ch340_driver.html) (ถูกกว่า CP201x ใช้ได้ดีแต่ไม่อยากแนะนำให้ใช้เท่าไหร่)
