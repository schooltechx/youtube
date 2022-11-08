# open read write
``` c
#include <fcntl.h>
int open(const char *pathname, int flags);
int open(const char *pathname, int flags, mode_t mode);
int creat(const char *pathname, mode_t mode);     
#include <unistd.h>
ssize_t read(int fd, void *buf, size_t count); 
ssize_t write(int fd, const void *buf, size_t count);
int close(int fd); 
```

ฟังชันที่ใช้ในการสร้าง เขียน อ่าน และ ปิดไฟล์ ในระบบ UNIX จะไม่จำกัดว่าไฟล์คือกลุ่มของข้อมูลที่อยู่ในดีสก์ 
อุปกรณ์เกือบทุกอย่างใน UNIX คือไฟล์ การที่แทนอุปกรณ์และข้อมูลด้วยคำจำกัดความของไฟล์ทำให้การใช้งานสะดวกและง่ายดายเพราะการใช้งานคล้ายๆกัน 
ไม่จำเป็นต้องมีฟังก์ชันเฉพาะทางในการจัดการ และยังในระบบรักษาความปลอด(โหมดของไฟล์)ภัยเหมือนๆกันด้วย โหมดของไฟล์

### open()
ใช้ในการเปิดหรือสร้างไฟล์ pathname จะเป็นพอยเตอร์ที่ชี้ไปยังชื่อไฟล์ flag จะเป็นวิธีการเปิด และ mode 
จะเป็นโหมดของไฟล์ที่จะสร้าง (ถ้าเปิดไฟล์ที่มีอยู่แล้วให้ใช้ open แบบที่ไม่มี mode)
### creat()
ใช้ในการสร้างไฟล์ขึ้นมาใหม่ มันมีค่าเท่ากับ open()  O_CREAT|O_WRONLY|O_TRUNC
### read()
ใช้ในการอ่านไฟล์ fd คือไฟล์ descriptor ของไฟล์ที่จะทำการอ่าน buf เป็นพอยเตอร์ที่ชี้ไปยังบัฟเฟอร์ที่จะใช้เก็บข้อมูล count 
จะเป็นจำนวนไบต์ที่ต้องการอ่านซึ่งต้องไม่เกินขนาดของบัฟเฟอร์ ถ้าอ่านไม่ได้ read() จะรีเทิร์น -1
### write()
ใช้ในการเขียนไฟล์ fd คือไฟล์ descriptor ของไฟล์ที่จะทำการอ่าน ส่วน buf 
เป็นพอยเตอร์ที่ชี้ไปยังบัฟเฟอร์ของข้อมูลที่ต้องการเขียน count จะเป็นจำนวนไบต์ที่ต้องการเขียน 
ต้องไม่เกินขนาดของบัฟเฟอร์ ค่าที่รีเทิร์นจะเป็นจำนวนไบต์ที่เขียนได้ ถ้าเขียนข้อมูลไม่ได้ write() จะรีเทิร์นได้ -1
### close()
ใช้ในการปิดไฟล์ descriptor เมื่อเลิกใช้งาน fd คือไฟล์ descriptor ของไฟล์ที่ถูกเปิดอยู่ก่อนแล้ว 
ละกำลังจะทำการปิด

