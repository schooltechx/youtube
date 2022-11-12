# sysconf

``` c
#include <unistd.h>
long sysconf(int name);
```
ฟังก์ชันใช้ในการแสดง configuration ของระบบ ซึ่งมันจะบอกถึงขีดจำกัดของระบบด้วย ค่าคงที่ของ configuration สามารถหาดูได้จากไฟล์ unistd.h

## ตัวอย่างโปรแกรม
``` c
#include <unistd.h>
main ()
{
	printf("CHILD_MAX :%d\n",sysconf(_SC_CHILD_MAX ));
	printf("POSIX2_VERSION :%d\n",sysconf(_SC_2_VERSION));	
}
```
ตัวอย่างทดสอบบน HPUX 10.2
``` sh
bash$ ./myprogram
CHILD_MAX :401
POSIX2_VERSION :199209 
```
