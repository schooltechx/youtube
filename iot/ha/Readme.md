# Home Assistant
[Home Assistant](https://www.home-assistant.io/) ทำ Smart Home ง่ายๆไม่ต้องเขียนโค้ด(เขียนเพิ่มก็ได้) มีอุปกรณ์รองรับมากมายหาซื้อได้ง่าย 
การติดตั้งทำได้หลายแบบ แนะนำให้ใช้สองแบบแรก

- Home Assistant Operating System ระบบปฎิบัติการเฉพาะทางมีฟีเจอร์มากสุด ติดตั้งทุกอย่างได้ที่เครื่องเดียวกัน ลงในเครืองตรงๆหรือ VM ใช้ง่ายไม่ซับซ้อนเหมาะสำหรับคนใช้ทั่วไป

- Home Assistant Container ติดตั้งด้วย container สำหรับคนที่มีทักษะคอมพิวเตอร์ สามารถใช้ container ได้ ยืดหยุ่น รวดเร็วและสะดวกมาก สำหรับคนที่เข้าใจการทำงาน ต้องติดตั้ง Integration/Addon ต่างๆด้วยตัวเอง ใช้ร่วมกับระบบเดิมได้ แนะนำให้ดูวีดีโอ [ติดตั้งบนและใช้งานแบบ Container](./install-container.md)

- Home Assistant Supervised ติดตั้ง Supervisor ด้วยตัวเอง ต้องใช้ทักษะทางคอมพิวเตอร์และ กินเวลาในการติดตั้ง
- Home Assistant Core ติดตั้งเองผ่าน Python virtual environment เหมาะสำหรับนักพัฒนา 


เนื่องจากต้องเปิดทิ้งไว้ทั้งวันแนะนำให้เลือกอุปกรณ์ที่เปิดไว้อยู่แล้ว(เช่น NAS) หรือ Single Board เพื่อจะได้ประหยัดค่าไฟ ดูรายละเอียดเพิ่มใน[เอกสารการติดตั้งแบบต่างๆ](https://www.home-assistant.io/installation)

วีดีโอแนะนำ
- การใช้งานบน [Raspberry PI](https://pimylifeup.com/home-assistant-raspberry-pi/)

# ESPHome
[ESPHome](https://esphome.io/) ใช้ทำให้อุปกรณ์ esp32, esp8266 หรือ RP2040 ใช้งานร่วมกับ Home Assistant ได้ เหมาะคนมีพื้นฐานด้านอีเล็กทรอนิกสนใจรสร้างอุปกรณ์สำหรับ Smart Home ด้วยตัวเอง ไม่ต้องเขียนโปรแกรม

วีดีโอแนะนำ
- [This is SO Much Better! Getting Started with ESPHome 2021](https://www.youtube.com/watch?v=iufph4dF3YU)


# MQTT

เมื่ออุปกรณ์ IOT เชื่อมต่อกับเน็ตเวิร์กแล้ว เนื่องจาก MCU มีประสิทธิ์ภาพไม่มากนัก จะส่งโดยใช้ MQTT ซึ่งเป็นโปรโตคอลรูปแบบง่ายไม่ซับซ้อนในการส่งรับข้อมูล 
- [การติดตั้ง mosquitto บน Raspberry PI](https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/)


# Zigbee 
อุปกรณ์ Smart Home หลายตัวใช้ Zigbee เพื่อจะได้ใช้พลังงานต่ำ(ต่ำกว่า bluetooth) ใช้ถ่านกระดุมก้อนเดียวอยู่ได้เป็นปี แต่มีข้อเสียคือต้องมีตัวกลางในการรับ Zigbee เพื่อส่งต่อให้ตัวควบคุม smarthome ถึง Zigbee เป็นมาตรฐานแต่ก็ไม่สามารถคุยข้ามอุปกรณ์ได้ การใช้งาน กับ Home Assistant จำเป้นต้องคุยผ่านอีกตัวกลางหนึ่งที่ชื่อว่า MQTT

- [zigbee2mqtt](https://www.zigbee2mqtt.io/)
- [ตัวอย่างการใช้กับ Raspberry PI](https://flemmingss.com/how-to-set-up-zigbee2mqtt-on-a-raspberry-pi-and-integrate-it-with-home-assistant/)
- []()


