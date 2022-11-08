# กลุ่มของฟังก์ชันที่เกี่ยวกับ POSIX signal

``` c
#include <signal.h>
int sigaction (int sig, const struct sigaction *act, struct sigaction *oact);                               
int sigaddset(sigset_t *set, int signo);
int sigdelset(sigset_t *set, int signo);
int sigemptyset(sigset_t *set);
int sigfillset(sigset_t *set);
int sigprocmask(int how, const sigset_t *set, sigset_t *oset);
int sigismember(const sigset_t *set, int signo);
int sigsuspend(const sigset_t *sigmask);
```


### sigaction(int sig, const struct sigaction *act, struct sigaction *oact);
ใช้ดักซิกแนล sig โดยอาศัยข้อมูลจาก act ค่าเดิมก็จะเก็บไว้ที่ oset (จะเป็น NULL ก็ได้ถ้าไม่ต้องการเก็บ) ภายใน struct sigaction จะมีสมาชิกสามตัวคือ

void(*)(int) sa_handler  สามารถใช้ SIG_DFL(ใช้ default function), SIG_IGN(ไม่สนใจซิกแนล sig) หรือพอย์เตอร์ของฟังก์ชันที่จะดักซิกแนล

sigset_t sa_mask เซ็ตของซิกแนลที่จะถูก block เมื่อรันโปรแกรมที่ใช้ดักซิกแนล

int sa_flags แฟลกพิเศษสำหรับซิกแนล ถ้า sig คือ SIGCHLD ถ้าไม่ได้เซ็ต SA_NOCLDSTOP ไว้ใน sa_flags ก็จะได้รับ SIGCHLD แต่ถ้า sig คือ SIGCHLD และได้เซ็ต SA_NOCLDSTOP ไว้ใน sa_flags ก็จะได้ไม่ได้รับ SIGCHLD

### sigaddset(sigset_t *set, int signo);

ใช้สำหรับใส่ซิกแนล signo เข้าไปในเซ็ตของซิกแนล mask ของ set

### sigdelset(sigset_t *set, int signo);
ใช้สำหรับเอาซิกแนล signo ออกจากเซ็ตของซิกแนล mask ของ set

### sigemptyset(sigset_t *set);
ทำให้เซ็ตของซิกแนล mask set เป็นเซ็ตว่าง

### sigfillset(sigset_t *set);
ใส่ซิกแนลทั้งหมดลงในซิกแนลมาส mask ของ set

### sigprocmask(int how, const sigset_t *set, sigset_t *oset);
กำหนดการ block ของซิกแนลให้โพรเซสโดยอาศัย mask จาก set ค่าเดิมก่อนเรียกฟังก์ชันก็จะถูกเก็บไว้ที่ oset (จะเป็น NULL ก็ได้ถ้าไม่ต้องการเก็บ) how จะเป็นเลือกว่า
- SIG_BLOCK ทำการ block ที่อยู่ในเซ็ต sig
- SIG_UNBLOCK ยกเลิกการ block ซิกแนลที่อยู่ในเซ็ต sig
- SIG_SETMASK กำหนดเซ็ตของซิกแนลให้โพรเซส โดยอาศัยข้อมูลจากเซ็ต sig

### sigismember(const sigset_t *set, int signo);
ใช้ในการทดสอบว่าซิกแนล segno อยู่ในเซ็ต set หรือไม่ ถ้าอยู่ในเซ็ตจะได้ 1 ไม่อยู่จะได้ 0 เกิดความผิดพลาดได้ -1

### int sigsuspend(const sigset_t *sigmask);
โพรเซสจะหยุดการทำงานเมื่อเรียกฟังก์ชันแล้วกำหนดซิกแนล mask ของโพรเซสตามค่าที่อยู่ใน  sigmask 
ฟังก์ชันจะทำการส่งค่ากลับมาถ้าฟังก์ชันที่ดักซิกแนลไม่ได้จบโปรแกรมภายในฟังก์ชัน ค่าที่ฟังก์ชันส่งกลับมาจะไม่มีค่าที่แสดงความสำเร็จ 
เพราะเป็นค่าที่ส่งกลับหลังจากการอินเตอร์รัป ซึ่งจะส่ง -1 กลับมาแล้วเซ็ต errno ให้เป็น EINTR

### รีเทิร์น
ฟังก์ชันทั้งหมดนี้ถ้าได้ 0 แสดงว่าสำเร็จ ถ้าได้ -1 แสดงว่าผิดพลาดแล้ว errno จะถูกเซ็ต

## ตัวอย่าง
	โปรแกรมแสดงการใช้ sigemptyset เพื่อสร้างเซ็ตว่าง, ใช้sigaddset()เพื่อใส่ซิกแนล SIGABRT   แล้วใช้ sigaction เพื่อดักซิกแนล SIGPIPE หลอกๆที่สร้างขึ้นให้กับฟังก์ชัน sig_func() ภายในฟังก์ชัน SIGABRT ไม่สามารถทำงานได้เพราะถูก block ไว้แล้วต้องใช้ Ctrl+C (SIGINT) เพื่อออกจากโปรแกรม
