# setbuf

## ตัวอย่างการใช้งาน
``` c
#include <stdio.h>
FILE *f=NULL;
error_exit(char *msg)
{
	perror(msg);
	if(f!=NULL)
		fclose(f);
	exit(1);
}
main(int argc,char *argv[])
{
	char buffer[BUFSIZ];
	if((f=fopen("/dev/tty","w"))==NULL)
		error_exit("Can not open file for write\n");
	if(setvbuf(f, buffer,_IOFBF, BUFSIZ)!=0)
		error_exit("setvbuf fail\n");
	fprintf(f,"Hello\n");
	fprintf(stdout,"Ya!\n");
	fclose(f);
	printf("==Next Test==\n");
	if((f=fopen("/dev/tty","w"))==NULL)
		error_exit("Can not open file for write\n");
	setbuf(f,NULL);
	fprintf(f,"Hello ");
	fprintf(stdout,"Ya! ");
	fprintf(f,"Hay!\n");
	fprintf(stdout,"Yo!\n");
	fclose(f);
}
```
