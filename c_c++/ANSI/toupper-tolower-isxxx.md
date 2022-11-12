
``` c
#include <ctype.h>
int toupper (int c);
int tolower (int c); 
int islower (int c);    
int isupper (int c); 
int isalnum (int c);
int isalpha (int c);
int isblank (int c);
int iscntrl (int c);
int isdigit (int c);
int isgraph (int c);
int isprint (int c);
int ispunct (int c);
int isspace (int c);         
int isxdigit (int c);  
```

## toupper()
ใช้ในการเปลี่ยนจากตัวอักษร lower-case ไปเป็นแบบ upper-case ถ้าตัวอักษรนั้นไม่สามารถเปลี่ยนเป็นแบบ upper-case ได้ก็จะได้ c รีเทิร์นกลับมา
## tolower()
ใช้ในการเปลี่ยนจากตัวอักษร upper-case ไปเป็นแบบ lower-case ถ้าตัวอักษรนั้นไม่สามารถเปลี่ยนเป็นแบบ lower-case ได้ก็จะได้ c รีเทิร์นกลับมา
## islower()
ใช้ในการตรวจสอบว่าเป็นตัวอักษรแบบ lower-case หรือเปล่าถ้าไม่ใช่จะรีเทิร์น 0 
## isupper()
ใช้ในการตรวจสอบว่าเป็นตัวอักษรแบบ upper-case หรือเปล่าถ้าไม่ใช่จะรีเทิร์น 0 
## isalnum()
ใช้ในการตรวจสอบว่าเป็นตัวอักษรแบบ alphanumeric ซึ่งจะหมายรวมตัวเลยและตัวอักษรเข้าด้วยกัน ให้ค่าเหมือน (isalpha(c) || isdigit(c))
## isalpha()
ใช้ในการตรวจสอบว่าเป็นตัวอักษรปรกติที่ถูกกำหนดในมาตรฐาน "C"  locale(ภาษาอังกฤษ) ซึ่งจะให้ผลเหมือน  (isupper(c) ||islower(c)) 
## iscntrl()
ใช้ในการตรวจสอบว่าเป็นรหัสควบคุมหรือไม่
## isdigit()
ใช้ในการตรวจสอบตัวเลขระหว่าง 0 ถึง 9
## isgraph()
ใช้ในการตรวจสอบว่าเป็นตัวอักษรที่สามารถพิมพ์ได้หรือไม่ โดยไม่รวม space
## isprint()
ใช้ในการตรวจสอบว่าเป็นตัวอักษรที่สามารถพิมพ์ได้หรือไม่ รวมทั้ง space ด้วย
## ispunct()
ใช้ในการตรวจสอบว่าเป็นตัวอักษรที่สามารถพิมพ์ได้หรือไม่ โดยไม่รวม space กับ alphanumeric ตัวอักษรจำพวกนี้ได้แก่ "~" , "/" "#" ฯลฯ
## isspace()
ใช้ในการตรวจสอบว่าเป็นตัวอักษรที่สามารถพิมพ์ได้ แต่ไม่สามารถมองเห็นได้ (white-space) เช่นการกด Enter(\r) ,กด Tab (\t)
## isxdigit()
ใช้ในการตรวจสอบตัวเลขฐาน 16 ซึ่งจะมีค่าระหว่าง 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f, A, B, C, D, E, F

## รีเทิร์น
ค่าที่ต้องการทดสอบคือค่าใน c ฟังก์ชั่น isxxx() จะใช้ในการทดสอบว่าเป็นจริงหรือเท็จ  ส่วนค่าที่รีเทิร์นกลับมาถ้าไม่เป็นศูนย์ก็คือเป็นไปตามที่ทดสอบ 
ถ้าเป็น 0 ก็แสดงว่าไม่อยู่ในค่าที่ทดสอบ ส่วนฟังก์ชัน toxxx() จะใช้ในการแปลงตัวอักษรในตัวแปร c ให้อยู่ในรูปแบบที่ต้องการ

## ตัวอย่าง
โปรแกรมจะทำการรับค่าเข้ามาจากคีย์บอร์ดโดยเราต้องพิมพ์ตัวอักษรที่ต้องการ แล้วโปรแกรมจะทำการใช้ค่านั้นกับทุกๆฟังก์ชัน
``` c
#include <ctype.h>
main(void)
{
	int c;
	printf("type ascii code(10 base):");
	scanf("%d",&c);
	if(isupper(c))
		printf("Lower case of %c is %c\n",c,tolower(c));
	if(islower(c))
		printf("Upper case of %c is %c\n",c,toupper(c));
	if(isalnum(c))
		printf("It is isalnum:%c\n",c);
	if(isalpha(c))
		printf("It is isalpha:%c\n",c);
	if(iscntrl(c))
		printf("It is iscntrl:%x\n",c);
	if(isdigit(c))
		printf("It is isdigit:%c\n",c);
	if(isgraph(c))
		printf("It is isgraph:%c\n",c);
	if(ispunct(c))
		printf("It is ispunct:%c\n",c);
	if(isprint(c))
		printf("It is isprint:%c\n",c);
	if(isspace(c))
		printf("It is isspace:%x\n",c);
	if(isxdigit(c))
		printf("It is isxdigit:%c\n",c);
}
```

## ผลลัพท์
``` sh
$ ./a.out
type ascii code(10 base):30
It is iscntrl:1e
bash$ ./a.out
type ascii code(10 base):50
It is isalnum:2
It is isdigit:2
It is isgraph:2
It is isprint:2
It is isxdigit:2
$ ./a.out
type ascii code(10 base):67
Lower case of C is c
It is isalnum:C
It is isalpha:C
It is isgraph:C
It is isprint:C
It is isxdigit:C
$ ./a.out
type ascii code(10 base):126
It is isgraph:~
It is ispunct:~
It is isprint:~ 
```
