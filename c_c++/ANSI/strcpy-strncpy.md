# strcpy strncpy

``` c 
#include <string.h>
char *strcpy(char *buffer, const char *s);
char *strncpy(char *buffer, const char *s, size_t n);
```

## ตัวอย่างการใช้งาน
``` c
#include <string.h>
main()
{
	char buffer[1024];
	strcpy(buffer,"123456789");
	printf("%s\n",buffer);
	strncpy(buffer,"Hello how are you?",7);
	printf("%s\n",buffer);	
}	
```
# ผลลัพท์
``` sh
bash$ ./b
123456789
Hello h89   
``` 
