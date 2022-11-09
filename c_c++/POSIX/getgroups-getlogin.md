# getgroups-getlogin
``` c
#include <unistd.h>
int getgroups(int ngroups, gid_t gidset[]);
char *getlogin(void);
int getlogin_r(char *buf, int buflen);  
```

### getgroups()
ใช้หา ID ของ group ของโพรเซสที่เรียกว่าอยู่ใน group ใหนบ้าง ค่าที่รีเทิร์นกลับมาจะถูกเก็บไว้ใน gidset[] ส่วน ngroups เป็นขนาดสูงสุดของ gidset[]

### getlogin()
ฟังก์ชันจะรีเทิร์นพอย์เตอร์ของ static บัฟเฟอร์ที่เก็บชื่อของยูสเซอร์ ที่ login อยู่ที่โดยที่ terminal นี้ติดต่อกับโพรเซสที่เรียกฟังก์ชัน พูดง่ายๆก็คือแสดงชื่อของคนที่เรียกโปรแกรมแต่มีข้อแม้ว่า standard input ,output หรือ error อย่างใดอย่างหนึ่งต้องติดต่อกับ terminal

### getlogin_r()
เหมือนกับ getlogin_r() แต่ชื่อของยูสเซอร์จะถูกเก็บไว้ในบัฟเฟอร์ buf ที่เราจองไว้ ส่วน buflen เป็นขนาดของ buf ในหน่ยวไบต์ ฟังก์ชันนี้เหมาะกับการเขียนโปรแกรมแบบมัลติเทรด เพราะว่า static บัฟเฟอร์จะถูกเขียนทับทุกครั้งเมื่อเรียก getlogin() 

``` c
#include <unistd.h>
main ()
{
	int n,i;
	char *s;
	char buffer[80];
	gid_t gidset[5];
	printf("%s[getlogin]\n",s=getlogin());
	if(getlogin_r(buffer,80)==-1)
	{
		perror("getlogin_r fail\n");
		exit(1);
	}else
		printf("%s[getlogin_r]\n",buffer);
	if((n=getgroups(5,gidset))> -1)
	{
		printf("number of group:%d\n",n);
		for(i=0;i<n;i++)
			printf("group:%d\n",gidset[i]);
	}
}
```
ผลลัพท์
``` sh
oom[getlogin]
oom[getlogin_r]
number of group:1
group:12075     
```
