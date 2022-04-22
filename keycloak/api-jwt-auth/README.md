# ทำการ JWT Authentication APIs ด้วย Keycloak

ตัวอย่างการทำใช้ Dotnet 6 Minimal สร้าง Web API เพื่อทำการ Authentication กับ Keycloak แบ่งเป็นสองกรณี

## กรณี 1 ใช้ แชร์ secret 

จะมี secret ที่รู้กันระหว่าง keycloak client และ ผู้ที่จะใช้ API  
เมื่อทำ Authentication กับ Keycloak ด้วย secret จะได้ Access key กลับมา ให้เอาไปแนบตอนเรียก API
วิธีนี้เหมาะกับการคุยกันระหว่าง Microservice ตัวอย่างนี้เอามาจาก  

<https://www.mshowto.org/keycloak-server-ile-apilariniza-jwt-validasyonu-nasil-ekleyebilirsiniz-bolum-1.html>  

<https://www.mshowto.org/keycloak-server-ile-apilariniza-jwt-validasyonu-nasil-ekleyebilirsiniz-bolum-2.html>

### วิธีตั้งค่า

- สร้าง realm ชื่อ frappet ใน Realm Setting เก็บค่า RS256 kid ไว้ เป็น Public key ที่จะใช้ Verify token ใน appsetting.json

 ![Realm Setting Keys](./realm-setting.png)

- สร้าง client ชื่อ dotnet6-demo โดยมี root url เป็น https://keycloak.xxx.xxx 
- เซ็ตค่าดังนี้  
Access Type : confidential  
Service Account Enabled : On  
Access Token Lifespan : 20  
Browser Flow: borwser
Direct Grant Flow : direct grant 

![Client Setting](./client-setting.png)

- ในแทป Credentials  ก็อปค่า Secret เก็บไว้
![Client Secret](./client-secret.png)

## กรณี 2 Frontend ทำ Authentication ด้วย User/Password 

กรณีนี้เราสามารถใช้ JavaScript Framework(Vue,React,Svelte) สร้างฟอร์มรับ ชื่อยูสซอร์ และรหัสผ่าน เพื่อ authen กับ keycloak client เก็บ token ใน storage ควรใช้ keycloak-js ในการทำเพราะจะจัดการ refresh token, cookie ให้ด้วย  
- Realm frappet สร้าง keycloak client ชื่อ js-console 
![Client Secret](https://github.com/schooltechx/youtube/raw/main/keycloak/sso-google/js-console-setting.png)




## สร้าง API .NET

สร้าง dotnet 6 minimal apiใช้โค้ดและเก็บ Public Key ใน appsetting.json ตามโค้ดด้านล่าง แล้วรันบน localhost ก็ได้

### คำสั่ง

    dotnet --version
    6.0.202
    dotnet new web -o dotnet6-demo
    cd .\dotnet6-demo\
    dotnet new nugetconfig
    dotnet restore
    dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 6.0.4
    code .

### ไฟล์ appsetting.json

    {
    "Jwt": {    
        "Key": "UHLdOu32L5TVCRF8AWRgu220joK3-acaDv6iAdUHC6k",    
        "Issuer": "https://keycloak.xxx.xxx/auth/realms/frappet"    
    },      
    "Logging": {
        "LogLevel": {
        "Default": "Information",
        "Microsoft.AspNetCore": "Warning"
        }
    },
    "AllowedHosts": "*"
    }

### ไฟล์ Proram.cs

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    var builder = WebApplication.CreateBuilder(args);
    var issuer = builder.Configuration["Jwt:Issuer"];
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
    {
        opt.RequireHttpsMetadata = true;
        opt.Authority = issuer;
        opt.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
    builder.Services.AddAuthorization();
    var app = builder.Build();
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapGet("/", () => "Hello World!").RequireAuthorization();
    app.Run();

## Authentication กรณี 1 (share secret)

- POST โดยแนบ Sercret ตามภาพจะได้ access_token

![Get Token](./access-token.png)

- เอา Access Token ไปใช้เรียกใช้ API 

![Use Token](./api-authen.png)


## Frontend Authentication สำหรับกรณี 2 (User loin)
ถ้าใช้ keycloak เป็น public url ตัว frontend ก็ต้อง public ด้วย เวลา login จะ redirect ไป Keycloak และ redirect กลับมาที่ frontend ตอนพัฒนาอาจจะใช้ ngrok หรือไม่ก็ตั้ง keycloak ที่ localhost ในตัวอย่างจะตั้ง frontend เป็น public 
- ตั้ง webserver ด้วย nginx ใช้โต้ดตัวอย่าง [js-console](https://github.com/keycloak/keycloak/tree/main/examples/js-console/src/main/webapp) ไปใส่ไว้ใน wwwroot

- แก้ keycloak.json ให้ถูกต้อง

        {
        "realm" : "frappet",
        "auth-server-url" : "https://keycloak.xxx.xxx/auth",
        "ssl-required" : "external",
        "resource" : "js-console",
        "public-client" : true
        }

- เข้าหน้า https://keycloak-js-console.xxx.xxx/ จะทำการ redirect ไปหน้า login

- เอา Token ที่ได้หลัง login มาใส่ใน Postman เพื่อเรียก API ได้เหมือนกรณี 1
![Token from js-console](./js-console-show-detail.png)

## Note

กรณี mobile มันจะ redirect กลับมาที่ App  ยังไม่ได้ทดสอบ แต่น่าจะทำเหมือนกรณี 2 จะทดสอบภายหลัง
