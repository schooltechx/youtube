# perror strerror
แสดง error ของฟังก์ชัน
``` c
#include <errno.h>
void perror(const char *s);
extern int errno;
extern char *sys_errlist[];
extern int sys_nerr;
```
``` c
#include <string.h>
char *strerror(int errnum);                     
``` 
เมื่อเราเรียกฟังก์ชัน ฟังก์ชันส่งค่าเช่น -1 กลับมาเพื่อแสดงว่าทำงานไม่สำเร็จ บางฟังก์ชันจะเซ็ตค่า errno ซึ่งเป็นตัวแปรแบบ global 
เพื่อแสดงรายละเอียดของข้อผิดพลาดนั้นๆด้วย และ ถ้าต้องการหาคำอธิบายของข้อผิดพลาดนั้นๆ ให้เอาหมายเลยที่ได้จาก errno 
ไปเทียบหา string ที่เก็บในอาเรย์ sys_errlist แต่การอ่านจากตัวแปรโดยตรงไม่พอร์ตเทเบิล เราควรใช้ฟังก์ชัน  perror หรือ 
strerror ในการแสดงคำอธิบายของข้อผิดพลาดนั้นๆ 

## ตัวอย่างการใช้งาน
สังเกตุจะใช้ fopen() เปิดไฟล์ที่ไม่มีอยู่จริงเพื่อเป็นการสร้าง error
``` c
#include <stdio.h>
#include <string.h>
#include <errno.h>
extern int errno;
extern int sys_nerr; /*Not POSIX or ANSI*/
extern char *sys_errlist[]; /*Not POSIX or ANSI*/
main()
{
	char buffer[1024];
	printf("%s:%d:%d\n",sys_errlist[errno],sys_nerr,errno);
	fopen("ha ha ha","r"); /*open fake file to make error*/
	perror("[perror     ]");
	strerror_r(errno, buffer, 1024);
	printf("[strerror   ]%s:\n",buffer);
	printf("[sys_errlist]:%s:%d\n",sys_errlist[errno],errno);
}
```
ผลลัพท์
``` sh
$ ./a.out
Error 0:251:0
[perror     ]: No such file or directory
[strerror   ]No such file or directory:
[sys_errlist]:No such file or directory:2  
```
