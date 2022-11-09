# จัดการ Memory

```
#include <string.h>
void *memccpy(void *s1, const void *s2, int c, size_t n);
void *memchr(const void *s, int c, size_t n);
int memcmp(const void *s1, const void *s2, size_t n);
void *memcpy(void *s1, const void *s2, size_t n);
void *memmove(void *s1, const void *s2, size_t n);
void *memset(void *s, int c, size_t n);                  
int bcmp(const void *s1, const void *s2, size_t n);
void bcopy(const void *s1, void *s2, size_t n);
void bzero(char *s, int n);
```

### int ffs(int i);	
ฟังก์ชันเหล่านี้ใช้ในการจัดการเกี่ยวกับหน่วยความจำ เวลาใช้งานต้องระวังค่า n ต้องไม่เกิน ขนาดของ s1 และ s1 ที่จะรับได้ เพราะถ้าอ้างกินที่จะรับได้จะเกิด memory protection fail  ฟังก์ชัน bcmp(), bcopy() ,bzero() และ ffs() เป็นของ BSD ถ้าต้องการให้โปรแกรมที่เขียนขึ้น portable ก็ควรหลีกเลี่ยง และถ้าหน่วยความจำหรือbuffer ที่เราจะจัดการนั้นเก็บข้อมูลในรูปของ string ให้หลีกเลี่ยงไปใช้ ฟังก์ชันที่ใช้จัดการเกี่ยวกับ string จะปลอดภัยกว่า 

### memccpy()
ทำการ copy หน่วยความจำจาก buffer s2 ไปยัง s1 จำนวน n byte ถ้าเจอไบต์ที่ต้องการ (c) ก่อนที่จะถึงจำนวน n ก็จะยกเลิก copy ณ ตำแหน่งนั้น รีเทิร์น NULL ถ้าไม่เจอไบต์ที่ต้องการ (c)
### memchr()
ใช้ในการหาไบต์ที่ต้องการโดยกำหนดในค่า c โดยค้นหาเป็นจำนวน n ไบต์ถ้าไม่เจอก็จะรีเทิร์น NULL ถ้าเจอก็จะรีเทิร์นพอย์เตอร์ ณ ตำแหน่งทีพบ
### memcmp()
ใช้ในการเปรียบเทียบค่าในหน่วยความจำ โดยจะทำการเปรียบเทียบ n ไบต์ ถ้าเท่ากันเป็นจำนวน n ไบต์ก็จะรีเทิร์น 0 <ถ้าไม่เท่ากับ0>
### memcpy()
ใช้ในการ copy หน่วยความจำจาก buffer s2 ไปยัง s1 เป็นจำนวน n ไบต์
### memmove()
เหมือนกับ memcopy แต่สามารถcopy แบบ overlap ได้ (buffer เดียวกันแต่คนละตำแหน่งแต่มีบางส่วนคาบเกี่ยวกัน) และจะรีเทิร์น ณ ตำแหน่งที่ทำการเคลื่อนย้ายไปแล้ว
### memset(void *s, int c, size_t n)                  
ทำการใส่ค่าที่ต้องการ(c) ในตำแหน่งในหน่วยความจำโดยเริ่มจาก s เป็นจำนวน n ไบต์
### bcmp()
ทำงานเหมือน memcmp()
### bcopy(const void *s1, void *s2, size_t n);
ทำงานเหมือน memcpy() และไม่มีการรีเทิร์นพอย์เตอร์ของ buffer
### bzero(char *s, int n)
ทำงานเหมือน memset(); โดยที่ค่า c=0 และไม่มีการรีเทิร์นพอย์เตอร์ของ buffer
### ffs(int i)
ทำการค้นหาบิตที่มีค่าเป็นหนึ่งโดยเริ่มหาจากบิตล่างสุด (least significant bit)) จากตัวอย่างข้างล่างให้ลองแปลงเป็นเลขฐานสองดูจะเข้าใจยิ่งขึ้น

## ตัวอย่าง
``` c
#include <string.h>
#define LENGTH sizeof(s) 
char s[]="abcdefghijk";
char s1[80],*c;
main ()
{
	if(memccpy(s1,s,'f',LENGTH) != NULL)
		printf("f found and %d byte copied:%s\n",strlen(s1),s1);
	else
		printf("f not found , all byte transfered\n");

	if((c=memchr(s,'g',LENGTH)) != NULL)
		printf("start form g :%s \n",c);
	else 
		printf("g not found \n");
		
	printf("Equal :%d \n",memcmp("How are you?","How is going?",4));
	printf("Less than :%d \n",memcmp("How are you?","How is going?",7));
	printf("More than :%d \n",memcmp("How is going?","How are you?",7));
	printf("%s \n",memcpy(s1,s,LENGTH));
	printf("%s \n",memmove(s1+3,s1,LENGTH));
	printf("%s \n",s1); /*memmove() can overlap */
	printf("%s \n",memset(s1+3,'x',3));/*you can use '' or 120*/
	printf("%s \n",s1);
	printf("%d:%d:%d:%d:%d:%d\n",ffs(8),ffs(4),ffs(2),ffs(1),ffs(0),ffs(12));
}
```
