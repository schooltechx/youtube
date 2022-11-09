# str
ฟังก์ชันสำหรับค้นหาตัวอักษรหรือ string

``` c
char *strchr(const char *s, int c);
char *strrchr(const char *s, int c);
char *strpbrk(const char *s1, const char *s2);
char *strstr(const char *s1, const char *s2);
size_t strspn(const char *s1, const char *s2);
size_t strcspn(const char *s1, const char *s2);
```

### strchr(const char *s, int c);
ใช้ค้นหาตัวอักษร c ที่อยู่ใน s 
### strrchr(const char *s, int c);
ใช้ค้นหาตัวอักษร c ที่อยู่ใน s แบบย้อนกลับจากหลังมาหน้า
### strpbrk(const char *s1, const char *s2);
หาจุดเริ่มต้นของ string ที่พบตัวแรก โดยตัวแรกที่พบต้องเป็นตัวอักษรใดตัวอักษรหนึ่งใน s2
### strstr(const char *s1, const char *s2);
หาจุดเริ่มต้นของ string s2 ที่อยู่ใน s1 
### strspn(const char *s1, const char *s2);
บอกจำนวนตัวอักษรที่อยู่ในเซ็ต s2 ที่พบใน s1 เริ่มจากตัวอักษรแรก เมื่อเจอตัวอักษรที่ไม่อยู่ในเซ็ตก็จะเลิกค้นหาทันที
### strcspn(const char *s1, const char *s2);
บอกจำนวนตัวอักษรที่อยู่ไม่อยู่ในเซ็ต s2 ที่พบใน s1 เริ่มจากตัวอักษรแรก เมื่อเจอตัวอักษรที่อยู่ในเซ็ตก็จะเลิกค้นหาทันที

## รีเทิร์น
string ที่พบ(พอย์เตอร์ของ char) ยกเว้น strspn() และstrcspn() ค่าที่รีเทิร์นจะเป็นขนาดของตัว string ที่พบ 

## ตัวอย่าง
เพื่อความเข้าใจยิ่งขึ้นให้ลองแก้ค่าของ s2 หรือ c จะได้เข้าใจมากยิ่งขึ้น
``` c
#include <stdio.h>
#include <string.h>
main()
{
	size_t size;
	char *sp;
	char s[]="12a4567a90aBCDaF";
	printf("%s[full string]\n",s);
	if((sp=strchr(s,'a'))!=NULL)/*find char forword*/
		printf("%s[strchr(a)]\n",sp);
	if((sp = strrchr(s,'a'))!=NULL)/*find char reword*/
		printf("%s[strrchr(a)]\n",sp);
	if((sp= strstr(s,"a90aB"))!=NULL )/*find exact string from head only*/
		printf("%s[strstr(a90aB)]\n",sp);
	if((sp= strpbrk(s,"DAF90"))!=NULL )/*find any string that match set*/
		printf("%s[strpbrk(DAF90)]\n",sp);
	size = strspn(s,"9854321a");/*in set*/
		printf("%d[strspn(9854321a)]\n",size);
	size = strcspn(s,"9845");/*out set*/
		printf("%d[strcspn(9845)]\n",size);
}	
```
## ผลลัพท์

``` sh
$ ./a.out
12a4567a90aBCDaF[full string]
a4567a90aBCDaF[strchr(a)]
aF[strrchr(a)]
a90aBCDaF[strstr(a90aB)]
90aBCDaF[strpbrk(DAF90)]
5[strspn(9854321a)]
3[strcspn(9845)]
``` 
