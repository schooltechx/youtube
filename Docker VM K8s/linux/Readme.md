# Linux
คำสั่งสำหรับ Linux ตระกูล debian (เช่น Ubuntu) จะใช้คำสั่งเหล่านี้

# การตั้งค่าเริ่มต้นที่จำเป็น
สร้างยูสเซอร์มาแทน root ถ้ายังไม่มี
```bash
adduser someone
usermod -aG sudo someone
```
ตั้งค่า Timezone และ Locales
```bash
sudo dpkg-reconfigure tzdata
sudo dpkg-reconfigure locales
```

```bash

```

# ติดตั้งโปรแกรม
ตัวอย่างการ อัปเดต, ติดตั้ง curl, ถอนการติดตั้ง curl 
```bash
sudo apt update && apt upgrade
sudo apt install curl
sudo apt remove curl
```

## SSH
การใช้งานแบบ remote ด้วย ssh จะเปิดให้ใช้อยู่แล้ว(ยูสเซอร์ root ใช้ไม่ได้) 
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

## คำสั่งพื้นฐาน
```bash
# ดูตำแหน่งโฟลเดอร์ปัจจุบัน
pwd
# สร้างโฟลเดอร์
mkdir some-folder
# กลับไป home folder, เข้า some-folder 
cd 
cd some-folder

# สร้างไฟล์ว่างชื่อ file.txt, ลบไฟล์, ลบ some-folder และข้างในออกทั้งหมด
touch file.txt
rm file.txt
rm -Rf some-folder
```

