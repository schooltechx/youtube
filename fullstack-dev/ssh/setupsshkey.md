# การทำ ssh key
ใช้ public/private เพื่อเข้าใช้งานแทน ยูสเซอร์/รหัสผ่าน ทำให้ไม่ต้องคอยป้อนรหัสใหม่ตอน session เชื่อมต่อซ้ำวิธีการทำเหมือน [การตั้งค่าของ github ](../github/Setup.md)

## สร้าง public/private key

```
ssh-keygen -t rsa -C "me@email.com"
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\sorawit_frappet/.ssh/id_rsa): me
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in me.
Your public key has been saved in me.pub.
The key fingerprint is:
SHA256:DHpe22q3kjnbFbkQvgkOdlyFIjazmax7foV/XtwJ3xI me@email.com
The key's randomart image is:
+---[RSA 3072]----+
|           ..    |
|      = . ..     |
|     o.B .o      |
|     .=+ o . .   |
|    ..+ S.o o.E  |
|    .+ =.+.+ +ooo|
|     .. o=+ o +oo|
|    . . Boo... . |
|     o.oo=o+.    |
+----[SHA256]-----+
ls me*
    Directory: D:\data
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         11/6/2023   8:53 PM           2602 me
-a----         11/6/2023   8:53 PM            567 me.pub
```

## เครื่องโน้ตบุ๊กส่วนตัว
เอาไฟล์สองไฟล์ไปใส่ในโฟลเดอร์ .ssh ในโฮมโฟลเดอร์
- Windows C:\Users\sorawit_frappet\.ssh
- Linux/Mac ~/.ssh

เพิ่มโค้ดด้านล่างใน ~/.ssh/config
```
Host myserver
  User oom
  HostName 192.168.1.100
  ForwardAgent yes
  Port 100
  IdentityFile ~\.ssh\me

```

ถ้ามีปัญหาตัดบ่อยให้ใส่สามบรรทัดนี้ไว้บนสุด ~/.ssh/config
```
Host *
  ServerAliveInterval 300
  ServerAliveCountMax 2
```

## เครื่องเซิร์ฟเวอร์ Linux(myserver)
เอาเนื้อหาของ me.pub ไปใส่ไว้ใน ~/.ssh/authorized_keys ถ้าไม่มีให้สร้างขึ้นมากำหนดสิทธิ์ให้ตัวเราอ่านได้อย่างเดียว
```
chmod og-rw ~/.ssh/authorized_keys
```

## ใช้งานจากเครื่องส่วนตัว
สามารถใช้คำสั่งด้านล่างนี้เพื่อใช้งานโดยไม่ต้องใส่รหัสผ่าน
```
ssh myserver
```
โปรแกรมอื่นๆที่รองรับเช่น VS Code ก็ใช้ Remote SSH เพื่อเข้าใช้งานได้เลย
