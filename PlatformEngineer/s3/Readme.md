# Simple Storage Service(S3)

หรืออีกชื่อหนึ่งเรียก Object Storage ถือเป็น NAS สมัยใหม่มีลักษณะเด่นๆดังนี้

- เก็บข้อมูลเป็น Object แทนที่จะเป็น block โครงสร้างการเก็บค่อนข้างต่างกับระบบไฟล์ตรงที่มีมีจัดที่เก็บอ็อปเจ็กเป็น bucket ไม่มีโฟลเดอร์ ที่เห็นเป็น path ของอ็อปเจ็กที่คล้ายโครงสร้างโฟลเดอร์เป็นแค่เพียง Key ของ object เท่านั้น
- ใช้งานผ่าน API แทนระบบไฟล์โปรแกรมแบบเดิมไม่สามารถใช้งานได้ต้องเป็นโปรแกรมที่ออกแบบมาโดยเฉพาะ
- ทนทานต่อการสูญเสียข้อมูลเหมือน RAID แต่การกู้คืนทำได้เร็วกว่า
- ทำเป็น Cluster สามารถ scale up ได้ง่ายกว่า Web Server และ NAS
- มีความปลอดภัยสูง สามารถสร้าง JWT เพื่อกำหนดสิทธิ์และระยะเวลาในการเข้าถึงอ็อปเจ็กได้ 

ตัวอย่างการใช้งานจะใช้ Minio เพราะมีความเข้ากันได้กับ AWS S3 สามารถใช้แทนกันได้เป็นอย่างดี

การพัฒนาด้วย Node.js [ให้ดูเอกสารนี้](./node/Readme.md)