### flag
```
    O_CREAT If the file does not exist it will be created.

       O_EXCL  When used with O_CREAT, if the file already exists
               it  is an error and the open will fail.  O_EXCL is
               broken on NFS file systems, programs which rely on
               it  for  performing  locking  tasks will contain a
               race  condition.   The  solution  for   performing
               atomic  file locking using a lockfile is to create
               a unique file on the same fs (e.g.,  incorporating
               hostname  and  pid), use link(2) to make a link to
               the lockfile and use stat(2) on the unique file to
               check  if  its  link count has increased to 2.  Do
               not use the return value of the link() call.

       O_NOCTTY
               If pathname refers to a  terminal  device  --  see
               tty(4)  --  it  will not become the process's con-
               trolling terminal even if  the  process  does  not  
 O_TRUNC If the file already exists it will be truncated.

       O_APPEND
               The  file is opened in append mode. Initially, and
               before each write, the file pointer is  positioned
               at  the  end  of  the  file,  as  if  with  lseek.
               O_APPEND may lead to corrupted files on  NFS  file
               systems if more than one process appends data to a
               file at once.  This is because NFS does  not  sup-
               port appending to a file, so the client kernel has
               to simulate it, which can't be done without a race
               condition.

       O_NONBLOCK or O_NDELAY
               The  file  is opened in non-blocking mode. Neither
               the open nor any subsequent operations on the file
               descriptor  which is returned will cause the call-
               ing process to wait.

       O_SYNC  The file is opened for synchronous I/O. Any writes
               on  the  resulting  file descriptor will block the  
               written  to the underlying hardware.  See RESTRIC-
               TIONS below, though.

       O_NOFOLLOW
               If pathname is a  symbolic  link,  then  the  open
               fails.   This  is  a  FreeBSD extension, which was
               added to Linux in version 2.1.126.  Symbolic links
               in  earlier  components of the pathname will still
               be followed.  The headers from glibc  2.0.100  and
               later  include  a definition of this flag; kernels
               before 2.1.126 will ignore it if used.

       O_DIRECTORY
               If pathname is not a directory, cause the open  to
               fail.   This flag is Linux-specific, and was added
               in kernel version 2.1.126, to avoid denial-of-ser-
               vice problems if opendir(3) is called on a FIFO or
               tape device, but should not be used outside of the
               implementation of opendir.

       O_LARGEFILE
               On  32-bit  systems  that  support the Large Files 
               sented  in 31 bits to be opened.  The Linux kernel
               does not yet have the  support  for  this  (as  of
               2.1.130), but the flag definition is there and the
               userspace LFS interfaces are present in the  glibc
               2.1 test releases.              
```

ส่วน mode สามารถดูได้ในไฟล์ /usr/include/sys/stat.h ซึ่งจะประกาศไว้ดังนี้
``` c
#      define S_IRWXU 0000700 /* Owner Read, Write and Execute */
#      define S_IRUSR 0000400 /* Owner Read                    */
#      define S_IWUSR 0000200 /* Owner Write                   */
#      define S_IXUSR 0000100 /* Owner Execute                 */

       /* Group owner permission mask */
#      define S_IRWXG 0000070 /* Group Read, Write and Execute */
#      define S_IRGRP 0000040 /* Group Read                    */
#      define S_IWGRP 0000020 /* Group Write                   */
#      define S_IXGRP 0000010 /* Group Execute                 */

       /* Other owner permission mask */
#      define S_IRWXO 0000007 /* Other Read, Write and Execute */
#      define S_IROTH 0000004 /* Other Read                    */
#      define S_IWOTH 0000002 /* Other Write                   */
#      define S_IXOTH 0000001 /* Other Execute                 */
```

``` c
#include <stdio.h> 
#include <fcntl.h>
char testfile[] = "./test.txt";
main ()
{
	int fd1,fd2;
	size_t nbyte;
	char buffer[80];
/*	fd1 = open(testfile,O_CREAT|O_WRONLY|O_TRUNC,0777);*/
	fd1= creat(testfile,0777);	
	if( fd1 == -1)
	{
		perror("can not open file");
		exit(1);
	}
	fd2 =0;/*standard input*/
	nbyte = read(fd2,buffer,sizeof(buffer));
	if(nbyte<0)
	{
		perror("Read error \n");
		exit(1);
	}
	
	nbyte = write(fd2,buffer,nbyte);
	if(nbyte==-1)
	{
		perror("Write error \n");
		exit(1);
	}
	
	nbyte = write(fd1,buffer,nbyte);
	if(nbyte == -1)
	{
		perror("Write file error \n");
		exit(1);
	}
	close(fd1);
	fd1 = open("./test", O_RDONLY);
	nbyte = read(fd1,buffer,sizeof(buffer));
	buffer[nbyte]=NULL;
	printf("content of file is :%s",buffer);
}

```
