# signal sleep pause

``` c
#include <signal.h>
void (*signal(int sig, void (*func)(int)))(int);
#include <unistd.h>
unsigned int sleep(unsigned int seconds);
int pause(void);    
```


### signal()
ใช้ในการกำหนดฟังก์ชันให้กับซิกแนลที่ต้องการ
### sleep()
ทำให้โพรเซสหยุดการทำงานชั่วคราวตามเวลาเป็นวินาทีที่กำหนดใน seconds ค่าที่รีเทิร์นกลับมาจะเป็นเวลาที่ที่เหลือ ปรกติจะเป็น 0 แต่ถ้ามีการอินเตอร์เพราะมีฟังก์ชันที่ดักจับซิกแนลก็จะรีเทิร์นค่ามากกว่า 0
### pause()
โพรเซสจะหยุดการทำงานจนกว่าจะเกิดอินเตอร์รับจากฟังก์ชันที่ดักจับซิกแนล ค่าที่รีเทิร์นกลับมาจะเป็น -1 เสมอและ  errno จะถูกเซ็ตเป็น EINTR. 

ตัวอย่าง โดยการใช้ signal กับ sleep
``` c
#include <signal.h>
void sig_catch(int singo)
{
	printf("Good morning.(sleep)\n");
	return;
}
main(void)
{
	if(signal(SIGINT,sig_catch)==SIG_ERR)
	{
		perror("signal() error\n");
		exit(1);
	}
	printf("Interrupt me in 10 sec(use Ctrl+C).\n");
	printf("Time left for sleep %d sec\n",sleep(10));
}
```

ผลลัพท์ โดยการกด Ctrl+C (interrupt)
``` sh
$ ./a.out
Interrupt me in 10 sec(use Ctrl+C).
Good morning.(sleep)
Time left for sleep 8 sec
``` 

ตัวอย่าง การใช้ signal กับ pause
``` c
#include <signal.h>
void sig_catch(int singo)
{
   printf("Good morning.(pause)\n");
}
main(void)
{
	if(signal(SIGINT,sig_catch)==SIG_ERR)
	{
		perror("signal() error\n");
		exit(1);
	}
	printf("I will wait until you wake me up(use Ctrl+C).\n");
	printf("pause return %d\n",pause());
}
```

ผลลัพท์
``` sh
$ ./a.out
I will wait until you wake me up(use Ctrl+C).
Good morning.(pause)
pause return -1 
```
เพิ่มเติมดู signal.h