## Install
[![Minio](https://img.youtube.com/vi/Q0kbsayEOGE/0.jpg)](https://youtu.be/Q0kbsayEOGE "Docker: ติดตั้ง minio เพื่อการพัฒนา")

รุ่นใหม่ตัวแปร MINIO_SERVER_URL ไม่ได้ใช้แล้วให้เอาออก ไฟล์
[compose.yaml](./compose.yaml) ที่อัปเดตล่าสุด


## Backup and Restore
การ  backup/restore ในมุมมองของคนทั่วไปจะเป็นความหมายของ Time machine สามารถย้อนไฟล์ในอดีตมาแทนที่

- Backup การสำรองข้อมูล จะมีการทำ full backup แล้วการสำรองข้อมูลการเปลี่ยนแปลงต่อๆไปจะเป็น Incremental back 

- Restore คือการนำไฟล์ที่สำรองไว้มาแทนที่ ไฟล์ที่โดนลบไป แก้ไขไปแล้ว เสียหาย ฯลฯ จะต้องค้นเริ่มจาก full backup และใน Incremental ทำให้การ restore มักใช้เวลานาน ต้องให้ผู้ดูแลเป็นผู้ทำ

- Snapshot มีลักษระคล้าย Backup พบใน NAS หรือ ZFS แต่จะได้เฉพาะทั้งก้อน VM หรือ Volume ไม่สามารถเลือก restore บางไฟล์ได้

- MiniO สามารถสำเนาข้อมูลออกไปตรงๆ ยกตัวอย่างโปรแกรม mc เป็นการ สำเนาออกมาตรงๆไม่มีการทำ Incremental Backup วิธีนี้อาจจะไม่เหมาะนักเพราะใช้เนื้อที่เก็บมาก

```sh
mc mirror --remove --preserve $MINIO_ENV/<bucket> $BACKUPS_DIR/$BACKUP_NAME
```

## Version and Rewind

เปิดใช้งานที่ bucket จะทำเวอร์ชั่นอัตโนมัติเมื่อออปเจ็กถูกแก้ไข  แลกมากด้วยเนื้อที่ที่เพิ่มขึ้นสำหรับการเก็บ 

 การลบแค่ ข้อมูลจะไม่มีการเขียนทับมีแต่จะเพิ่มขึ้นแม้กระทังการลบก็ไม่ได้เอาออกจริง จำเป็นต้องใช้คู่กับ Life Cycle Management แนะนำให้อ่านบทความ Continuous Data Protection with MinIO Versioning and Rewind

- ตัวอย่างouhเซ็ต alias แล้วเป็น edms3 แสดงการใช้ version ,uคำสั่งพร้อม output บนหน้าจอ 
- สร้าง bucket edms3/test เปิดใช้ version กับ edms3/test
- สร้างไฟล์ hello.txt เนื้อหา “hello1” แล้วอัปโหลดขึ้น edms3/test ทำการแสดงรายการไฟล์
- แก้ไข hello.txt เนื้อหาเป็น “hello2” แล้วอัปโหลดขึ้น edms3/test
- ลบ edms3/test/hello.txt
- แก้ไข hello.txt เนื้อหาเป็น “hello3” แล้วอัปโหลดขึ้น edms3/test
- แสดง version ทั้งหมดที่มีตอนนี้ มี 4 เวอร์ชั่น 

```
oom@debian12ct:~$ mc mb edms3/test
Bucket created successfully `edms3/test`.
oom@debian12ct:~$ mc version enable edms3/test
edms3/test versioning is enabled
oom@debian12ct:~$ echo "hello1" > hello.txt
oom@debian12ct:~$ mc cp hello.txt edms3/test
...ev/vue/contact/hello.txt: 7 B / 7 B ┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃ 64 B/s 0soom@
oom@debian12ct:~$ mc ls edms3/test
[2024-05-30 12:43:39 UTC]     7B STANDARD hello.txt
oom@debian12ct:~$ echo "hello2" > hello.txt
oom@debian12ct:~$ mc cp hello.txt edms3/test
...ev/vue/contact/hello.txt: 7 B / 7 B ┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃ 55 B/s 0s
oom@debian12ct:~$ mc rm edms3/test/hello.txt
Created delete marker `edms3/test/hello.txt` (versionId=475f4d1e-d1f1-4f89-befd-84ec310886e2).
oom@debian12ct:~$ echo "hello3" > hello.txt
oom@debian12ct:~$ mc cp hello.txt edms3/test
/home/oom/hello.txt:         7 B / 7 B ┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃ 52 B/s 0s
oom@debian12ct:~$ mc ls --versions edms3/test
[2024-05-30 12:50:09 UTC]     7B STANDARD d541b9f5-62e1-410f-80ab-e331b2dd84e2 v4 PUT hello.txt
[2024-05-30 12:47:59 UTC]     0B STANDARD 475f4d1e-d1f1-4f89-befd-84ec310886e2 v3 DEL hello.txt
[2024-05-30 12:45:50 UTC]     7B STANDARD 0e824a92-81d3-4d24-8c4a-6ba505497d18 v2 PUT hello.txt
[2024-05-30 12:43:39 UTC]     7B STANDARD b4ed73f5-51d1-445c-9429-a6e1b76da8e5 v1 PUT hello.txt
```

- ทำการย้อนเวอร์ชั่นสุดท้าย จะเหลือแค่สามเวอร์ชั่น
- ทำการสำเนา v2 ออกมาเป็นไฟล์ hello2.txt ที่โฟลเดอร์ปัจจุบัน
- แสดงเนื้อหาไฟล์ v1 บนหน้าจอ
- ลบทุก object ออกจาก bucket แล้วก็ลบ bucket 
- ออกไปทั้งที่มีรุ่นของ object อยู่

```sh
oom@debian12ct:~$ mc undo edms3/test/hello.txt --last 1
✓ Last upload of `hello.txt` (vid=d541b9f5-62e1-410f-80ab-e331b2dd84e2) is reverted.
oom@debian12ct:~$ mc ls --versions edms3/test
[2024-05-30 12:47:59 UTC]     0B STANDARD 475f4d1e-d1f1-4f89-befd-84ec310886e2 v3 DEL hello.txt
[2024-05-30 12:45:50 UTC]     7B STANDARD 0e824a92-81d3-4d24-8c4a-6ba505497d18 v2 PUT hello.txt
[2024-05-30 12:43:39 UTC]     7B STANDARD b4ed73f5-51d1-445c-9429-a6e1b76da8e5 v1 PUT hello.txt
oom@debian12ct:~$ mc cp --vid 0e824a92-81d3-4d24-8c4a-6ba505497d18 edms3/test/hello.txt hello2.txt 
...nology.me/test/hello.txt: 7 B / 7 B ┃▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┃ 55 B/s 0s
oom@debian12ct:~$ cat hello2.txt 
hello2
oom@debian12ct:~$ mc cat edms3/test/hello.txt --vid "b4ed73f5-51d1-445c-9429-a6e1b76da8e5"
hello1
oom@debian12ct:~$ mc rm -r --force edms3/test
oom@debian12ct:~$ mc rb --force edms3/test
Removed `edms3/test` successfully.
```

## Object Locking and Retension
Object Locking ป้องกันการลบ version ของ Object เปิดใช้งานได้เฉพาะตอนสร้าง Bucket ยังสามารถลบออปเจ็ได้โดยเป็นอีกเวอร์ชั่นที่ลบไปแล้ว จะใช้ร่วมกับ 

มีการกำหนดวิธีการและอายุของการล็อก

- compliance ป้องกันทุกยูสเซอร์จากการเขียนทับหรือลบออปเจ็กเวอร์ชั่น ออกจาก bucket
- governance ป้องกันทุกยูสเซอร์จากการเขียนทับหรือลบออปเจ็กเวอร์ชั่น หรือแก้ไขการ lock ออกจาก bucket ยกเว้นจะมีสิทธ์พิเศษ s3:BypassGovernanceRetention หรือ s3:GetBucketObjectLockConfiguration ถึงจะทำได้
```sh
mc retention set --recursive --default MODE DURATION ALIAS/BUCKET
```
[Object Lifecycle Management](https://min.io/docs/minio/linux/administration/object-management/object-lifecycle-management.html)

การ Backup/Restore จะต้องใช้ Version,Object Lock,Retension และ Object Lifecycle Management ร่วมกัน