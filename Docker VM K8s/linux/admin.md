# Linux Admin
คำสั่งสำหรับ Linux ตระกูล debian (เช่น Ubuntu) จะใช้คำสั่งเหล่านี้

# ติดตั้งโปรแกรม
ตัวอย่างการ อัปเดต, ติดตั้ง curl, ถอนการติดตั้ง curl 
```bash
sudo apt update && apt upgrade
sudo apt install curl sudo
sudo apt remove curl
```
# การตั้งค่าเริ่มต้นที่จำเป็น
สร้างยูสเซอร์มาแทน root ถ้ายังไม่มี แล้วให้สิทธ์ใช้ sudo
```bash
adduser someone
usermod -aG sudo someone
```
ตั้งค่า Timezone และ Locales
```bash
sudo dpkg-reconfigure tzdata
sudo dpkg-reconfigure locales
```

