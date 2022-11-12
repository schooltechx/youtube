# lseek

ฟังก์ชันสำหรับเปลี่ยนระยะขจัด(offset) ของ file descriptor
``` c
#include <sys/types.h>
#include <unistd.h>
off_t lseek(int fildes, off_t offset, int whence);
``` 
ฟังก์ชันนี้ใช้สำหรับเปลี่ยนตำแหน่งพอยเตอร์ที่ชี้ข้อมูลของไฟล์  ปรกติเมื่อเราเรียกฟังก์ชัน read(2) หรือ writ(2) 
มันจะเลื่อนตำแหน่งของพอยเตอร์เท่่าที่เราอ่านหรือเขียน ถ้าเราต้องการเลื่อนไปยังตำแหน่งที่ต้องการก็ต้องเรียกฟังก์ชันนี้

fildes : file descriptor

offset : ระยะขจัด โดยเริ่มวัดจาก whence สามาถเป็นได้ทั้งค่าบวกและลบ ในหน่วยของ byte

whence
-	SEEK_SET เริ่มนับจากจุดเริ่มต้นของไฟล์
-	SEEK_CUR เริ่มนับจากตำแหน่งปัจจุบัน
-	SEEK_END นับจากท้ายของไฟล์

## ตัวอย่างโปรแกรม
โปรแกรมใช้สำหรับการอ่านไฟล์ /etc/passwd ซึ่งพอย์เตอร์ของไฟล์จะอยู่ที่ต้นไฟล์ ใช้ lseek() เลื่อนพอยเตอร์ไปอีกสอง byte จากต้นไฟล์ 
แล้วแสดงตัวอักษร ณ ตำแหน่งนั้นออกมา หลังจากนั้นเลื่อนตัวชี้ไปยัง 10 byte สุดท้ายโดยนับจากท้ายไฟล์ แล้วแสดงตัวอักษร ณ ตำแหน่งนั้นออกมา

``` c
#include <sys/types.h>
#include <unistd.h> 
#include <stdio.h>
#include <fcntl.h>
error_exit(char message[])
{
	fprintf(stderr,"%s\n",message);
	perror("");
	exit(1);
}
/*show 10 character at current seek position but 
not advance seek position by seek back */
show_current(int fd)
{
	char buffer[10+1];
	size_t nbyte;
	off_t seek_pos;
	
	nbyte = read(fd,buffer,10);
	if(nbyte==-1)
		error_exit("read fail");
	buffer[10] = (char)NULL;     /*terminate string*/
	printf("%s\n",buffer);

	seek_pos = lseek(fd, -10, SEEK_CUR);
	if(seek_pos==-1)
		error_exit("seek in show_current fail");
}
main()
{
	int fd;
	off_t seek_pos;
	
	fd = open("/etc/passwd",O_RDONLY);
	if(fd==-1)
		error_exit("open /etc/passwd fail");

	seek_pos = lseek(fd, 2, SEEK_SET);
	if(seek_pos==-1)
		error_exit("seek fail");
	show_current(fd);

	seek_pos = lseek(fd, -10, SEEK_END);
	if(seek_pos==-1)
		error_exit("seek fail");
	show_current(fd);
	close(fd);
}
``` 
ผลลัพท์

จะใช้คำสั่ง head เพื่อแสดงสองบรรทัดแรก กับ tail เพื่อแสดงสองบรรทัดสุดท้ายของไฟล์ /etc/passwd ออกมา แล้วค่อยเรียกโปรแกรมเพื่อ จะได้เห็นผลได้ชัดเจน
``` sh
$ head -n 2 /etc/passwd
root:yx2OxwWMWXOmY:0:3::/:/sbin/ksh
administrator:yx2OxwWMWXOmY:0:3::/:/sbin/ksh
bash$ tail -n 2 /etc/passwd
klemens:T5SjIehtwngu6:16533:12075:Klemen Stembal,611:/home1/klemens:/usr/bin/ksh
zigam:P6g3XzI/rTupc:106:20::/home/zigam:/sbin/sh
$ ./a.out
ot:yx2OxwW
:/sbin/sh   
```
