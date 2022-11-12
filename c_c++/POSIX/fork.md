# fork

``` c
#include <unistd.h>
pid_t fork(void);
pid_t vfork(void);
```
ในระบบปฎิบัติการของ UNIX เวลาจะรันโปรแกรมอีกตัวขึ้นมาให้เป็นอีกโพรเซส 
จะใช้การสร้างโพรเซสใหม่ขึ้นมาโดยจะทำสำเนาตัวเองขึ้นมาก่อนด้วยฟังก์ชัน fork() 
แล้วถึงจะไปเอาโปรเซสที่สร้างขึ้นมาใหม่ไปเรียกโปรแกรมที่ต้องการอีกที ด้วยฟังก์ชัน exec() 
หลังจาก fork จะได้อีกโพรเซสซึ่งเหมือนโพรเซสเดิมทุกประการ ต่างกันก็ตรงโพรเซส ID หลังจากเรียก exec() 
โพรเซสก็ยังเหมือนเดิมต่างตรงที่โค้ดของโปรแกรมที่โพรเซสรันอยู่เป็นโค้ดอันใหม่ ส่วน vfork 
ทำงานเหมือนกับ fork แต่ต่างตรงที่มันถูกออกแบบให้ประหยัดทรัพยากรมากว่า เพราะการ fork 
ในแต่ละครั้งจำเป็นต้องมีการก๊อปปี้ข้อมูลในหน่วยความจำจาก parent ไปยัง child 
ซึ่งปรกติแล้วหลังจาก fork มันจะเรียก exec ทันทีซึ่งข้อมูลที่ทำการก๊อปปี้มาก็ไม่ได้ใช้ประโยชน์อะไร vfork จะให้ child 
ใช้หน่วยความจำรวมกับ parent จะมีการก๊อปปี้ก็ต่อเมื่อข้อมูลในหน่วยความจำมีการเปลี่ยนแปลงเท่านั้น 
เราสามารถใช้ vfork แทน fork ได้แต่มีอีกหลายประการที่เราควรคำนึง เนื่องจาก vfork ไม่ได้มีให้ใช้ใน UNIX ทุกเวอร์ชัน
ดังนั้นถ้าต้องการให้โปรแกรมพอร์ทเทเบิล ก็ควรหลีกเลี่ยง และ vfork ไม่ได้เหมือนกับ fork เลยทีเดียว หลังจากเรียก vfork() 
แล้ว parent โพรเซสจะหยุดทำงานชั่วคราว และ  child โพรเซสจะยืมหน่วยความจำของ parent ไปใช้ ถ้า child 
มีการเขียนหน่วยความจำก็จะเกิดการก๊อปปี้หน่วยความจำทันที ดังนั้น child ควรเรียกเรียก exec ทันที หรือจะ exit ก็ได้ 
ให้สังเกตุจากตัวอย่าง ถ้าจะ exit เวลานี้ต้องใช้ _exit() ไม่ใช่ exit() เพราะการเรียก exit() 
จะบังคับให้เกิดการ flush standard IO ถึงสองหนจาก child และ จาก parent เมื่อ parent จบการทำงาน การ temp ไฟล์อาจเกิดปัญหาได้ด้วย

รีเทิร์นของ 
- ถ้าเป็น parent process จะได้ ID ของ child 
- ถ้าเป็น child process จะได้ 0 
- ถ้า fork ไม่ได้จะได้ -1

สิ่งที่ child ได้รับการถ่ายทอดจาก parentซ
- process credentials (real/effective/saved UIDs and GIDs) 
- environment 
- stack 
- memory 
- open file descriptors (note that the underlying file positions are shared between the parent and child, which can be confusing) 
- close-on-exec flags 
- signal handling settings 
- nice value 
- scheduler class 
- process group ID 
- session ID 
- current working directory 
- root directory 
- file mode creation mask (umask) 
- resource limits 
- controlling terminal 

สิ่งที่ child ไม่เหมือน parent
- process ID 
- different parent process ID 
- Own copy of file descriptors and directory streams. 
- process, text, data and other memory locks are NOT inherited. 
- process times, in the tms struct 
- resource utilizations are set to 0 
- pending signals initialized to the empty set 
- timers created by timer_create not inherited 
- asynchronous input or output operations not inherited 

ตัวอย่างโปรแกรม
``` c
#include <unistd.h>
#include <stdio.h>
main()
{
	int pid;
	switch (pid = fork())
	{
	case -1:    
	    perror("The fork failed!");
	    break;
	case 0:
		printf("I am child\n");
		_exit(0);

	default:
	    /* pid greater than zero is parent getting the child's pid */
	    printf("I am parent. Child's pid is %d\n",pid);
	}
	exit(0);
}
```
