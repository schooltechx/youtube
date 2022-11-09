# gets fgets puts fputs

``` c
#include <stdio.h>
char *gets(char *s);
char *fgets(char *s, int n, FILE *stream);
int puts(const char *s);
int fputs(const char *s, FILE *stream);
```

ฟังก์ชันเหล่านี้เหมาะกับการอ่านและเขียนข้อมูลทีละบรรทัด โดยในการอ่านแต่ละครั้งจะแบ่งด้วย new line(ขึ้นบรรทัดใหม่) ซึ่งเหมาะกับการอ่าน input จากคีย์บอร์ดที่ละบรรทัด หรืออ่านจาก text ไฟล์มาทีละบรรทัด

### gets()  
ใช้ในการอ่านข้อความจาก stdin เข้ามาทีละบรรทัดแล้วไปเก็บไว้ใน buffer s โดยตัด new line ทิ้งไปแล้วต่อท้ายด้วย NULL
### fgets() 
เหมือน gets() เพียงแต่อ่านจากไฟล์และอ่าน new line เข้ามาด้วย
### puts() 
พิมพ์ string ออกทาง stdout แล้วปิดท้ายด้วย new line
### fputs()
เหมือน puts แต่ผลลัพท์ออกทางไฟล์และไม่ปิดท้ายด้วย new line

ตัวอย่างการใช้ gets() กับ fputs() หยุดโปรแกรมโดยกด Ctrl+D

``` c
#include <stdio.h>
#define LINE_MAX 80
FILE *target;
char buffer [LINE_MAX];
main (int argc,char *argv[])
{
	if(argc !=2)
	{
		printf("%s <target-path>\n",argv[0]);
		exit(0);
	}
	if((target=fopen(argv[1],"w"))==NULL)
	{
		perror("can not create target file \n");
		exit(1);
	}
	while((gets(buffer)) != NULL)
		fputs(buffer,target);
	fclose(target);
} 
```

ผลลัพท์ (สังเกตุจะเห็นได้ว่าไม่มี new line เลย)
``` sh
$ ./myprogram target.txt
hello
How are you target?
<Ctrl+D>
$ cat target.txt
hello How are you target?$  	
```
ตัวอย่างการใช้ puts() และ gets() หยุดโปรแกรมโดยกด Ctrl+D 

``` c
#include <stdio.h>
main()
{
	char line[80], *gets();
	while((gets(line)) != NULL)
		puts(line);
}
```
ตัวอย่างการ copy ไฟล์โดยใช้ fgets() และ fputs() ในหนึ่งบรรทัดต้องเป็น string ขนาดไม่เกิน 80 ตัวอักษร 
``` c
#include <stdio.h>
#define LINE_MAX 80
FILE *source ,*target;
char buffer [LINE_MAX];
main (int argc,char *argv[])
{
	if(argc !=3)
	{
		printf("%s <source-path> <target-path>\n",argv[0]);
		exit(0);
	}
	if((source=fopen(argv[1],"r"))==NULL)
	{
		perror("can not open source file \n");
		exit(1);
	}
	if((target=fopen(argv[2],"w"))==NULL)
	{
		perror("can not create target file \n");
		exit(1);
	}
	rewind(source); /*start at offset zero*/
	while(fgets(buffer,LINE_MAX,source)!=NULL)
		fputs(buffer,target);

	fclose(target);
	fclose(source);
}
```
