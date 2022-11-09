# strtok

แบ่ง string เป็นคำๆโดยอาศัยตัวอักษรที่กำหนด
``` c
#include <string.h>
char *strtok(char *s, const char *delim);        
``` 
ใช้ในการแบ่ง string s ออกเป็นส่วนๆ(token) โดยอาศัยตัวอักษรที่อยู่ใน delim (delimiter) ในการแบ่ง string ออกเป็น token ถ้า s เห็น NULL มันจะทำการส่ง token ถัดไปออกจากตำแหน่งของ string ที่เก็บไว้ครั้งล่าสุด ให้ลองดูตัวอย่างจะเห็นว่าครั้งแรก s ต้องไม่เป็น NULL และครั้งต่อๆให้เป็น NULL หมายถึงต้องการ Token ถัดไปของ string นั้นๆ ระวังการใช้งานไว้อย่างว่าทุกครั้งที่ strtok พบ delim มันจะถูกแทนด้วย NULL นั้นแสดงว่าค่าของ s ถูกแก้ไขทุกครั้งที่เรียกฟังก์ชัน

## ตัวอย่าง
การแบ่งเป็นคำๆโดยดูจากเครื่องหมาย ':' และ ',' (ถ้าสังเกตุดีๆตัวอย่างเอามาจากไฟล์ /etc/passwd) เวลาพิมพ์ผลลัพท์ออกจะจะใช้เครื่องหมาย '|' เพื่อให้ดูได้ง่าย

``` c
#include <string.h>
#include <limits.h>
char* c;
char passwd[]=
"oom:*:16497:12075:Oom kub,Bangkok,7127000,12:/home/oom:/usr/bin/ksh";
main()
{
	printf("%s\n",passwd);
	c=strtok(passwd,":,");
	while(c!=NULL)
	{
		printf("%s|",c);
		c=strtok(NULL,":,");
	}
	printf("\n%s\n",passwd); /*passwd already change*/
}
```
ผลลัพท์
``` sh
$ ./b
oom:*:16497:12075:Oom kub,Bangkok,7127000,12:/home/oom:/usr/bin/ksh
oom|*|16497|12075|Oom kub|Bangkok|7127000|12|/home/oom|/usr/bin/ksh|
oom
```
