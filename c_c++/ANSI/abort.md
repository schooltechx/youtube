# abort
``` c
#include <stdlib.h>
void abort(void); 
```
ใช้ในการยกเลิกการทำงานของโปรแกรมโดยมันจะปิดไฟล์ที่กำลังเปิดอยู่ทั้งหมด แล้วทำการสร้าง signal SIGABRT ขึ้นมา แล้วสร้างไฟล์ core สำหรับการดีบัก

## ตัวอย่างการใช้งาน 
ถ้าไม่มีการ exit() ตรงฟังก์ชันที่ catch signal จะมีไฟล์ core เกิดขึ้นมา

``` c
#include <stdlib.h>
#include <signal.h>
void catch_abort_signal(signo)
{
	printf("My program Abort with signo=%d\n",signo);
	exit(1);
}
main ()
{
	signal(SIGABRT,catch_abort_signal);
	abort();
}
``` 
## ดูเพิ่มเติม
signal() , assert()

