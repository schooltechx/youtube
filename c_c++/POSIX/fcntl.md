# fcntl

fcntl - ฟังชันสำหรับจัดการ file descriptor
``` c
#include <unistd.h>
#include <fcntl.h>
int fcntl(int fd, int cmd);
int fcntl(int fd, int cmd, long arg);
int fcntl(int fd, int cmd, struct flock * lock); 
```

ฟังก์ชันสำหรับจัดการหรือเปลี่ยนคุณสมบัติของ file descriptor ที่ถูก open แล้ว ปรกติเราสามารถกำหนดคุณสมบัติของ file descriptor 
ตอนที่เราให้ฟังก์ชัน open() เพื่อเปิดไฟล์ ถ้าไฟล์ถูกเปิดเรียบร้อยแล้ว ก็จะใช้ฟังก์ชันนี้เพื่อกำหนดคุณลักษณะให้กับ file descriptor 

## ตัวอย่างการใช้งาน
โปรแกรมจะเปิดไฟล์ขึ้นมาแล้วทำการล็อกไฟล์ นั้นอยู่ 10 วินาที
``` c
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>

error_exit(char message[])
{
	fprintf(stderr,"%s\n",message);
	perror("");
	exit(1);
}
main(int argc, char* argv[])
{
	int fd,result;
	struct flock lock;
	if(argc!=2)
	{
		printf("program pathname\n");
		exit(1); 
	}
	
	fd = open(argv[1],O_RDWR);
	if(fd==-1)
		error_exit("open file fail");
	
	lock.l_type   =  F_WRLCK;
	lock.l_whence = SEEK_SET;
	lock.l_start  = 0;
	lock.l_len    = 0;
	result = fcntl(fd, F_SETLK, &lock);
	if(result==-1)
		error_exit("lock file fail");
	sleep(10);
	close(fd);
}
```

ผลลัพท์

สร้างไฟล์ชื่อ test.txt แล้วเรียกโปรแกรมเพื่อทำการล็อกไฟล์นั้น โดยรันแบบ back ground หลังจากนั้นเรียกโปรแกรมอีกรอบ ซึ่งจะไม่สามารถล็อกไฟล์ได้เพราะ โปรแกรมเดียวกันนี้ที่เรียกครั้งแรกล็อกไฟล์อยู่ 
``` sh
$ echo "Hi" > test.txt	
$ ./a.out ./test.txt &
[1] 24515
$ ./a.out ./test.txt
lock file fail
Permission denied 
```
ข้อสังเกตุโปรแกรมรันคนละโพรเซสกันถ้า โพรเซสแรกไม่ปลดล็อกหรือจบการทำงาน โพรเซสต่อมาจะไม่สามารถล็อกไฟล์ได้ อีกอย่างที่ควรรู้ไว้ถ้าเป็นฟังก์ชันของ 
POSIX เป็นการล็อกแบบ  advisory เท่านั้น โพรเซสอื่นสามารถเขียนหรืออ่านไฟล์ที่ถูกล็อกอยู่ได้ โพรเซสอื่นจะถูกบล็อกก็ต่อเมื่อ พยามล็อกไฟล์ ด้วยฟังก์ชัน 
flock() หรือ fcntl() การกันฟังก์ชัน read() หรือ write() ต้องใช้การล็อกแบบ mandatory 

