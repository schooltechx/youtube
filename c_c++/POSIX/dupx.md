# dupx
ฟังก์ชันสำหรับทำการสำเนาไฟล์  descriptor 
``` c
#include <unistd.h>
int dup(int oldfd);
int dup2(int oldfd, int newfd);   
```
ฟังก์ชันสำหรับทำการสำเนาไฟล์  descriptor จากไฟล์ที่เปิดอยู่แล้วและอ้างโดย oldfd ฟังก์ชัน dup จะรีเทิร์น ไฟล์  descriptor 
กลับมาโดยจะเป็นไฟล์  descriptorที่ค่าน้อยที่สุดและว่างอยู่และทำให้ ไฟล์  descriptor นั้นชี้ไปที่ๆ oldfd ชี้ ส่วน dup2 จะทำให้ newfd 
ชี้ไปที่ที่เดียวกับ oldfd  ถ้า newfd ไม่ว่าง(เปิดไฟล์อยู่ก่อนแล้ว) ก็จะทำการปิดไฟล์ที่ newfd ชี้อยู่แล้วถึงจะทำการสำเนาจาก oldfd

## ตัวอย่างโปรแกรม
ทดสอบพิมพ์ Hello1 ออกทาง stdout ปิด stdout ทดลองพิมพ์คำว่า Hello3 สร้างไฟล์ test.txt แล้วทำให้ไฟล์ descriptor 
ที่เป็นของ stdout ไปชี้ที่ไฟล์ที่สร้างขึ้นมาใหม่ ใช้ printf เพื่อเขียนทำว่า Hello3 ซึ่งจะถูกเขียนลงไฟล์ หลังจากนั้นใช้ dup2 เพื่อให้ fd2 
ชี้ไปที่ไฟล์เดียวกับ fd1 เขียน คำว่า Hello3 ลงไป

``` c
#include <fcntl.h>
err_exit(char *msg)
{
	perror(msg);
	exit(1);
}
main ()
{
	int fd1,fd2;
	char buffer[80];
	printf("Hello1\n");
	close(1);
	printf("Hello2\n");
	fd1= creat("./test.txt",0777);
	if(fd1== -1)
		err_exit("create fail");		
	if( fd1 == -1)
		err_exit("can not open file");
	if(dup(fd1)== -1)
		err_exit("dup fail");
	printf("Hello3\n");
	
	if(dup2(fd1,fd2)==-1)
		err_exit("dup2 fail");
	write(fd2,"Hello4\n",sizeof("Hello4\n"));
}
```

## ผลลัพท์
``` sh
$ ./a.out
Hello1
$ cat test.txt
Hello3
Hello4

```
