# pipe
``` c
#include <unistd.h>
int pipe(int filedes[2]);
```
ฟังก์ชันใช่ในการสร้างไฟล์ descriptor ขึ้นมาคู่หนึ่งโดยที่ filedes[0] ใช้สำหรับอ่านได้อย่างเดียว ส่วน filedes[1] ใช้ในการเขียนได้อย่างเดียว เมื่อเขียนข้อมูลลงที่ filedes[1] จะต้องอ่านข้อมูลกลับมาที่ filedes[0] การใช้งานส่วนมากใช้สำหรับ การสื่อสารระหว่างสองโพรเซสที่มีความสัมพันธ์ระหว่างโปรเซสแม่ กับโพรเซสลูก (เกิดจากการ fork) เนื่องจากหลังจากที่ fork() แล้วจะมีการถ่ายทอด ไฟล์ descriptor ที่โปรเซสแม่เปิดอยู่ด้วย 

## ตัวอย่างการใช้งาน
โปรแกรมอ่านข้อความจากคีย์บอร์ดเขียนลง pipe ข้างหนึ่งแล้วอ่านกลับมาจาก pipe อีกข้างหนึ่งแล้วแสดงออกมาทางหน้าจอ 
``` c
main ()
{
	ssize_t nbyte;
	int pipefd[2];
	char buffer[1024];
	if(pipe(pipefd)== -1)
	{
		perror("pipe fail");
		exit(1);
	}
	while(gets(buffer)!=NULL)
	{
		write(pipefd[1],buffer,strlen(buffer));
		nbyte=read(pipefd[0],buffer,sizeof(buffer));
		if(nbyte==-1)
		{
			perror("Can not read pipe\n");
			exit(1);
		}
		buffer[nbyte]=NULL;
		printf("%s[from pipe]\n",buffer);
	}
}
```

ผลลัพท์
ต้องใช้  Ctrl+C เพื่อหยุดโปรแกรม
``` sh
$ ./a.out
hello
hello[from pipe]
1234
1234[from pipe]
<===หยุดโปรแกรมด้วย Ctrl+C
```

## ตัวอย่าง ใช้ pipe กับ fork
``` c
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
int main(void)
{
	int     fd[2], nbytes;
	pid_t   childpid;
	char    string[] = "Hello, world!\n";
	char    readbuffer[80];
	pipe(fd);
	if((childpid = fork()) == -1)
        {
                perror("fork");
                exit(1);
        }
	if(childpid == 0)
	{
		/* Child process closes up input side of pipe */
		close(fd[0]);
		exit(1);
	}

	if(childpid == 0)
	{
		/* Child process closes up input side of pipe */
		close(fd[0]);

		/* Send "string" through the output side of pipe */
		write(fd[1], string, strlen(string));
		exit(0);
	}
	else
	{
		/* Parent process closes up output side of pipe */
		close(fd[1]);

		/* Read in a string from the pipe */
		nbytes = read(fd[0], readbuffer, sizeof(readbuffer));
		printf("Received string: %s", readbuffer);
	}
	return(0);
}
```

