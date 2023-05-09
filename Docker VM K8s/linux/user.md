# Linux User
คำสั่ง Linux สำหรับผู้ใช้งานทั่วไป

## คำสั่งพื้นฐาน
```bash
# ดูตำแหน่งโฟลเดอร์ปัจจุบัน
pwd
# สร้างโฟลเดอร์ some-foler, สร้างไฟล์ว่างชื่อ file.txt, แสดงรายการไฟล์โฟลเดอร์
mkdir some-folder
touch file.txt
ls
# ก๊อปปี้ไฟล์ file.txt ไว้ใน some-folder เปลี่ยนเป็นชื่อเป็น file2.txt
cp file.txt some-folder/file2.txt
# เข้า some-folder แสดงรายการไฟล์  
cd some-folder
ls -la
# แก้ไขเพิ่มสิทธ์การเขียน(Write)ไฟล์ file2.txt ให้ Group, Other 
chmod go+w file2.txt
# เปลี่ยนโฟลเดอร์, ลบโฟลเดอร์(ลบไม่ได้เพราะว่าโฟลเดอร์มีไฟล์อยู่), ลบโฟลเดอร์พร้อมกับไฟล์โฟลเดอร์ข้างในทั้งหมด 
cd ..
rmdir some-folder
rm -R some-folder
# แสดงรายการไฟล์ปัจจุบัน,ลบไฟล์
ls
rm file.txt
# โปรแกรมสร้างและแก้ไขไฟล์ .xxx, แสดงรายการไฟล์, แสดงรายการไฟล์ซ่อน
nano .xxx
ls 
ls -la
```

## SSH
การใช้งานแบบ remote ด้วย ssh ปกติจะเปิดให้ใช้อยู่แล้ว (ยูสเซอร์ root ใช้ไม่ได้ ต้องสร้างยูสเซอร์อื่นเพื่อใช้งาน) 
ตัวอย่างการ login เข้าใช้งานกับการก็อปปี้ไฟล์
```bash
ssh someone@host.com
scp ./file.txt someone@host.com:~/folder/file.txt
```
สำหรับเครื่อง(Local)ที่ใช้งานอยู่ (Windows/Mac/linux) ควรสร้าง ssh key ไว้ใช้แทน user pasword ในการ login แล้ว
```bash
ssh-keygen
ssh-copy-id remote_user@host
```
ก็อป Public Key ไปไว้ใน เซิร์ฟเวอร์ วินโดว์ไม่มีคำสั่ง ssh-copy-id ให้ก็อป ข้อความใน C:\Users\sorawit_frappet\.ssh\id_rsa.pub ไปใส่ไว้ที่ ~/.ssh/authorized_keys ของเครื่อง remote
```bash
ssh-copy-id remote_user@host
```
ถ้าเก็บ private key ไว้เป็นชื่อหรือตำแน่งอื่นให้ใช้
```bash
ssh -I ~/.ssh/my_private_key remote_user@host
```

