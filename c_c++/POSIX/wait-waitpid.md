# wait waitpid

รอโพรเซสลูกจบการทำงาน
``` c
#include <sys/types.h>   OH #include <sys/wait.h>
pid_t wait(int *stat_loc);
pid_t waitpid(pid_t pid, int *stat_loc, int options);      
``` 

``` c
#include <unistd.h>
#include <stdio.h>
#include <signal.h>
#include <sys/wait.h>
main()
{
	int c;
	int info;
	int pid;
	switch (pid = fork())
	{
	case -1:    
	    perror("The fork failed!");
	    break;
	case 0:
		printf("I am child\n");
		sleep(20);
		printf("child exit\n");/*never come here*/
		_exit(0);/*child exit*/
	default:
	    printf("I am parent. Child's pid is %d \n",pid);
		printf("Do you want to kill child ?(answer in 20 sec):");
		c=getchar();
		if((c=='Y')||(c=='y'))
		{
			printf("Kill with SIGINT\n");
			kill(pid,SIGINT);
		}else
			printf("Wait child to terminate\n");
	    if(wait(&info)==-1)
	    {
	    	perror("wait");
	    	exit(1);
	    }
		printf("child return %d\n",info);
		if(WIFEXITED(info))
			printf("WIFEXITED\n");
		if(WEXITSTATUS(info))
			printf("WEXITSTATUS\n");
		if(WIFSIGNALED(info))
			printf("WIFSIGNALED\n");
		if(WTERMSIG(info))
			printf("WTERMSIG\n");
		if(WIFSTOPPED(info))
			printf("WIFSTOPPED\n");
		if(WSTOPSIG(info))
			printf("WSTOPSIG\n");
	}
	exit(0);/*parent exit*/
}
```

```
$ ./a.out
I am child
I am parent. Child's pid is 13616
Do you want to kill child ?(answer in 20 sec):Y
Kill with SIGINT
child return 2
WIFSIGNALED
WTERMSIG
$ ./a.out
I am child
I am parent. Child's pid is 13618
Do you want to kill child ?(answer in 20 sec):N
Wait child to terminate
child exit
child return 0
WIFEXITED               
```

``` c
#include <unistd.h>
#include <stdio.h>
#include <signal.h>
#include <sys/wait.h>
main()
{
	int info;
	int pid1;
	int pid2;
	switch (pid1 = fork())
	{
		case -1:    
		    perror("The fork failed!");
		    break;
		case 0:
			printf("I am child 1 :%d\n",getpid());
			sleep(5);
			_exit(0);/*child exit*/
			break;
	}
	switch (pid2 = fork())
	{
		case -1:    
		    perror("The fork failed!");
		    break;
		case 0:
			printf("I am child 2 :%d\n",getpid());
			sleep(10);
			_exit(0);/*child exit*/
	}
	/*wait second child*/
	printf("waitpid() for pid %d finish\n",waitpid(pid2,&info,WNOHANG));
	printf("return is %d\n",info);
	/*wait any child*/
	printf("wait() found pid %d \n",wait(&info));
	printf("return is %d\n",info);
	exit(0);/*parent exit*/
}
```

ผลลัพท์
จะเห็นว่า waitpid() ออปชัน WNOHANG ทำให้โพรเซสไม่ต้องคอย child ถ้าเปลี่ยน WNOHANG เป็น 0 จะให้ผลคล้ายกับ wait() 

``` sh
bash$ ./d
I am child 1 :13909
I am child 2 :13910
waitpid() for pid 0 finish
return is 0
wait() found pid 13909
return is 0         
```
