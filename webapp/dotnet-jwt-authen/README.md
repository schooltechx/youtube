# .NET minimal API with JWT Authentication and Authorization

โค้ดการ Authentication แบบ JWT และการใช้ Role บน .NET 6 minimal API สามารถใช้ เป็นแนวทางการสร้างระบบ Authentication ของตัวเอง หรือทำการผนวกรวมกับ Authentication แบบอื่นๆที่ไม่เป็นมาตรฐานได้ และเป็นพื้นฐานในการทำระบบ Microservice สามารถดูคำอธิบายในวีดีโอข้างล่างนี้ครับ

[![IMAGE ALT TEXT](http://img.youtube.com/vi/MjvBoLVZxnY/0.jpg)](https://youtu.be/MjvBoLVZxnY "เข้าใจ .NET Role base JWT authorization ใน 15 นาที")

## Package

dotnet new webapi -minimal -n jwt

cd jwt

dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer


## check token

<https://jwt.io/>

### token
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJzdWIiOiJhZG1pbiIsImp0aSI6ImNkNmVjMTY0LWVkZTItNDkzNC05ZWI3LWZlYjhkY2M0YmEzZSIsImdpdmVuX25hbWUiOiJTdXBlciIsImZhbWlseV9uYW1lIjoiVXNlciIsInJvbGVzIjpbImFkbWluIiwiZGV2Il0sIm5iZiI6MTY1OTY2OTkyNiwiZXhwIjoxNjU5NjcwODI2LCJpYXQiOjE2NTk2Njk5MjYsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.NYB2XYpj-Gb9VWmOK0vKMq41cl6fkjXnZ0B8UGu8aUo_pKBcQlenjgk1J85L3aqc0u6KTxaapFrDD0zVKAjfCg

### decoded token

    {
        "id": "1",
        "sub": "admin",
        "jti": "cd6ec164-ede2-4934-9eb7-feb8dcc4ba3e",
        "given_name": "Super",
        "family_name": "User",
        "roles": [
            "admin",
            "dev"
        ],
        "nbf": 1659669926,
        "exp": 1659670826,
        "iat": 1659669926,
        "iss": "localhost",
        "aud": "localhost"
    }
    
