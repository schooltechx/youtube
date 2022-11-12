# times

## ตัวอย่างโปรแกรม
``` c
#include <sys/times.h>
main ()
{
	int i;
	struct tms t;
	clock_t clock;

	switch(fork())
	{
		case 0:
			printf("I am child\n");
			for(i=0;i<20000000;i++);/*child busy*/
			exit(0);
		case -1:
			perror("fork() fail\n");
			exit(1);
		default:
		wait(0);
		for(i=0;i<10000000;i++);/*parent busy*/
		break;
	}
	clock = times(&t);
	if(clock == -1)
	{
		perror("time() fail\n");
		exit(1);
	}
	printf("CPU time of parent:%d\n",t.tms_utime);      /* user time */
	printf("%d\n",t.tms_stime);      /* system time */
	printf("CPU time of chile:%d\n",t.tms_cutime);     /* user time, children */
	printf("%d\n",t.tms_cstime);    /* system time, children */ 
}
```
