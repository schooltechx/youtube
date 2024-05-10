# Node Red

[Node Red](https://nodered.org) เป็นที่นิยมใช้สร้าง Workflow สำหรับทำงาน แหล่งข้อมูลหาได้ง่าย
- สร้าง Workflow แบบ Low code ไม่ต้องเขียนโค้ดเป็น แต่อาจจะต้องรู้เทคโนโลยีที่เป็นพื้นฐาน เช่น Web API
- เขียนโปรแกรมเพิ่มเติมได้ (javascript)
- ติดตั้งหรือที่มีคนสร้างไว้เพิ่มเพิ่มความสามารถ เป็น Node.js Package มีให้ใช้มากมาย หรือสร้างเองก็ได้
- เหมาะสำหรับการ Integrate กับระบบอื่นๆ เช่น ผ่าน Web API, Email , MQTT, Line ฯลฯ
- มีฐานผู้ใช้เป็นจำนวนมาก จึงมี Library สนับสนุนค่อนข้างมาก ค่อนข้างเด่นสำหรับงาน IOT 


## Install

ติดตั้งได้หลายแบบ node.js, Docker, Express, Home Assistant  วิธีการ[ดูที่นี้](./install.md)

## Dashboard
สามารถสร้างหน้าสำหรับแสดงข้อมูลหรือป้อนข้อมูลแบบง่ายๆด้วย Dashboard ตัวอย่าง[ดูได้ที่นี้](./dashboard.md) 

## HTTP node
สามารถสร้าง Web API ได้ง่ายๆ หรือทำ HTTP Request เพื่อเรียก Web API จากภายนอกทำให้ผนวกรวมกับระบบอื่นๆได้ง่าย ดูเพิ่มเติม[ได้ที่นี้](./http.md)


## Line API Node
มี [Line API Node](https://github.com/jatu-studiobox/node-red-contrib-node-line-api
) สามารถเชื่อมต่อ Line ได้ง่ายดาย

## Tutorial

Node Red เป้นที่นิยมมากสามารถหาข้อมูลการใช้งานและสอนการใช้งานได้ง่าย

- [CMDev/สอนเขียนโปรแกรมด้วย NodeRED Step-by-Step](https://www.youtube.com/watch?v=rQuyjF2_Q4M&list=PLjPfp4Ph3gBqSh3Y0SZzBLqmRWaJYko7r&index=1) เป็นภาษาไทยเข้าใจง่าย
- [Opto Video/Node-RED Tutorials](https://www.youtube.com/watch?v=3AR432bguOY&list=PLKYvTRORAnx6a9tETvF95o35mykuysuOw) อธิบายดีแนะนำให้ดูวีดีโอ 1,2,3,4,10 วีดีโออื่นๆจะเป็น IOT (groov) แต่ก็พอดูประกอบได้
- [Chatchalerm Kerdsawad/line messaging api](https://www.youtube.com/watch?v=_amRSA4V5cM&list=PLEYzs74iAanWSQVtWZpc4YFMvOxZNYpxj&index=1) แสดงการใช้งานกับ Line
- [ครูอภิวัฒน์"สอนสร้างสื่อ/Node-Red](https://www.youtube.com/watch?v=pYvh1fYU5ZU&list=PLhr9514HdGldDza_ZuLZEFrmR0SSKWzge&index=1) แสดงการใช้งานกับ Line
- [Learn AV Programming/Home Automation & Building Control with NodeRED & the Raspberry Pi](https://www.youtube.com/watch?v=vR0KSljLD74&list=PLQ0asHYwQjZi02xVsxE1TyYGs7_8hSTk7) มีวีดีการใช้ Dashboard แบบสั้นๆ ส่วนใหญ่จะใช้กับ Raspberry PI

- [Node-RED Essentials](https://www.youtube.com/watch?v=ksGeUD26Mw0&list=PLyNBB9VCLmo1hyO-4fIZ08gqFcXBkHy-6&index=1) สอนแบบสั้นๆมีหลายวีดีโอ

- [Node Red Tutorial(Channel Prescient)](https://www.youtube.com/watch?v=mjg7s6pvOyg&list=PLfUuvYLKLOiBK9OGeDiDLX0SUVUk0oh7j) มีหัวข้อค่อนข้าง Advance

- [Node-Red HTTP Request Node for Beginners](https://stevesnoderedguide.com/node-red-http-request-node-beginners)

## ดูเพิ่มเติม
- [Low code microservices with node-red](https://medium.com/engineered-publicis-sapient/low-code-microservices-with-node-red-cef1a5b4d852)
- [NODE-RED: DEVELOPMENT AND CI](https://blog.ordina-jworks.io/testing/2018/08/15/node-red-dev-ci.html) มีตัวอย่างการทำ CRUD 

- [Home Assistant Container Part 5: Node-RED](https://sequr.be/blog/2022/09/home-assistant-container-part-5-node-red/) มีตัวอย่างการของ HA แบบ Container ที่น่าสนใจด้วย