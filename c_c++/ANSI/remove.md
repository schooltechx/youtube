# remove
``` c
#include <stdio.h>
int remove(const char *path);
```
ฟังก์ชันใช้สำหรับลบไฟล์หรือไดเร็กทรอรี ในกรณีของไฟล์  remove(path) จะให้ผลเหมือนกับ unlink(path) ส่วนไดเร็กทอรีจะให้ผลเหมือน rmdir(path)

## รีเทิร์น

0   สำเร็จ

-1   Failure. ค่า errno ที่เป็นเหตุของปัญหาจะถูกเซ็ต 

## ตัวอย่าง
``` c
#include <stdio.h>
main(int argc,char *argv[])
{
	if(argc!=2)
	{	
		printf("Usage: %s target\n",argv[0]);
		exit(0);
	}
	if(remove(argv[1])<0)
	{
		perror("remove fail");
		exit(1);
	}
}

```
