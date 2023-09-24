# ติดตั้งฐานข้อมูล Oracle ด้วย Docker

[![Oracle DB in docker](https://img.youtube.com/vi/7tOBKEf-y-8/0.jpg)](https://youtu.be/7tOBKEf-y-8 "ติดตั้งฐานข้อมูล Oracle ฟรีๆ ด้วย Docker")

- เหมือนรุ่น XE จำกัด RAM, core , ขนาดฐานข้อมูล งานทั่วๆไปไม่มีปัญหา  มันจะรับโหลดหนักๆไม่ได้ 
- รันได้แค่ 1 Instant ต่อหนึ่ง VM แอปทั่วไปโหลดไม่หนักมากก็น่าไม่มีปัญหา หรือทำเป็น Microservice ที่รันฐานข้อมูลแยก service น่าจะได้แต่กิน RAM เยอะไปหน่อย
- ไม่มี support กับ patches อัป docker image น่าจะทดแทนได้ระดับหนึ่ง บริษัทใหญ่อาจจะรับข้อนี้ไม่ได้
- รองรับเฉพาะ Linux 
- เท่าที่เข้าใจเป็นรุ่นเพื่อให้นักพัฒนาเข้าถึงได้ง่าย ไม่ต้องสมัครใช้ ฟรี มีฟีเจอร์ล่าสุดให้ลอง ค่อนข้างดีมาอยู่ครับ ใช้แล้วจะได้ใช้เสพติดฟีเจอร์ไม่อยากใช้ตัวอื่น หลังๆนักพัฒนาไปใช้ฐานข้อมูลอื่นกันไม่ใช่เพราะดีกว่า Oracle แต่มันสะดวกกว่ามาก
- ภาพลักษณ์ใหม่ หลังๆก๊มีเริ่มของฟรีมาเรื่อยๆ

## Official image

วิธีการใช้ไปที่ https://container-registry.oracle.com ดูหัวข้อ Database เลือกหัวข้อ free จะเป็นวิธีการใช้กับ Podman ปรับเป็น docker compose ถ้าจะ mount volume ออกมาใช้ มีปัญหานิดหน่อย ต้องมีขั้นตอนการทำที่ถูกต้อง error ที่แสดงจะไม่สื่อเท่าไหร่ทำให้สับสนตอนทำ 
ให้สร้างโฟลเดอร์ ./oracle-data กำหนดสิทธิ์ให้ยูสเซอร์ "oracle" (uid: 54321) ใน container มีสิทธิ์เขียน 
ให้ใช้ sqlplus หรือ Oracle SQL Developer ในการทดสอบการเชื่อมต่อ
``` yaml
# compose.yaml
version: '3.1'
services:
  oracle-db:
#    image: container-registry.oracle.com/database/express:latest
    image: container-registry.oracle.com/database/free:latest
    environment:
      - ORACLE_PWD=Oracle123
      - ORACLE_CHARACTERSET=AL32UTF8
    ports:
      - 1521:1521
#    volumes:
#      - ./oracle-data:/opt/oracle/oradata
```
ตอนเริ่มฐานข้อมูลครั้งแรกค่อนข้างนานพอสมควรควรตรวจสอบ logs ว่ามันเสร็จหรือยัง ( จะขึ้นคำว่า “DATABASE IS READY TO USE!“)  สำหรับ CPU ไม่ได้ใช้หนักนักแต่ใช้ RAM ค่อนข้างเยอะ
``` bash
docker compose up -d
docker compose logs -f oracle-db
# CTRL+C เพื่อยกเลิกดู logs
# ให้เข้าไปเรียก sqlplus ใน container ด้วยยูสเซอร์ system รหัส Oracle_123
docker compose exec oracle-db sqlplus system/Oracle123

```

## Build อิมเมจเอง
จะใช้เวลาค่อนข้างนานในการ build แต่ก็สามารถแก้ไขติดตั้งโปรแกรมหรืออัปเดตได้ตามต้องการ
ให้อ่าน docker-images/OracleDatabase/SingleInstance/dockerfiles/Readme.md จะมี script สำหรับการ build
``` bash
git clone git clone https://github.com/oracle/docker-images.git
cd docker-images/OracleDatabase/SingleInstance/dockerfiles
./buildContainerImage.sh -v 21.3.0 -t oracle21.3.0xe -x
docker run --name OracleDBxe \
-p 1521:1521 \
-p 5500:5500 \
-e ORACLE_PWD=Oracle123 \
-e ORACLE_CHARACTERSET=AL32UTF8 \
-d \
oracle21.3.0xe

docker exec -it OracleDBxe sqlplus system/Oracle123
```

## ตัวอย่าง .NET Web API ใช้ฐานข้อมูล Oracle

ใช้ตัวอย่างเดียวกันนี้ได้เลยแก้นิดหน่อยให้ใช้ Oracle

[![Minimal API](https://img.youtube.com/vi/2xlRaRrwutI/0.jpg)](https://youtu.be/2xlRaRrwutI "Minimal API(CRUD) Entity Framework with in 15 min")

ให้ใช้ Oracle.EntityFrameworkCore

``` bash
dotnet new webapi -minimal -n PizzaStore
cd PizzaStore
dotnet add package Oracle.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
code .
# add some code
dotnet ef migrations add InitialCreate
dotnet ef database update

```

Pizza.cs

``` csharp
using Microsoft.EntityFrameworkCore;
namespace PizzaStore.Models 
{
    public class Pizza
    {
          public int Id { get; set; }
          public string? Name { get; set; }
          public string? Description { get; set; }
    }
    class PizzaDb : DbContext
    {
        public PizzaDb(DbContextOptions options) : base(options) { }
        public DbSet<Pizza> Pizzas { get; set; } = null!;
    }
}
```
Program.cs
แก้ connection string เป็นรูปแบบ oracle
```csharp
using Microsoft.EntityFrameworkCore;
//using Oracle.EntityFrameworkCore;
using PizzaStore.Models;

var builder = WebApplication.CreateBuilder(args);
// var connectionString =@"User Id=sys;Password=Oracle123;DBA Privilege=SYSDBA;Data Source=localhost:1521/xe";
var connectionString =@"User Id=system;Password=Oracle123;DBA Privilege=SYSDBA;Data Source=localhost:1521/FREE";
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<PizzaDb>(options => options.UseOracle(connectionString));
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.MapGet("/", () => "Hello");

app.MapGet("/pizzas", async (PizzaDb db) => await db.Pizzas.ToListAsync());
app.MapGet("/pizzas/{id}", async (PizzaDb db, int id) => await db.Pizzas.FindAsync(id));
app.MapPost("/pizzas", async (PizzaDb db, Pizza pizza) =>
{
    await db.Pizzas.AddAsync(pizza);
    await db.SaveChangesAsync();
    return Results.Created($"/pizzas/{pizza.Id}", pizza);
});
app.MapPut("/pizzas/{id}", async (PizzaDb db, Pizza updatepizza, int id) =>
{
      var pizza = await db.Pizzas.FindAsync(id);
      if (pizza is null) return Results.NotFound();
      pizza.Name = updatepizza.Name;
      pizza.Description = updatepizza.Description;
      await db.SaveChangesAsync();
      return Results.NoContent();
});
app.MapDelete("/pizzas/{id}", async (PizzaDb db, int id) =>
{
   var pizza = await db.Pizzas.FindAsync(id);
   if (pizza is null)
   {
      return Results.NotFound();
   }
   db.Pizzas.Remove(pizza);
   await db.SaveChangesAsync();
   return Results.Ok();
});
app.Run();
```


## สำหรับ Laravel ใช้ฐานข้อมูล Oracle
การตั้งค่าฐานข้อมูล Oracle ร่วมกับ PHP หรือ laravel ค่อนข้างซับซ้อน มีปัญหากับบางเวอร์ชั่น หาวิธีการที่ถูกต้องชัดเจนไม่ค่อยได้ คนที่ติดปัญหาก็ไม่ค่อยมีคนตอบ มันเป็นปัญหาของ PHP ยุคหลังๆ ผมเลยเขียนวิธีการไว้แล้วกัน จะใช้ laradock(docker) จะได้ไม่มีปัญหาเรื่องเวอร์ชั่น  ใช้ตัวอย่างเดียวกันนี้ได้เลยแก้นิดหน่อยให้ใช้ Oracle

[![Minimal API](https://img.youtube.com/vi/wp1u-VsmBSU/0.jpg)](https://youtu.be/wp1u-VsmBSU "พัฒนา Laravel บน Docker")

ผมก็ไม่ได้ใช้ PHP นานแล้ว และไม่ถนัด Laravel ตัวอย่างการตั้งค่า ผมเอาจาก [ที่นี้](https://medium.com/@umaams/setup-oracle-database-in-laravel-72c0d1d1e05) 
 ใน .env ให้แก้ oci8 ทั้งหมดเป็น true

laravel/.env
```
WORKSPACE_INSTALL_OCI8=true
PHP_FPM_INSTALL_OCI8=true
PHP_WORKER_INSTALL_OCI8=true
```


oracle-test/.env

```
...
DB_CONNECTION=oracle
DB_HOST=192.168.2.100
DB_PORT=1521
DB_DATABASE=xe
DB_USERNAME=system
DB_PASSWORD=Oracle123
...

```

oracle-test/config/database.php
``` php
...
        'oracle' => [
            'driver' => 'oracle',
            'host' => env('DB_HOST', '192.168.2.100'),
            'port' => env('DB_PORT', '1521'),
            'database' => env('DB_DATABASE', 'xe'),
            'username' => env('DB_USERNAME', 'system'),
            'password' => env('DB_PASSWORD', 'oracle'),
            'service_name' => env('DB_SERVICE_NAME', ''),
            'charset' => 'AL32UTF8',
            'prefix' => '',
        ],

...
```

ทดสอบ คอนฟิก
```
php artisan tinker
DB::connection()->getPdo();
```
ถ้าผ่านแล้วทำการ migrate ได้
```
php artisan migrate
```

โปรแกรมทดสอบ การเชื่อมต่อ และดู OCI

oracle-test/resource/views/welcome.blade.php

``` php
<?php
try {
    \DB::connection()->getPDO();
    echo \DB::connection()
    ->getDatabaseName();
    } catch (\Exception $e) {
    echo 'None';
}
phpinfo()
?>
```



