# uname

``` c
#include <sys/utsname.h>
int uname(struct utsname *name);   
```
## ตัวอย่างโปรแกรม
``` c
#include <sys/utsname.h>
main ()
{
	struct utsname name;
	if(uname(&name)<0)
	{
		perror("unmae() fail\n");
		exit(1);
	}
	printf("System name:%s\n",name.sysname);
	printf("Node name:%s\n",name.nodename);
	printf("Machine name:%s\n",name.machine);
}
```
