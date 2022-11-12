# strcat strncat
นำ string มาต่อกัน
``` c 
#include <string.h>
char *strcat(char *s1, const char *s2);
char *strncat(char *s1, const char *s2, size_t n);  
```
ฟังก์ชันใช้สำหรับนำ string s2 มาต่อท้าย s1 ฟังก์ชัน strncat strcat ใช้งานเหมือนกันต่างตรงที่ strncat สามารถกำหนดความยาวของ s2 ที่จะนำมาต่อ s1 โดยยาวไม่เกิน n

## ตัวอย่างการใช้งาน
``` c
#include <string.h>
main()
{
	char buffer[1024];
	sprintf(buffer,"Hello ");
	printf("%s\n",buffer);
	strcat(buffer,"how are you?");
	printf("%s\n",buffer);
	strncat(buffer,"123456789",5);
	printf("%s\n",buffer);
}	
```
ผลลัพท์
``` sh
bash$ ./b
Hello
Hello how are you?
Hello how are you?12345  
```
