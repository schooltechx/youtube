# .NET 7 Authentication Improvements & Automatic Configuration

ฟีเจอร์ที่น่าสนใจของ JWT Authentication .NET 7 ลดการเขียนโค้ดลงไปเยอะทำให้ง่ายขึ้นมาก ทำคอนฟิกให้ด้วย และ เก็บ secret key ไว้ใน dotnet secret ให้ด้วย ในวีดีโอตัวอย่างจะใช้โค้ดจาก[โปรเจ็ก JWT ที่แล้วของ .NET6 ](../dotnet-jwt-authen/) มาแก้ไขเล็กน้อย ตัดการสร้าง Token ออก และใช้ donet user-jwts ในการบริหารจัดการ JWT Token วีดีโอนี้เหมาะเป็นพื้นฐานการตรวจสอบ JWT Token ใน Microservice 

[![IMAGE ALT TEXT](https://img.youtube.com/vi/R_gf0kjqqxI/0.jpg)](https://youtu.be/R_gf0kjqqxI .NET 7 minimal API และ JWT Authentication แบบปรับปรุงสร้างคอนฟิกอัตโนมัติให้ด้วย")

## Note
โค้ด [Program.cs](./Program.cs) ผมได้เพิ่มจากในวีดีโอ โดยเพิ่ม /auth1 แสดงการดึงค่ายูสเซอร์จาก ClaimsPrincipal ,/auth2 สำหรับการตรวจค่า Claim ซึ่งเป็นอีกทางเลือกนอกจาก Role  
สำหรับผู้สนใจหัวข้อนี้ควรมีความรู้และเข้าใจ Web API และ Json Web Token มาบ้าง สามารถดูเพิ่มเติมใน Playlist [นี้ครับ](https://www.youtube.com/watch?v=2xlRaRrwutI&list=PLWMbTFbTi55OIZWcJMy_l5FS5x2zug0nG&index=4)

## Command
``` sh
    dotnet new webapi -minimal -n dotnetSevenJwt
    cd dotnetSevenJwt
    dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
    code .

    # แสดงวิธีการใช้งาน
    dotnet user-jwts -h
    # สร้าง JWT Token จะสร้าง secret key และ 
    # คอนฟิกใน appsettings.Development.json ให้ด้วยถ้ายังไม่มี
    dotnet user-jwts create --name oom --audience http://localhost --issuer localhost --role "admin" --role "dev" --claim "fname=Sorawit" --claim "lname=Bholsithi" -o json
    # แสดง secret key สำหรับ localhost
    dotnet user-jwts key --issuer localhost
    # แสดงรายการ token ที่สร้างแล้ว
    dotnet user-jwts list
    # ข้อมูล token ที่สร้างแล้ว โดยใช้ id จากคำสั่งที่แล้ว
    dotnet user-jwts print 461f4f58
```
## secret 
- Windows: %APPDATA%\Microsoft\UserSecrets\<user_secrets_id>\secrets.json
- Linux: ~/.microsoft/usersecrets/<user_secrets_id>/secrets.json

## Tools
- [jwt.io](https://jwt.io/)
- [jwt.ms](https://jwt.ms/)
- [Base64 Encode/Decode](https://www.base64encode.org/)

### อ่านเพิ่มเติม
- [What’s coming with .NET 7 ?](https://dottutorials.net/whats-coming-with-net-7/)
- [.NET 6 minimal API with JWT Authentication and Authorization](https://github.com/schooltechx/youtube/tree/main/webapp/dotnet-jwt-authen)
- [Safe storage of app secrets in development in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=windows)
