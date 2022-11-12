# strxcmp

``` c
#include <string.h>
int strcmp(const char *s1, const char *s2);
int strncmp(const char *s1, const char *s2, size_t n);
```

## ตัวอย่างการใช้ strcmp
``` c
#include <string.h>
main(int argc,char *argv[])
{
	char c;
	int value;
	if(argc!=3){
		printf("Usage:%s string1 string2\n",argv[0]);
		exit(1);
	}
	value = strcmp(argv[1],argv[2]);
	if(value==0) c='=';
	else if(value>0) c='>';
		else c='<';
	printf("%s %c %s :%d\n",argv[1],c,argv[2],value);
}
```
ผลลัพท์
``` sh
$ ./a.out abcdef abcdefgh
abcdef < abcdefgh :-1
$ ./a.out abcdef abcdeafz
abcdef > abcdeafz :1
$ ./a.out abcdef abcdef
abcdef = abcdef :0
$ ./a.out abcdef abz
abcdef < abz :-1      
```

## ตัวอย่างการใช้ strncmp
``` c
#include <string.h>
main(int argc,char *argv[])
{
	char c;
	int value;
	size_t n;
	if((argc!=4)||(sscanf(argv[3],"%d",&n)!=1))
	{
		printf("Usage:%s string1 string2 number\n",argv[0]);
		exit(1);
	}
	value = strncmp(argv[1],argv[2],n);
	if(value==0) c='=';
	else if(value>0) c='>';
		else c='<';
	printf("%s %c %s :%d\n",argv[1],c,argv[2],value);
}
``` 
ผลลัพท์
``` sh
$ ./a.out abcd abcdef 3
abcd = abcdef :0
$ ./a.out abcd abcdef 4
abcd = abcdef :0
$ ./a.out abcd abcdef 5
abcd < abcdef :-101  
$ ./a.out abcdef abcd 5
abcdef > abcd :101   
```
