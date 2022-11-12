# rename
``` c
#include <stdio.h>
int rename(const char *source, const char *target);
```
เป็น system call ที่ใช้สำหรับการเปลี่ยนชื่อไฟล์หรือไดเร็กทอรี มองอีกมุมก็คือการย้ายไฟล์(เหมือนคำสั่ง mv) โดย source จะเป็นชื่อเดิมส่วน target จะเป็นชื่อใหม่ ถ้า target มีตัวตนอยู่แล้วมันจะทำการลบซะก่อนที่จะทำการย้ายไป
## รีเทิร์น
0   Successful 
-1   Failure. ค่า errno ที่เป็นเหตุของปัญหาจะถูกเซ็ต 

## ตัวอย่าง
``` c
#include <stdio.h>
main(int argc,char *argv[])
{
	if(argc!=3)
	{	
		printf("Usage: %s source target\n",argv[0]);
		exit(0);
	}
	if(rename(argv[1],argv[2])<0)
	{
		perror("rename fail");
		exit(1);
	}
}
```
