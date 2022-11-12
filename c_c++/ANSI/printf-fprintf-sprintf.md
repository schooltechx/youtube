# printf fprintf sprintf

``` c 
#include <stdio.h>
int printf(const char *format, [arg, [arg]...]);
int fprintf(FILE *stream, const char *format,  [arg, [arg]...]);
int sprintf(char *s, const char *format, [arg, [arg]...]);
```
ทั้งสามฟังก์ชันใช้ในการจัดรูปแบบของการแสดง string การใช้งานเหมือนกันทุกประการแต่ output 
จะต่างกัน โดยที่ printf() จะแสดงออกทางหน้าจอ(stdout) , fprintf() จะแสดงออกไปที่ไฟล์ , 
sprintf() จะแสดงออกไปที่ buffer

## ตัวอย่างอย่างง่าย 
``` c
#include <stdio.h>
#define LINE_MAX 100
main()
{
	FILE *stream;
	char buffer[LINE_MAX];
	stream = fopen("./test.txt","wb");	
	fprintf(stream,"hello fprintf\n");
	fclose(stream);
	printf("hello printf\n");
	sprintf(buffer,"hello sprintf\n");
	printf("%s",buffer);
}
```
ผลลัทพ์ Note: ผลลัพท์ของ fprintf ต้องดูที่ไฟล์ test.txt
``` sh
$ ./myprogram
hello printf
hello sprintf
$ ls *.txt
test.txt
$ cat test.txt
hello fprintf
```

## ตัวอย่างแบบซับซ้อน
เนื่องจากทั้งสามฟังก์ชันทำงานคล้ายกันดังนั้นจะแสดงแค่ printf()
``` c
#include <stdio.h>
main()
{
	printf("%d:%d:%d|%o:%o:%o|%x:%x:%x\n" ,46,056,0x2E,46,056,0x2E,46,056,0x2E);/*dec|oct|hex*/
	printf("%d:%i:%u|%o|%x:%X\n:" ,-2,-2,-2,-2,-2,-2);/*dec|oct|hex*/
	printf("%c:%c:%c:%c:%c:%s:\n" ,'K',75,0113,0x4b,"Ya!"[1],"Hay");/*char,number and string*/
	printf("%+d:%+o:%+x:%+X:\n" ,-30,-30,-30,-30);
	printf("%#d:%#o:%#x:%#X:\n" ,-30,-30,-30,-30);
	printf("%6s:%6s,%4d:%4d:\n" ,"How are you","Hi",1234567,24);/*width*/
	printf("%.6s:%.6s:%.4d:%.4d:\n" ,"How are you","Hi",1234567,24);/*precision*/
	printf("%06s:%06d|%-6s:%-6d\n","Wow",69,"Wow",69);/*patch space with zeor|left align */
	printf("\t:%%:\\:x\b\':\":\101\n");/*some escape sequences*/
	printf("%e:%E:%f:%.2f:%g:%G\n" ,0.000012,0.000012,0.23,0.23,0.000012,0.000012);/*real*/
	printf("%x:%x|%p:%p\n" ,&num,"hello",&num,"hello");/*pointer*/
	printf("%s%n%s\n","123456",&num,"7890");/*count char in stream*/
	printf("%d\n",num);/*number of char after count*/
}
```
ผลลัพท์ 
``` sh
$ ./myprogram
46:46:46|56:56:56|2e:2e:2e
-2:-2:4294967294|37777777776|fffffffe:FFFFFFFE
:K:K:K:K:a:Hay:
-30:37777777742:ffffffe2:FFFFFFE2:
-30:037777777742:0xffffffe2:0XFFFFFFE2:
How are you:    Hi,1234567:  24:
How ar:Hi:1234567:0024:
000Wow:000069|Wow   :69
        :%:\:':":A
1.200000e-05:1.200000E-05:0.230000:0.23:1.2e-05:1.2E-05
7b03a508:40001210|7b03a508:40001218
1234567890
6               
``` 
## การกำหนดฟอร์แมตของการแสดงผล

%[flags] [width] [.precision] [{h | l | I64 | L}]type

## escape sequences
ใช้ในการณีที่ต้องการเขียน ASCII ที่ไม่สามารถพิมพ์ได้โดยตรง เพราะไม่มีจากแป้นพิมพ์ (เช่น control characters ) หรือตรงกับตัวอักษรที่เป็นคำสวนสำหรับคอมไพล์เลอร์ (เช่น %)

\a   alert, เสียงบีบ

\b   backspace :เลื่อนเคอร์เซอร์ไปทางซ้ายแล้วเขียนทับด้วยช่องว่า

\f   form-feed

\n   new-line : เท่ากับกด Enter ใน UNIX ,ในดอสใช้ \r\n

\r   carriage return 

\t   tab , กด 

\v   vertical tab 

\'   single quote character 

\\   backslash

\n   the 8-bit character whose ASCII code is the 1-, 2-, 3-, or 4-digit 

## type 
c single-byte character :ตัวอักษรขนาดแปดบิต (ดูตาราง ASCII)

d decimal :จำนวนเต็มฐานสิบ

i integer: จำนวนเต็มฐานสิบ

u Unsigned decimal integer : จำนวนเต็มบวกฐานสิบ (0 ถึง 9)

o Unsigned octal integer: จำนวนบวกเต็มฐานแปด (0 ถึง 7)

x int Unsigned hexadecimal : จำนวนเต็มบวกฐานสิบหก (0 ถึง f)

X int Unsigned hexadecimal : จำนวนเต็มบวกฐานสิบหก (0 ถึง F)

e  double : อยู่ในฟอร์แมต [-]d.dddd e [sign]ddd โดยที่ d คือเลขหนึ่งหลัก

E double : เหมือนกับแบบ e แต่ตรงเอ็กโปเนนเชียลจะใช้ "E" แทน "e"

f double : อยู่ในฟอร์แมต [-]dddd.dddd เหมือนแบบ "e" แต่ไม่มีการพิมพ์เอ็กโพเนนเชียล "e" ออกมา

g double : จะเหมือนกับแบบ f หรือ e (กรณีที่ทศนิยมต่ำกว่าสี่หลัก) แค่จะกระทัดรัดกว่าคือจะไม่แสดงศูนย์ในตำแหน่งที่ไม่จำเป็น

G double : เหมือนแบบ g แค่ตรงเอ็กโพเนนเชียลจะใช้ "E" แทน "e"

n pointer to number: ไม่มีการแสดงค่าใดๆ ใช้ในการนับจำนวนตัวอักษร ณ ตำแหน่งนั้นใน  stream ของตัวอักษร(ดูตัวอย่าง)

p Pointer to void Prints the address : แสดง address ในรูปของเลขฐาน16

s String : แสดง string (array of char) โดยที่ตัวอักษรแต่ละตัวมีขนาด 1 ไบต์

S String When used with printf functions, specifies a wide-character string; when used with wprintf functions, 
specifies a single-byte–character string. Characters are printed up to the first null character or until the precision value is reached. 
