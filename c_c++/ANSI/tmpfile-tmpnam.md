# tmpfile tmpnam
``` c
#include <stdio.h>
FILE *tmpfile (void);
char *tmpnam(char *s);
```

ฟังก์ชันเกี่ยวกับไฟล์ที่ใช้งานชั่วคราว(temporary file) ฟังก์ชัน tmpfile จะสร้างไฟล์ชัวคราวขึ้นมาเลยส่วน 
tmpnamจะสร้างแค่ชื่อของไฟล์(ไม่มีการสร้างไฟล์จริงๆ)  ไดเร็กทอรีที่จะทำการสร้างไฟล์นี้ให้ไปดู P_tmpdir ใน stdio.h   
ไฟล์ที่สร้างจะไม่ทีทางซ้ำกับไฟล์ที่มีอยู่เดิมในระบบ เมื่อโพรเซสจบการทำงานหรือทำการปิดไฟล์ ไฟล์นี้ก็จะถูกลบออกไปโดยอัตโนมัติ 
ฟังก์ชันนี้ทำงานเหมือนเหมือนกับการเปิดไฟล์ในโหมด binary read/write (w+b) ถ้าไม่ได้สนใจชื่อของไฟล์ควรใช้ tmpfile() 
เพื่อสร้างไฟล์เพราะมันจะไม่มีปัญหา race condition ในการสร้างไฟล์ชั่วคราวถ้าเราจะทำการเปิดไฟล์เองก็ควรคำนึงถึงปัญหานี้ด้วย 

## ค่ารีเทิร์น

tmpfile จะได้พอย์เตอร์สตรีมที่ใช้อ้างถึงไฟล์ชั่วคราว ถ้าเปิดไฟล์ไม่สำเร็จจะได้ NULL 

tmpnam จะได้ชื่อของไฟล์ในบัฟเฟอร์ s โดยมีขนาดไม่น้อยกว่าค่าคงที่ L_tmpnam ที่ประกาศไว้ใน stdio.h

## ตัวอย่างการใช้งาน
``` c
#include <stdio.h>
char myTempName[L_tmpnam];
FILE *mytemp;
main()
{
	if(tmpnam(myTempName)==NULL)
	{
		perror("Can not make temp name\n");
		exit(1);
	}
	printf("%s\n",myTempName);

	mytemp = tmpfile();
	if(mytemp==NULL)
	{
		perror("Can not create  temporary file");
		exit(1);
	}
	fclose(mytemp);
}
```