``` c
#include <stdlib.h>
#include <signal.h>
void
sig_func(int signo)
{
	printf("We are in signal catch function\n");
	if(raise(SIGABRT)==-1)/*never abort here because SIGABRT was block*/
	{
		printf("raise(SIGABRT) fail\n");
		exit(1);
	}
	printf("signal SIGABRT can not stop me ha ha, please use Ctrl+C(SIGINT)\n");
	pause();
}
main(int argc, char *argv[])
{
	struct sigaction act ,oldact;
	act.sa_handler = sig_func;
	sigemptyset(&act.sa_mask); /*none block other signal*/
	sigaddset(&act.sa_mask,SIGABRT);/*block signal SIGABRT*/
	act.sa_flags = 0;
	if (sigaction(SIGPIPE, &act, &oldact)<0)
	{
		perror("sigaction(setup new act) fail");
		exit(1);
	}
	if(raise(SIGPIPE)==-1)/*generate fake SIGPIPE*/
	{
		printf("raise(SIGPIPE) fail\n");
		exit(1);
	}
	if (sigaction(SIGPIPE,&oldact,NULL) < 0)/*restore old mask*/
	{
		perror("sigaction(restore old act) fail");
		exit(1);
	}
	printf("End program\n");
}
```
ผลลัพท์
``` sh
$ a.out
We are in signal catch function
signal SIGABRT can not stop me ha ha, please use Ctrl+C(SIGINT)
<กด Ctrl+C>
```

## ตัวอย่างโปรแกรม
โปรแกรมแสดงการใช้ sigfillset() เป็นการบอกว่าต้องการดักซิกแนลทั้งหมดที่มี แล้วลบบางซิกแนลออกจากเซ็ตด้วยฟังก์ชัน sigdelset() ในที่นี้คือ SIGALRM แล้วใช้ sigismember() ตรวจว่า SIGABRT อยู่ในเซ็ตหรือเปล่า ในที่นี้จะต้องไม่อยู่เพราะว่าถูกเอาออกไปแล้ว หลังจากนั้นใช้ sigprocmask() เพื่อกำหนตเซ็ตของซิกแนลที่จะถูก block ให้กับโพรเซสของเรา หลังจากเลิกใช้งานเรียก sigprocmask() อีกทีเพื่อคืน mask เดิมซึ่งซิกแนลที่ถูก block เอาไว้ในที่นี้ SIGABRT ก็จะทำงานเพราะยกเลิกการ block เกิดไฟล์ core ขึ้นมา
``` c
#include <stdlib.h>
#include <signal.h>
main(int argc, char *argv[])
{
	sigset_t new_mask,old_mask;
	/*Choose all except SIGALRM*/
	if((sigfillset(&new_mask)==-1)||
	   (sigdelset(&new_mask,SIGALRM)==-1)
	  )
	{
		perror("Initial signal set error!");
		exit(1);
	}
	switch(sigismember(&new_mask,SIGABRT))
	{
		case 0:
			printf("Imposible SIGABRT already add to set!\n");
			break;
		case 1:
			printf("OK SIGABRT is in a set to be block\n");
			break;
		default:
			perror("sigismember fail");
			exit(1);
	}
	/*set BLOCK with new mask*/
	if(sigprocmask(SIG_BLOCK,&new_mask,&old_mask)==-1)
	{
		perror("sigprocmask block fail");
		exit(1);
	}
	if(raise(SIGABRT)==-1)/*never abort here because SIGABRT was block*/
	{
		printf("raise() fail\n");
	}
	printf("Sleep 10 sec,you can not kill me with Ctrl+C(SIGINT)\n");
	sleep(10);
	printf("Good morning\n");
	/*restore old mask*/
	if(sigprocmask(SIG_SETMASK,&old_mask,NULL)==-1)
	{
		perror("sigprocmask unblock fail");
		exit(1);
	}
	/*abort some where near here*/
}
```
ผลลัพท์
``` sh
$ a.out
OK SIGABRT is in a set to be block
Sleep 10 sec,you can not kill me with Ctrl+C(SIGINT)
Good morning
ABORT instruction (core dumped)    
```
## ตัวอย่างการใช้งาน sigsuspend
โปรแกรมจะหยุดการทำงานเมื่อเรียก sigsuspend แล้วฟังก์ชันจะทำการส่งค่ากลับมาถ้าฟังก์ชันที่ดักซิกแนลไม่ได้จบการทำงานในฟังก์ชัน แต่ในกรณีนี้ default ของฟังก์ชันที่ดักซิกแนล SIGHUP คือการจบการทำงานดังนั้นฟังก์ชันจะไม่มีการส่งค่ากลับ
``` c
#include <signal.h>
main(int argc, char *argv[])
{
	sigset_t new_mask,old_mask;
	if(sigfillset(&new_mask)==-1)
	{
		perror("Initial signal set error!");
		exit(1);
	}
	/*set BLOCK with new mask*/
	if(sigprocmask(SIG_BLOCK,&new_mask,&old_mask)==-1)
	{
		perror("sigprocmask block fail");
		exit(1);
	}
	if(sigdelset(&new_mask,SIGHUP)==-1)
	{
		perror("sigdelset fail");
		exit(1);
	}
	if(sigsuspend(&new_mask)==-1)
		perror("sigsuspend \n");
	printf("Exit program\n");/*never come here*/
}
```

``` sh
bash$ ./d&
[1] 13290
bash$ kill -INT 13290
bash$ kill -QUIT 13290
bash$ kill -HUP 13290
[1]+  Hangup                  ./d    
```
