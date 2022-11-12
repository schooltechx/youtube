# execl execle execlp execv execve execvp  

รันโปรแกรมบนโพรเซสปัจจุบัน

``` c
#include <unistd.h>
extern char **environ;
int execl(const char *path, const char *arg0, const char *arg1, ... ,NULL );
int execle(const char *path,const char *arg0, arg1, ... ,NULL, char * const envp[]);
int execlp(const char *file, const char *arg0, const char *arg1, ... ,NULL );
int execv(const char *path, char * const argv[]);
int execve(const char *path, char * const argv[], char * const envp[]);
int execvp(const char *file, char * const argv[]);      
```

``` c
#include <stdio.h>
#include <unistd.h>
main (int argc,char *argv[])
{
	if(argc != 2)
	{
		printf("Usage: %s <type>\n",argv[0]);
		exit(0);
	}
	switch(argv[1][0])
	{
		case 'l':
			execl("/bin/ls", "ls", "-l", NULL);
			break;
		case 'p':
			execlp("ls", "ls", "-l", NULL);
			break;
		case 'e':
		{			
			char *newenv[] = {"HOME=/tmp", NULL };
			execle("/bin/sh", "sh" , "echo $HOME",NULL, newenv);
			break;
		}
		case 'v':
		{			
			char *arg[] = { "ls", "-l", NULL };
			execv("/bin/ls", arg);
			break;
		}

		case 'P':
		{
			char *arg[] = { "ls", "-l", NULL };
			execvp("ls", arg);
			break;
		}
		case 'E':
		{			
			char *arg[] = { "sh","echo $HOME", NULL };
			char *newenv[] = {"HOME=/tmp", NULL };
			execve("/bin/sh",arg, newenv);
			break;
		}
		default:
			printf("Choose type from those letter: l,p,e,v,P,E \n");
			exit(0);
	}
	/*Never arrive here if no error*/
	perror("Can not exec \n");
}
```
