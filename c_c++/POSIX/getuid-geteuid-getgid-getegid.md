# getuid geteuid getgid getegid

``` c
#include <unistd.h>
uid_t getuid(void);
uid_t geteuid(void);
gid_t getgid(void);
gid_t getegid(void);  
```
ในระบบรักษาความปลอดภัยของ UNIX ในการใช้ไฟล์จะดูจากผู้ที่ใช้งานถ้าเป็น root (user id = 0) ก็มีสิทธิ์ทุกอย่าง แต่ถ้าไม่ใช่ก็ต้องดูโหมดของไฟล์ว่ายอมให้ใครทำอะไรกับไฟล์บ้าง ซึ่งการใช้งานจะแบ่งเป็นสามประเภทคือ อ่าน(read) เขียน(write) และรัน(execute) และผู้ใช้งานจะแบ่งเป็นสามประเภท คือ เจ้าของไฟล์เอง(user) ผู้ที่อยู่ในกลุ่มเดียวกับเจ้าของไฟล์(group) และ ใครก็ได้(other) แต่มีปัญหาที่ตามมาอย่างหนึ่งก็คืองานบางอย่างต้องใช้สิทธิ์เทียบเท่า root เช่นเปลี่ยน password แต่เราไม่มีสิทธิ์ที่จะเขียนไฟล์ /etc/passwd (กรณีที่ไม่ได้ใช้ shadow passwd) เพราะถ้าเรามีสิทธิ์เขียนไฟล์นั้นเราก็สามารถแก้ passwd ของคนอื่นก็ได้ ดังนั้นจึงต้องมีการสร้างโปรแกรมที่สามารถตรวจว่าผู้ใดใช้โปรแกรมนั้นอยู่ (uid)แล้วทำงานในขอบเขตที่จำกัดโดยสิทธิ์เทียบเท่าเจ้าของไฟล์ (effective uid) ให้ของไปดูไฟล์ /usr/bin/passwd
``` sh
-r-s--x--x   1 root     root        10704 Apr 14 23:21 /usr/bin/passwd 
```
จะเห็นว่ามันมีตัว s ตรงที่เป็นโหมดสำหรับ execute นั่นหมายความว่าผู้ที่รันโปรแกรมนี้จะมีสิทธิ์เทียบเท่า root เนื่องจาก UID เป็นตัวเลขสำหรับยูสเซอร์ทุกคนไม่สามารถเปลี่ยนแปลงได้ ดังนั้น Effective UID ของผู้รันโปรแกรมนี้จะเปลี่ยนเป็น root เท่านั้นเมื่อรันโปรแกรม
### getuid()
แสดง user id จริงของผู้ที่รันโปรแกรม
### geteuid()
แสดง effective user id ของผู้ที่รันโปรแกรม
### getgid()
แสดง group id จริงของผู้รันที่โปรแกรม
### getegid()
แสดง effective group id ของผู้รันที่โปรแกรม

``` c
#include <unistd.h>
main(int argc ,char *argv[])
{
	if(argc!=3)
	{
		printf("Usage: %s UID GID\n",argv[0]);
		exit(1);
	}
	printf("UID  is %d, GID  is %d\n",getuid(),getgid());
	printf("EUID is %d, EGID is %d\n",geteuid(),getegid());
	if(setgid(atol(argv[2]))==-1)
		perror("setgid fail");
	if(setuid(atol(argv[1]))==-1)
		perror("setuid fail");
	printf("UID  is %d, GID  is %d\n",getuid(),getgid());
	printf("EUID is %d, EGID is %d\n",geteuid(),getegid());
}
```

## ตัวอย่าง
ใช้ root คอมไพล์โปรแกรม และลองรันโปรแกรมเพื่อลดสิทธิ์ให้เหลือเท่ายูสเซอร์ oom หลังจากนั้นใส่ suid 
บิตเพื่อให้คนอื่นที่ไม่ใช่ root เมื่อรันโปรแกรมแล้วมี euid เหมือน root ออกจากการเป็น root 
เพื่อกลับไปเป็นยูสเซอร์ oom แล้วลองรันโปรแกรมเพื่อกำหนดสิทธิ์ให้เท่ายูสเซอร์ ftp 
``` sh
$ su
Password:
# gcc program.c 
# ls -la a.out
-rwxr-xr-x   1 root     root        12819 Nov 20 17:10 a.out
# id oom
uid=500(oom) gid=100(users)
# ./a.out 500 100
UID  is 0, GID  is 0
EUID is 0, EGID is 0
UID  is 500, GID  is 100
EUID is 500, EGID is 100
# chmod u+s ./a.out
# ls -la a.out
-rwsr-xr-x   1 root     root        12819 Nov 20 17:10 a.out
# exit
$ id 
uid=500(oom) gid=100(users) groups=100(users)
$ id ftp
uid=14(ftp) gid=50(ftp)
$ ./a.out 14 50
UID  is 500, GID  is 100
EUID is 0, EGID is 0
UID  is 14, GID  is 50
EUID is 14, EGID is 50    
```
