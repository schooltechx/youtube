# getenv putenv

```
#include <stdlib.h>
char *getenv(const char *name); 
```

ฟังก์ชัน getenv() ใช้ในการแสดงตัวแปรแวดล้อม( environment variable) โดยมันจะรีเทิร์นพอยเตอร์ของ string ของตัวแปรที่อยู่ในรูป name=value ออกมา

## ตัวอย่างการใช้งาน
โปรแกรมรับตัวแปรและค่าของตัวแปรเข้ามา ถ้าตัวแปรนี้ได้ถูกประกาศอยู่แล้วจะ จะพิมตัวค่าของตัวแปรออกมา ถ้ายังไม่ได้ประกาศแล้วใช้ฟังก์ชัน putenv() เพื่อเพิ่มตัวแปรเข้าไป

Note: putenv()  ไม่ใช่ POSIX

``` c
#include <stdlib.h>
main (int argc,char *argv[])
{
	char *v,new_env[1025];
	if(argc !=3)
	{
		printf("Usage:%s NEWVAR VALUE\n",argv[0]);
		exit(0);
	}

	if((v=getenv(argv[1]))!=NULL)
	{
		printf("Variable exist: %s=%s\n",argv[1],v);
		exit(0);
	}
	sprintf(new_env,"%s=%s",argv[1],argv[2]);
	putenv(new_env);
	printf("New variable is: %s\n",getenv(argv[1]));
}
```

## ตัวอย่างการใช้งาน

แสดงตัวแปรแวดล้อม environment ทั้งหมดที่มีโดยไม่ใช้ getenv() การทำงานของมันเหมือนคำสั่ง printenv
``` c
#include <stdio.h>
extern char **environ;
int main()
{
    char **ep = environ;
    char *p;
    while ((p = *ep++))
        printf("%s\n", p);
    return 0;
}
```
