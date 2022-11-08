
``` c
#include <unistd.h>
unsigned alarm(unsigned sec);     
```
ฟังก์ชันสำหรับตั้งเวลาโดยที่โพรเซสที่เรียกฟังก์ชันนี้ก็จะได้รับซิกแนล SIGALRM หลังจากครบเวลาที่กำหนดไว้ใน sec (หน่วยเป็นวินาที) 
ถ้าโพรเซสไม่ได้ดักซิกแนล SIGALRM ก็จะไม่มีผลอะไร การ fork ไม่ได้ถ่ายทอดค่าเวลาที่โพรเซสแม่ได้ตั้งไว้  
ค่า alarm ของโพรเซสลูกจะเป็น 0 ส่วนการ exec จะได้ค่า alarm ที่เซ็ตเอาไว้เพราะว่ายังเป็นโพรเซสเดิม
```c
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
void timeout(int singo)
{
  printf("Time out.\n");
  exit(1);
}

int main(void)
{
  char name[256];
  printf("Input your name within 10 sec. \n");
  if(signal(SIGALRM,timeout) == SIG_ERR)
  {
    fprintf(stderr,"signal() error\r");
    exit(1);
  }
  alarm(10);
  scanf("%s",name);
  alarm(0);                     
  printf("Your name is \" %s \" \n",name);
  exit(0);
}   
```
ผลลัพท์

ครั้งแรกหลังจากรันโปรแกรมแล้วไม่ต้องทำอะไรเลยปล่อยจนครบ 10 วินาทีก็จะเห็นข้อความ Time out 
การรันครั้งที่สองหลังจากรันโปรแกรมก็ป้อนชื่อเข้าไปแล้วกด Enter ทำให้โปรแกรมจบการทำงานก่อน 10 วินาทีโปรแกรมก็ทำงานเป็นปรกติ
``` sh
$ ./a.out
Input your name within 10 sec.
Time out.
$ ./a.out
Input your name within 10 sec.
hello
Your name is " hello " 
```
