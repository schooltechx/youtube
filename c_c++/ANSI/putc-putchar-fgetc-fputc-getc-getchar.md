# putc putchar fgetc fputc getc getchar
``` c
#include <stdio.h>
int putc(int c, FILE *stream);
int putchar(int c);
int getc(FILE *stream);
int getchar(void);
int fgetc(FILE *stream);
int fputc(int c, FILE *stream);
```
ฟังก์ชันเหล่านี้เหมาะกับการอ่านและเขียนข้อมูลทีละตัวอักษร 

### putc(),fputc()
ทั้งคู่ใช้ในการเขียนตัวอักษรหนึ่งตัวลงไปในไฟล์(stream) แต่แตกต่างกันตรงที่ fputc() เป็นฟังก์ชันแต่ putc เป็นมาโคร ดังนั้นต้องระวังการใช้งานด้วยเพระว่ามาโครไม่เหมือนกับฟังก์ชันเลยทีเดียวนัก
### getc(),fgetc()
ทั้งคู่ใช้ในการอ่านตัวอักษรหนึ่งตัวจากไฟล์(stream) แต่แตกต่างกันตรงที่ fgetc() เป็นฟังก์ชันแต่ getc เป็นมาโคร
### putchar()
putchar(c) ใช้งานเหมือน putc(c,stdout) โดยที่ตัวอักษรจะไปเขียนในไฟล์มันจะถูกเขียนออกมาทางหน้าจอแทน 
### getchar()
getchar() ใช้งานเหมือน getc(stdin) โดยที่ตัวอักษรแทนที่จะถูกอ่านจากไฟล์มันจะถูกอ่านจากคีย์บอร์เข้ามาแทน

## ตัวอย่างการใช้งาน 
ในตัวอย่างจะไม่แสดง getc และ putc เพราะมันใช้งานเหมือน fgetc และ fputc โปรแกรมจะทำการอ่านตัวอักษรจากคีย์บอร์ดด้วย getchar() แล้วเขียนลงไฟล์ด้วย fputc() ไปที่ไฟล์ test.txt เราจะหยุดการอ่านค่าคีย์บอร์ดด้วย Ctrl+D (อาจจะต้องกดสองครั้งเพราะมันถูก buffer เอาไว้) หลังจากนั้นโปรแกรมจะทำการเปิดไฟล์แล้วใช้ fgetc() อ่านจากไฟล์ขึ้นมาทีละตัวอักษรแล้วพิมพ์ออกทางหน้าจอด้วย putchar()
``` c
#include <stdio.h>
FILE *target;
int c ,i;
char testfile[] = "test.txt";

main (int argc,char *argv[])
{
	if((target=fopen(testfile,"w"))==NULL)
	{
		perror("can not create target file \n");
		exit(1);
	}
	for(;;)
	{
		c = getchar();
		if(c==EOF)
			break;		
		fputc(c,target);	
	}
	fclose(target);
	printf("\nCreate file finish I will try to open it\n");
	if((target=fopen(testfile,"r"))==NULL)
	{
		perror("can not open target file \n");
		exit(1);
	}
	for(;;)
	{
		c = fgetc(target);
		if(c==EOF)
			break;		
		putchar(c);
	}
	fclose(target);
	putchar('\n');
} 
```
