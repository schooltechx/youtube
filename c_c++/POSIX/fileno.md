# fileno

แสดงหมายเลขไฟล์ descriptor จาก stream
``` c
#include <stdio.h>
int fileno(FILE *stream);  
```
ฟังก์ชันจะรีเทิร์นหมายเลขของไฟล์ descriptor ของ stream ที่เปิดอยู่

## ตัวอย่าง
โปรแกรมแสดงหมายเลขไฟล์ descriptor ของ standard input, output และ error และไฟล์ที่โพรเซสเปิดใช้งาน
``` c
#include <stdio.h>
main (int argc,char *argv[])
{
	FILE *s1, *s2;
	printf("stdin=%d, stdout=%d, stderr=%d\n",
		fileno(stdin),fileno(stdout),fileno(stderr));
	if((s1=fopen(argv[0],"r"))== NULL) 
	{
		perror("can not open file");
		exit(1);
	}
	if((s2=fopen(argv[0],"r"))== NULL) 
	{
		perror("can not open file");
		exit(1);
	}
	
	printf("first open=%d, second open=%d\n"
		,fileno(s1),fileno(s2));
	fclose(s1);
	fclose(s2);
}
```

ผลลัพท์

สังเกตุไฟล์ descriptor จะเป็นหมายเลขที่ว่างถัดไปเรื่อยๆเรียงจากน้อยไปหามาก
``` sh
stdin=0, stdout=1, stderr=2
first open=3, second open=4 
```
