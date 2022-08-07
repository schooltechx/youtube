# .NET minimal API with JWT and Identity
ASP.NET Core Identity ใช้ในการจัดการยูสเซอร์, รหัสผ่าน, profile ของยูสเซอร์, roles, claims, tokens, email confirmation ฯลฯ. 
สามารถนำไปผนวกรวมกับการ Authentication แบบต่างๆได้  โค้ดตัวอย่างนี้จะใช้ Identity กับ Json Web Token ในการ Authentication แล้วสร้างฐานข้อมูลผู้ใช้งาน
เพื่อสร้างระบบ Login ที่สมบูรณ์ ตัวอย่างนี้เป็นตัวอย่างมาตรฐานที่ใช้งานบ่อยมาก 

[![IMAGE ALT TEXT](http://img.youtube.com/vi/WmIQOfjn6B4/0.jpg)](https://www.youtube.com/watch?v=WmIQOfjn6B4 ".NET minimal API+JWT+Entity+Identity within 15 minutes")

## command

  dotnet new webapi -minimal -n jwt_identity -f net6.0
  cd .\jwt_identity
  code .

  dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
  dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
  dotnet add package Microsoft.EntityFrameworkCore.Sqlite
  dotnet add package Microsoft.EntityFrameworkCore.Design

  dotnet ef migrations add InitiaHeroDb
  dotnet ef database update
   
## เวปที่เกี่ยวข้อง

[Identity on ASP.NET Core](https://jwt.io/)

[Json Web Token](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-6.0&tabs=netcore-cli)
