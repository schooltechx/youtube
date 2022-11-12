# exit exit atexit
```
#include <stdlib.h>
void exit(int status); 
int atexit(void (*func)(void)); 
#include <unistd.h>
void _exit(int status);
``` 
### atexit() 
ใช้ในการ รีจิสเตอร์ฟังก์ชันที่ต้องการให้มีการเรียกก่อนจบโปรแกรม โดยการเรียกโปรแกรมจะเป็นลำดับจากฟังก์ชันที่รีจิสเตอร์ครั้งล่าสุดไปหาครั้งแรกสุด ฟังก์ชันที่เรามาทำการรีจิสเตอร์นี้ไม่ควรมีการเรียก exit() อยู่ข้างใน เพราะอาจจะได้ผลที่ไม่ได้คาดคิดเอาไว้
### exit(),_exit()
ฟังก์ชันใช้เหล่านี้สำหรับการจบโปรแกรม เมื่อเรียกโปรแกรมจะจบการทำงานทันที ปรกติโปรแกรมจะจบการทำงานก็ต่อเมื่อ มันรันไปถึงบรรทัดสุดท้ายของฟังก์ชัน main() แต่การเรียก exit เป็นการบอกให้โปรแกรมจบการทำงาน ตรงจุดที่เราต้องการ ทั้ง _exit() กับ exit() ทั้งสองอันทำงานเหมือนกันแต่ต่างตรงที่ _exit() เป็น system call ส่วน exit() เป็น standard library ที่เรียก _exit() ข้างในอีกทีหนึ่ง การทำงานของ exit() เป็นดังนี้

1. เรียกฟังก์ชันที่รีจิสเตอร์ด้วย atexit() จากหลังมาหน้า
2. stream สำหรับ output ที่เปิดอยู่จะมีการ flush (เขียนข้อมูลในบัฟเฟอร์ออกไปจนหมด) 
3. ปิด stream ที่เปิดอยู่
4. เรียก _exit()

การทำงานของ _exit() เป็นดังนี้

1. ปิดไฟล์ descriptor ที่เปิดอยู่ทั้งหมด
2. ถ้าโพรเซสแม่(parent)เรียกฟังก์ชัน wait() หรือ waitpid() อยู่ก็จะถูกปลุกขึ้นมา(ได้ status รีเทิร์นกลับมาด้วย) 
3. If the parent is not executing a wait() or waitpid() , the status is saved for return to the parent on  a subsequent wait() or waitpid().
4. โพรเซสลูก(child) ของโพรเซสที่จะจบการทำงานนี้ก็จะย้ายตัวเองไปมีโพรเซสแม่ใหม่ การที่โพรเซสแม่จบการทำงานไม่ได้หมายความว่าโพรเซสลูกจะต้องจบการทำงานด้วย
5. ถ้ามีจับซิกแนล SIGCHLD ซิกแนล SIGCLD ก็จะถูกส่งให้โพรเซสแม่ของโพรเซสที่จบการทำงาน
6. ส่งซิกแนลสำหรับ job control ออกไป
7. คืนทรัพยากรณ์ที่โพรเซสใช้ให้กับระบบ

โปรแกรมทั่วๆไปควรใช้ exit() การใช้ _exit() จะใช้เมื่อโปรแกรมเมอร์จงใจที่จะไม่ให้เกิดการ flush บัฟเฟอร์ของ stream และมีการเรียกฟังก์ชันที่รีจิสเตอร์เอาไว้ก่อนจบการทำงาน

## ค่าส่งกลับ
exit() และ_exit() ไม่มีการรีเทิร์นเมื่อเรียกแล้วจบการทำงานไปเลย

atexit() ได้ 0 ถ้าสำเร็จนอกเหนือจากนั้นแสดงว่า error

## ตัวอย่างการใช้งาน
โปรแกรมแสดงถึงการใช้งานทั้งทั้งสามฟังก์ชันสังเกตุข้อความ "buffered text" เป็นการจงใจที่จะให้ output ค้างอยู่ในบัฟเฟอร์ โดยปรกติแล้วการใช้ printf ภายในบรรทัดเดียวโดยไม่มี newline (\n) ถ้าข้อความไม่เกินขนาดของบัฟเฟอร์มันก็จะยังค้างอยู่ในบัฟเฟอร์จะพิมพ์ออกมาเมื่อบัฟเฟอร์เต็มหรือมีการเครื่องหมายสำหรับขึ้นบรรทัดใหม่เท่านั้น และอย่าลืมสังเกตุลำดับของการรีจิสเตอร์ฟังก์ชัน กับผลลัพท์ที่ได้
``` c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
void hook1()
{
	printf("exit hook1\n");
}
void hook2()
{
	printf("exit hook2\n");
}
void hook3()
{
	printf("exit hook3\n");
}
main()
{
	char answer[80];
	if(atexit(hook1)!=0 )
		perror("atexit 1");
	if(atexit(hook2)!=0 )
		perror("atexit 2");
	if(atexit(hook3)!=0 )
		perror("atexit 3");
	printf("Do you want _exit()? Y/N: ");
	scanf("%s",answer);
	printf("Start exit program \n");
	if((answer[0]=='Y')||answer[0]=='y')
	{
		printf("buffered text");
		_exit(0);
	}
	else
	{
		exit(0);
	}
}
```
ผลลัพท์
``` sh
$ ./a.out
Do you want _exit()? Y/N: n
Start exit program
buffered text
 exit hook3
 exit hook2
 exit hook1
$ ./a.out
Do you want _exit()? Y/N: y
Start exit program
``` 

## อ่านต่อ
fork(สำหรับ _exit())
