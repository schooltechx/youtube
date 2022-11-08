# raise

``` c
#include <signal.h>
int kill(pid_t pid, int sig);
int raise(int sig);    
```

ฟังก์ชันใช้ในการส่งซิกแนล sig ให้กับโพรเซสหรือกลุ่มของโพรเซส

### kill()
ส่งซิกแนลให้กับโพรเซสที่มี ID เท่ากับ pid ด้วยซิกแนล sig
### raise() 
เป็นการส่งซิกแนลให้ตัวเอง ซึ่งมีค่าเท่ากับ kill(getpid(),sig)

## ตัวอย่าง
``` c
#include <stdlib.h>
#include <signal.h>
void
sig_catch(int signo)
{
	if (signo == SIGINT)
		printf("sig_catch: catch signal\n");
	else
		printf("sig_catch: signal = %d, (!= SIGINT)", signo);
}
main()
{
	if(signal(SIGINT,sig_catch)==SIG_ERR)
	{
		perror("signal() error\n");
		exit(1);
	}
	if (raise(SIGINT) < 0) 
	{
		perror("raise() fail");
		exit(1);
	}
	printf("End program\n");
}
```

``` c
/* The call raise(sig) is equivalent to kill(getpid(),sig).*/
#include <stdlib.h>      /* exit() */
#include <signal.h>      /* SIGINT, struct sigaction, raise(),
                              sigaction(), sigemptyset() */
void
sig_func(int signo)
{
	if (signo == SIGINT)
		printf("sig_func: ready to exit(111)\n");
	else
		printf("sig_func: signal = %d, (!= SIGINT)", signo);

	exit(111);
} /* sig_func() */

int
main(int argc, char *argv[])
{
	struct sigaction act;

	/* arm SIGINT signal handler */
	act.sa_handler = sig_func;
	sigemptyset(&act.sa_mask);
	act.sa_flags = 0;
	if (sigaction(SIGINT, &act, NULL) < 0)
	{
		perror("sigaction() fail");
		exit(1);
	}

	if (raise(SIGINT) < 0) 
	{
		perror("raise() fail");
		exit(1);
	}
	exit(0);
} /* main() */
```


