# fork-pid
``` c
#include <unistd.h>
pid_t getpgid (pid_t pid); /*Not POSIX*/
pid_t getpgrp(void);
pid_t getpgrp2(pid_t pid); /*Not POSIX*/
pid_t getpid(void);
pid_t getppid(void);
```

getpgid ()	: รีเทิร์น ID ของ process group ของโพรเซสที่เรียกฟังก์ชัน

getpgrp()	: รีเทิร์น group ID ของโพรเซสที่เรียกฟังก์ชัน

getpgrp2(): รีเทิร์น ID ของ process group โดยที่เราป้อน ID ของโพรเซสที่อยากรู้เข้าไป

getpid()	: รีเทิร์น process ID ของโพรเซสที่เรียกฟังก์ชัน

getppid()	: รีเทิร์น process ID ของ parent ของโพรเซส(child)ที่เรียกฟังก์ชัน

## รีเทิร์น
ทุกฟังก์ชันจะส่งค่าเหล่านี้กลับมาที่ pid_t

n : ตัวเลย ID ของโพรเซส (ในที่นี้ n แทนตัวเลยใดๆ)

-1 : ฟังก์ชัน fail

``` c
#include <stdio.h>
#include <unistd.h>
main()
{
	pid_t pid,gid;
	int id;
	printf("Parent process ID=%d ,group ID=%d\n",getpid(),getpgrp());
	printf("My(parent) process group ID=%d\n",getpgrp());
	switch(id=fork())
	{
		case 0:
			printf("Child process ID=%d ,group ID=%d\n",getpid(),getpgrp());
			printf("My parent process ID=%d,\n",getppid());
			printf("My(child) process group ID=%d\n",getpgrp());			
			break;
		case -1:
			perror("Fork fail\n");
			exit(1);
			break;
		default:
			printf("I am Parent and my Child's process ID=%d\n",id);
			printf("The process group %d(parent)=%d(child)\n",getpgrp2(getpid()),getpgrp2(id));
			break;
	}
}
```

ผลลัพท์
``` sh
$ ./myprogram
Parent process ID=4306 ,group ID=4306
My(parent) process group ID=4306
Child process ID=4307 ,group ID=4306
My parent process ID=4306,
My(child) process group ID=4306
I am Parent and my Child's process ID=4307
The process group 4306(parent)=4306(child)    
```
