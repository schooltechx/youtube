# .NET minimal API with JWT and Identity
ASP.NET Core Identity ใช้ในการจัดการยูสเซอร์, รหัสผ่าน, profile ของยูสเซอร์, roles, claims, tokens, email confirmation ฯลฯ. 
สามารถนำไปผนวกรวมกับการ Authentication แบบต่างๆได้  โค้ดตัวอย่างนี้จะใช้ Identity กับ Json Web Token ในการ Authentication แล้วสร้างฐานข้อมูลผู้ใช้งาน
เพื่อสร้างระบบ Login ที่สมบูรณ์ ซึ่งน่าจะใช้งานกันมาก แต่ไม่รู้ทำไม่ไม่ทำ Template สำหรับ JWT Authentication ชีวิตจะได้ง่ายหน่อย ให้ใช้วิธีก็อปโค้ดไปใช้พลางๆก่อน 

[![IMAGE ALT TEXT](http://img.youtube.com/vi/WmIQOfjn6B4/0.jpg)](https://www.youtube.com/watch?v=WmIQOfjn6B4 ".NET minimal API+JWT+Entity+Identity within 15 minutes")

## ตอนก่อนหน้าที่ควรศึกษาก่อน

ก่อนดูวีดีโอนี้ต้องเข้าใจการใช้ .NET กับ Web API(minimal), ฐานข้อมูลด้วย Entity Framework, Json Web Token มาก่อนครับ

[.NET minimal API with JWT Authentication and Authorization](https://github.com/schooltechx/youtube/tree/main/webapp/dotnet-jwt-authen)

[.NET6 Minimal API with in 15 Minutes](https://github.com/schooltechx/youtube/tree/main/webapp/dotnet-minimal-api-ef-15m)

## command

    dotnet new webapi -minimal -n jwt_identity -f net6.0
    cd .\jwt_identity
    code .

    dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
    dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
    dotnet add package Microsoft.EntityFrameworkCore.Sqlite
    dotnet tool install --global dotnet-ef
    dotnet add package Microsoft.EntityFrameworkCore.Design

    dotnet ef migrations add InitiaHeroDb
    dotnet ef database update
   
## เวปที่เกี่ยวข้อง

[Identity on ASP.NET Core](https://jwt.io/)

[Json Web Token](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-6.0&tabs=netcore-cli)

