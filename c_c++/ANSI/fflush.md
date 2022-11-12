# fflush

``` c
#include <stdio.h>
int fflush(FILE *stream);
```

โดยปรกติฟังก์ชันที่ประกาศใน stdio.h จะมีการ buffer เพื่อการใช้งานที่มีประสิทธิ์ภาพ เราต้องรอให้ bufferเต็มเสียก่อนแล้วจะถูกเขียนลงไฟล์ในครั้งเดียวซึ่งจะช่วยลดเวลาในการ access I/O ได้มาก และเมื่อมีการปิดไฟล์ ข้อมูลที่อยู่ใน buffer ก็จะถูกเขียนลงไฟล์จนหมด ในบางครั้งเทคนิคของ buffer นี้ก็ทำให้ผลลัพท์ไม่เป็นไปตามที่เราต้องการนัก ถ้าเราต้องการบังคับให้ข้อมูลที่อยู่ใน buffer(หน่วยความจำ) ถูกเขียนลงไฟล์(stream) ณ เวลานั้น ก็ต้องเรียกฟังก์ชัน fflush() ถ้าพารามิเตอร์ stream เป็น NULL หมายถึง  เขียนข้อมูลที่ค้างอยู่ใน buffer ลงทุกๆไฟล์(stream) ที่ถูกเปิดใช้งานอยู่

## ตัวอย่าง

เมื่อใช้ printf() เขียนข้อความไปยัง terminal จะมีการ buffer บรรทัดต่อบรรทัด ซึ่งจะทำการเขียนข้อมูลจาก buffer ก็ต่อเมื่อจบบรรทัด(เจอ new line) หรือ buffer เต็มแล้วเท่านั้น ส่วน system call write() จะไม่มีการใช้ buffer ต้องใช้ fflush() เพื่อบังคับให้เขียนข้อมูลจาก buffer ไปยัง terminal ให้ลองดูผลลัพท์เพื่อความเข้าใจยิ่งขึ้น
``` c
#include <stdio.h>
#include <unistd.h>
main ()
{
	printf("hello");/*buffered*/
	write(1,"what?",sizeof("what?"));/*unbuffer*/
	printf("\n");
	
	printf("hello");
	/*force to flush  all currently open streams*/
	if(fflush(NULL)!=0)
	{
		perror("fflush fail\n");
		exit(1);
	}	
	write(1,"what?",sizeof("what?"));
	printf("\n");
}
```
## ผลลัพท์
``` sh
$ ./myprogram
what?hello
hellowhat?
```
