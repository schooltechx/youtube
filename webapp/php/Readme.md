# PHP

PHP เป็นภาษาที่นิยมใช้พัฒนาเวปกันอย่างยาวนาน Deploy ง่าย แค่อัปโหลดโค้ดขึ้นเวปก็ใช้ได้แล้ว รูปแบบการพัฒนาแบบเดิมๆ เช่นใช้ XAMPP สร้างปัญหาค่อนข้างมาก
- ไม่กล้าอัปเดต เพราะต้องติดต้้งชุดพัฒนาใหม่ ทำการ roll back ได้ยาก
- พัฒนาบนวินโดว์ แต่ Production เป็น Linux มีปัญหาความเข้ากันได้ ทดสอบได้ยากด้วย
- ต้องเซ็ตสภาพแวดล้อมในการพัฒนาให้ตรงกับ Production ทำได้ยาก
- จำกัดเครื่องมือในการพัฒนา ถ้าจะใช้บริการอื่นๆต้องออกแรงในการติดตั้งมาก เช่น อยากใช้ PostgreSQL, Elastic search ฯลฯ
- บางคนถึงกับรัน XAMPP เป็นเครื่อง Production ก็มีเพราะไม่รู้จะทำให้ถูกต้องอย่างไร

สำหรับนักพัฒนายุคใหม่ควรใช้ Docker ในการพัฒนา เพราะสามารถแก้ไขข้อเสียทั้งหมด ที่กล่าวข้างต้นไปได้ และเมื่อเป็น Container แล้วเราสามารถ deploy แบบอื่นๆได้เช่น Loadbalance, docker swam, k8s, Microservice, DevOps ฯลฯ และใช้ร่วมกับบริการอื่นๆได้ง่ายขึ้นมาก เป็นการยกระดับเวปแอปของเราให้ทำงานร่วมกับ Framework อื่นๆด้วย

[![Laradock](https://img.youtube.com/vi/w37DHd0Ej5o/0.jpg)](https://www.youtube.com/watch?v=w37DHd0Ej5o "พัฒนา PHP แบบทันสมัยใช้ Docker ดีกว่า")


## Laravel

เป็น PHP Framework ตัวหนึ่งที่เป็นที่นิยมกันมาก แนะนำให้ใช้ [Laradock](https://laradock.io/) ในการพัฒนาจะมีตัวช่วยเพิ่มขึ้นมาก

[![Laradock](https://img.youtube.com/vi/wp1u-VsmBSU/0.jpg)](https://www.youtube.com/watch?v=wp1u-VsmBSU "Laradock พัฒนา Laravel บน Docker")

### เตรียมตัว
- ติดตั้ง git for windows
- ติดตั้ง docker desktop

### คำสั่งที่ใช้งาน

```
NET stop HTTP
git clone https://github.com/laradock/laradock.git
code .
cd laradock
cp .env.example .env
# แก้เป็น PHP_VERSION=8.2
docker-compose build php-fpm
docker-compose build workspace
docker compose up -d nginx mysql phpmyadmin workspace 
# stop docker
docker compose stop
```

### คำสั่งที่ใช้งาน บน workspace
```
docker compose exec workspace bash
composer create-project laravel/laravel example-app
chmod -R uog+w storage
chmod -R uog+w bootstrap/cache
php artisan migrate
npm install
npm run build
exit
```

ถ้าใช้งาน Oracle แนะนำให้ดูที่นี้
https://github.com/schooltechx/youtub...

ในวีดีโอทำบนวินโดว์เพื่อให้ง่ายต่อมือใหม่ จะได้ลบและแก้ไขโดยไม่ติดสิทธ์ root ของ Linux การ mount มาที่ NTFS ที่มีระบบไฟล์ต่างจาก Linux ทำให้ทำงานค่อนข้างช้า การใช้งานจริงแนะนำให้ใช้ใน Linux(WSL)  ถึงจะใช้ในวินโดว์แต่จะเป็นสภาพแวดล้อม Linux ที่สมบูรณ์ จะทำงานได้เร็วกว่า และเหมือนกับ Production ฐานข้อมูลควรใช้ Docker Volume เพื่อประสิทธิ์ภาพสูงสุด

## อ่านเพิ่ม
- [Laradock - A PHP Developer's best friend.](https://dev.to/dendihandian/laradock-a-php-developer-s-best-friend-33ef)