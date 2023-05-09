# Linux Admin
คำสั่งสำหรับ Linux ตระกูล debian (เช่น Ubuntu) จะใช้คำสั่งเหล่านี้

# เกี่ยวกับระบบ

```bash
# อัปเดตรายการโปรแกรมล่าสุด, อัปเกรดโปรแกรม, ติดตั้ง curl, ถอนการติดตั้ง curl 
apt update && apt upgrade
apt install curl sudo
apt remove curl
# ตั้งค่า Timezone และ Locales
dpkg-reconfigure tzdata
dpkg-reconfigure locales

```

# การจัดการสิทธิ์

```bash
# สร้างยูสเซอร์มาแทน root ถ้ายังไม่มี แล้วให้สิทธ์ใช้ sudo ได้
adduser someone
usermod -aG sudo someone
# เปลี่ยนรหัสผ่านของ someone
passwd someone
```


