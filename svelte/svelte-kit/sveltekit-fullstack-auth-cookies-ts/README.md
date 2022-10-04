# SvelteKit Authentication with cookies

Dear English developer. I modify [this document](https://joyofcode.xyz/sveltekit-authentication-using-cookies) for Thai developer. Below content was written in Thai.

เรียนรู้การสร้างระบบ login ด้วยตัวเอง ใช้แบบ cookies โค้ดใช้แบบ TypeScript

## Install
ให้ติดตั้ง node.js รุ่นล่าสุด
- สร้างโปรเจ็ก SvelteKit แล้วติดตั้ง modules ที่จำเป็น
- bcrypt ใช้ hash รหัสผ่าน ทำให้แกะรหัสผ่านออกมาดูไม่ได้
- prisma ORM ติดต่อฐานข้อมูล SQLite 

``` sh
# create svelte project with TypeScript support
npm create svelte@latest sveltekit-fullstack-cookie-auth
cd sveltekit-fullstack-cookie-auth
npm install
npm install bcrypt
npm install -D @types/bcrypt
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
code .
## modify prisma.schema add model User,Roles
npx prisma db push
npx prisma studio
# add roles USER and ADMIN
```
ให้ก็อปโฟลเดอร์ที่อยู่กับเอกสารนี้ src/*, prisma/scheme.prisma  ไปใส่ในโปรเจ็กที่สร้างก็จะใช้งานได้


## Pages
การทำงานของหน้าต่างๆ
### Register (auth/register/)
- เข้าหน้านี้ได้ถ้าไม่ได้ login อยู่
- ตรวจสอบความถูกต้อง ยูสเซอร์ต้องไม่มีในฐานข้อมูล
- สร้างยูสเซอร์ในฐานข้อมูล รหัสผ่าน hash ด้วย bcrypt, role USER
- โยนไปหน้า /auth/login
### Login (auth/login/)
- เข้าหน้านี้ได้ถ้าไม่ได้ login อยู่
- ตรวจความถูกต้องของข้อมูล
- ตรวจสอบยูสเซอร์มีหรือไม่
- ตรวจสอบรหัสว่าถูกหรือไม่
- อัปเดต userAuthToken ใหม่
- สร้าง session (cookies)
- โยนไปหน้า Home

### Logout (auth/logout/)
- เคลียค่า session (cookies) GET จะเปลี่ยนหน้าฝั่ง client ใช้ POST เพราะว่า จะให้มัน reload หน้าใหม่ ไม่งั้น layout ไม่เปลี่ยน

### Profile
- ต้อง login ก่อนถึงเข้าได้
- ตรวบสอบได้ว่าเป็น ADMIN หรือไม่


## รายละเอียดไฟล์ และหัวข้ออื่นๆ
## .svelte-kit/tsconfig.json
ถ้า "paths" ไม่อ้างถึง $lib ให้เพิ่มเข้าไปเหมือนข้างล่าง

``` js
{
	"compilerOptions": {
		"baseUrl": "..",
		"paths": {
			"$lib": [
				"src/lib"
			],
			"$lib/*": [
				"src/lib/*"
			]
		},
        ...
    }
    ...
}
```

### cookies
ค่า userAuthToken ที่สุ่มขึ้นมาของการ login ครั้งนี้จะเก็บไว้ใน session การ logout ก็แค่ล้างค่านี้ออกไป

### src/hook.server.ts
hook จะทำงานทุกครั้งเมื่อมี request ไปที่เซิร์ฟเวอร์ ทำให้เราสามารถเปลี่ยน request ที่เข้ามา หรือทำการ response ตามที่ต้องการได้ 
- ตรวจสอบ cookies ที่มีชื่อ session ถ้าไม่มีก็ส่งต่อ resolve()
- หายูสเซอร์ในฐานข้อมูล ที่มีค่า token ตรงกับใน session 
- ถ้าพบเซ็ตค่า event.locals.user ให้เพื่อจะใช้ใน load() ของแต่ละหน้า
- ส่งต่อให้ทำการโหลดหน้าแบบปกติ resolve()

สังเกตจะมีการอ่านฐานข้อมูลเพื่อตรวยสอบทุกครั้งเมื่อมีการ request เพื่อเพิ่มประสิทธิ์ภาพอาจจำเป็นต้องเก็บข้อมูลในหน่วยความจำแทน แต่ถ้าเป็นการเปลี่ยนหน้าของ single page อาจจะไม่มีการ render หน้าใหม่

### event.locals
จะใช้ส่งค่าออปเจ็ก user จาก hook ใช้ฝั่งเซิร์ฟเวอร์ เรียกได้จาก load() 
จะตรวจสอบสิทธิ์ของผู้ใช้งาน ปกป้องข้อมูล และ redirect ไปหน้าที่เหมาะสม 

### $page.data
ใช้เพื่อโหลดช้อมูล user ฝั่ง client จะได้แสดงผลของหน้าตามการ login และ role

