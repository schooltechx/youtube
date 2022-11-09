# istty ttyname

``` c
#include <unistd.h>
char *ttyname(int fildes);
int ttyname_r(int fildes, char *buffer, int buflen);
int isatty(int fildes);
char *ctermid(char *s);
```
ในระบบ UNIX จะใช้ไฟล์ในการอ้างถึงอุปกรณ์ เมื่อเรา login เข้าสู่ระบบจะเป็นการเปิดไฟล์ /dev/tty# (# = หมายเลข) เพื่อที่เราจะได้สามารถใช้งาน terminal ได้ ในแต่ละครั้งที่ login ก็จะมี tty เป็นของตัวเองโดยไม่ซ้ำกับคนอื่น ส่วนไฟล์ /dev/tty จะชี้ไปที่ tty ที่เราใช้อีกทีสมมุติว่าเราใช้ tty6 อยู่ถ้าเราอ้าง /dev/tty ก็จะมีค่าเท่ากับ /dev/tty6 ฟังก์ชันเหล่านี้ส่วนใหญ่ใช้ในการทดสอบว่าเป็น daemon โพรเซสหรือไม่ หรือจะใช้อีกวิธีโดย open("/dev/tty","rw") ว่าเป็น NULL หรือไม่ก็ได้

### isatty() 
จะใช้ในการพิสูจน์ไฟล์  descriptor (fildes)ว่าเปิดจาก tty หรือไม่ จะรีเทิร์น 1 ถ้าไฟล์ descriptor อ้างถึง terminal ถ้าไม่ใช่จะรีเทิร์น 0
### ttyname() 
ใช้หาชื่อ tty จากไฟล์ descriptor (fildes) โดยจะรีเทิร์นพอยเตอร์ของ static buffer ที่เก็บชื่อของ tty ถ้า ไฟล์ descriptor ไม่ได้เกี่ยวข้องกับ terminal (tty) จะได้ NULL กลับมา
### ttyname_r()
ทำงานเหมือนกับ ttyname() แต่จะใส่ค่าในบัฟเฟอร์ buffer ที่จองเอาไว้ ส่วน buflen เป็นขนาดของบัฟเฟอร์ในหน่วยไบต์ ถ้าขนาดของบัฟเพอร์เล็กเกิดไปฟังก์ชันจะส่งค่า -1 กลับมา ฟังก์ชันนี้สามารถใช้กับโปรแกรมแบบมัลติเทรดได้ (Reentrant Interface)
### ctermid()
ทำงานคล้ายๆกันกับ ttyname() แต่จะได้ "/dev/tty" กลับมามันดีกว่า ttyname() ตรงที่เราไม่จำเป็นต้องทราบไฟล์ descriptor ที่ทำการเปิด tty 

## ตัวอย่างการใช้งาน
เป็นที่ทราบกันอยู่ว่า standard input จะใช้ไฟล์ descriptor = 0 ดังนั้นเราจะใช้มันช่วยหาว่าเราใช้ tty หมายเลขใด ลองใช้คำสั่ง tty ก็จะให้ผลคล้ายๆกัน

``` c
#include <stdio.h> 
#include <unistd.h>/*for STDIN_FILENO*/
main ()
{
	char buffer[L_ctermid];
	char buffer2[64];
	if(ctermid(buffer)!=NULL)
		printf("My terminal is %s\n",buffer);
	if(isatty(STDIN_FILENO))
	{
		printf("Current tty is: %s[ttyname]\n",ttyname(STDIN_FILENO));
		if(ttyname_r(STDIN_FILENO,buffer2,64)!= -1)
			printf("Current tty is: %s[ttyname_r]\n",buffer2);
		else
			perror("ttyname_r fail");
	}
	
}
```
ผลลัพท์
``` sh
$ ./a.out
My terminal is /dev/tty
Current tty is: /dev/ttyp2[ttyname]
Current tty is: /dev/ttyp2[ttyname_r]

```
