# Linux User
คำสั่ง Linux สำหรับผู้ใช้งานทั่วไป

## คำสั่งพื้นฐาน
```bash
# ดูตำแหน่งโฟลเดอร์ปัจจุบัน
pwd
# เปลี่ยนโฟลเดอร์(Directory) สองบรรทัดแรกไปที่ home, บรรทัด 3 ไปที่ /etc
cd
cd ~
cd /etc
# สร้างโฟลเดอร์ some-foler, สร้างไฟล์ว่างชื่อ file.txt, แสดงรายการไฟล์โฟลเดอร์
mkdir some-folder
touch file.txt
ls
# ก๊อปปี้ไฟล์ file.txt ไว้ใน some-folder เปลี่ยนเป็นชื่อเป็น file2.txt
cp file.txt some-folder/file2.txt
# เข้า some-folder แสดงรายการไฟล์  
cd some-folder
ls -la
cd ..
rmdir some-folder
rm -R some-folder
# แสดงรายการไฟล์ปัจจุบัน,ลบไฟล์
ls
rm file.txt
# โปรแกรมสร้างและแก้ไขไฟล์ .xxx (ไฟล์ซ่อน), แสดงรายการไฟล์, แสดงรายการไฟล์ซ่อน
nano .xxx
ls 
ls -la
# แสดงเนื้อหาในไฟล์ password ด้วย cat, less , more
cat /etc/password
less /etc/password
more /etc/password
# ดูเอกสาร(manual)การใช้คำสั่ง more
man more
# บีบอัดไฟล์ /etc/passwd ได้ passwd.tgz, แตกไฟล์เป็น ./password, แสดงเนื้อหาไฟล์ password
tar czf passwd.tgz /etc/passwd
tar xzf passwd.tgz 
cat passwd
# เปลี่ยนรหัสผ่าน
passwd
# ใช้คำสั่งของผู้ดูแลระบบโดยการใส่ sudo ไว้ข้างหน้าคำสั่งเช่นอัปเดตรายการโปรแกรม
sudo apt update 
```

## จัดการสิทธ์
เมื่อใช้คำสั่ง ls -la 
- ด้านขวาสุดจะเป็นชื่อไฟล์หรือโฟลเดอร์ . หมายถึงโฟลเดอร์ปัจจุบันที่อยู่ .. หมายถึงโฟลเดอร์ก่อนหน้า
- ด้านซ้ายสุดจะเป็นสิทธิ์ที่กำหนดให้ไฟล์ ตัวอักษรแรกถ้าขึ้นต้นด้วยตัว d จะหมายถึง Directory 
- ตัวที่ 2-4 จะเป็นสิทธ์ของยูสเซอร์ที่กระทำกับไฟล์นี้ได้
- ตัวที่ 5-7 จะเป็นสิทธ์ของยูสเซอร์ที่กระทำกับไฟล์นี้ได้
- ตัวที่ 8-10 จะเป็นสิทธ์ของยูสเซอร์ที่กระทำกับไฟล์นี้ได้

``` bash
oom@Sorawit-Dell:~/training$ ls -la
total 12
drwxr-xr-x  3 oom oom  4096 May  9 16:44 .
drwxr-x--- 23 oom oom  4096 May  9 16:38 ..
-rw-r--r--  1 oom root    0 May  9 16:42 some-file
drwxr-xr-x  2 oom oom  4096 May  9 16:43 some-folder
```
สำหรับยูสเซอร์ทั่วไป สามารถจัดการสิทธิ์ได้เฉพาะไฟล์ที่เป็นเจ้าของเท่านั้น มีสิทธ์สามระดับ คือ User(ตัวเราเอง), Group(กลุ่ม), Other(คนอื่นๆ) 
และมีสิทธ์คือ Read(r), Write(w), Execute(x) 
- สิทธ์ r สามารถอ่านไฟล์หรือแสดงรายการในโฟลเดอร์ได้
- สิทธ์ w สามารถเขียนไฟล์หรือนำไฟล์ใส่โฟลเดอร์ได้
- สิทธ์ x สำหรับไฟล์คือสามารถเรียกใช้แบบโปรแกรมได้ สำหรับโฟลเดอร์จะหมายความว่าเข้าไปข้างในได้

ในตัวอย่าง some-file จะมี oom เป็นเจ้าของ( rw อ่านเขียนได้) และ
เป็นของกลุ่ม root (ใครที่อยู่ในกลุ่ม root จะอ่านได้) นอกนั้นอ่านได้อย่างเดียว

```bash
# เพิ่มสิทธ์การเขียน(Write)ไฟล์ ให้ User, Group, Other 
chmod +w file2.txt
# นำสิทธ์การเขียน(Write)ไฟล์ออกจาก Group, Other 
chmod go-w file2.txt
# เพิ่มสิทธ์การรันโปรแกรม(Execute)ไฟล์ให้ User
chmod u+x file2.txt
# เปลี่ยนโฟลเดอร์, ลบโฟลเดอร์(ลบไม่ได้เพราะว่าโฟลเดอร์มีไฟล์อยู่), ลบโฟลเดอร์พร้อมกับไฟล์โฟลเดอร์ข้างในทั้งหมด 
```
การใช้งานอุปกรณ์ต่างๆใน Linux จะใช้งานเหมือนใช้ไฟล์ การกำหนดสิทธ์ในการใช้งานก็จะเหมือนการกำหนดสิทธ์ให้ไฟล์เช่นกัน

## SSH
การใช้งานแบบ remote ด้วย ssh ปกติจะเปิดให้ใช้อยู่แล้ว (ยูสเซอร์ root ใช้ไม่ได้ ต้องสร้างยูสเซอร์อื่นเพื่อใช้งาน) นอกจากเพื่อเข้าใช้คำสั่งระยะไกลแล้ว ยังสามารถใช้รับส่งไฟล์หรือข้อมูลได้ด้วย

```bash
# login ระยะไกล เข้าใช้งาน ปกติใช้พอร์ต 22, ถ้าใช้พอร์ตอื่นก็ใช้ -p
ssh someone@host.com
ssh someone@host.com -p 1234
# กับการก็อปปี้ไฟล์ไปไว้ในโฟล์เดอร์ที่อยู่บนเซิร์ฟเวอร์ host.com
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

