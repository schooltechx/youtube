# .NET6 Minimal API with in 15 Minutes
สอนทำ Web API (minimal) ด้วย .NET 6 ทำ CRUD ได้ง่ายๆ เสร็จเร็ว สไตล์ก็อปแปะ  (ไม่ถึง 15นาที)  
สำหรับการเรียนรู้เราจะไม่หยุดแค่นี้จำเป็นต้องอ่านโค้ดและทำความเข้าใจไปด้วย ในวีดีโอจะมีคำอธิบายเพิ่มเติมของการทำแต่ละขั้นตอน แสดงวิธีการต่อฐานข้อมูลแบบ in-memory, SQLite, MSSQL 
minimal API ทำให้ .NET ใช้งานได้ง่ายขึ้นเหมือนใช้พวก Express.js เรียนรู้ได้รวดเร็ว วีดีโอนี้เน้นง่ายไม่ซับซ้อน เหมาะสำหรับผู้เริ่มต้นศึกษา 
ไม่ได้ใช้ design pattern ไม่ได้พูดถึงเรื่องความปลอดภัย ฯลฯ เมื่อผู้เรียนทำความเข้าใจแล้ว ควรทำการศึกษาเพิ่มเติมในหัวข้อที่ขาดไป

## ลิงค์ที่เกี่ยวข้อง

- [ตัวอย่างที่ใช้ทำ](https://docs.microsoft.com/en-us/learn/modules/build-web-api-minimal-database/)
- [พื้นฐาน WebAPI](https://www.youtube.com/watch?v=c49Y5VKKW34&list=PLWMbTFbTi55ODjx2GXM_PCEh5sMgEo8nq)
- [docker-compose.yml สำหรับ mssql](https://github.com/schooltechx/youtube/blob/main/Docker%20VM%20K8s/docker-compose/mssql/docker-compose-mssql2019.yml)

## คำสั่งที่ใช้

    dotnet --version
    dotnet --list-sdks
    dotnet new webapi -minimal -n PizzaStore -f net6.0
    code .\PizzaStore
    dotnet add package Microsoft.EntityFrameworkCore.InMemory
    dotnet add package Microsoft.EntityFrameworkCore.Sqlite
    dotnet tool install --global dotnet-ef
    dotnet add package Microsoft.EntityFrameworkCore.Design
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer 

