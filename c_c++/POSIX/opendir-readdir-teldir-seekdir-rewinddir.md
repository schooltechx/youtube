# opendir readdir teldir seekdir rewinddir

``` c
#include <dirent.h>
DIR *opendir(const char *dirname);
struct dirent *readdir(DIR *dirp);
int readdir(DIR *dirp);
int readdir_r(DIR *dirp, struct dirent *result);
long int telldir(DIR *dirp);
void seekdir(DIR *dirp, long int loc);
void rewinddir(DIR *dirp);                
int closedir(DIR *dirp);  
```

ฟังก์ชันต่อไปนี้ใช้ในการจัดการไดเร็กทอรี ไดเร็กทอรีถือเป็นไฟล์ชนิดหนึ่งก่อนใช้งานก็ต้องทำการเปิด หลังใช้งานก็ต้องทำการปิด ข้อมูลที่อยู่ในไดเร็กทอรีจะเป็นรายชื่อของไฟล์หรือไดเร็กทอรีที่อยู่ภายใต้ไดเร็กทอรีนั้นๆ แต่เราไม่สามารถแก้ไขข้อมูลนั้นได้โดยตรงในระดับไบต์เพราะข้อมูลส่วนนี้ถูกดูแลโดย kernel ต้องใช้ system call พวก link() หรือ unlink() หรือฟังก์ชันใดๆที่ใช้ในการสร้างไฟล์หรือไดเร็กทอรี
```
opendir()
readdir()
readdir_r()
telldir()
seekdir()
rewinddir()
closedir()
```
struct ของ dirent ของแต่ระบบปฎิบัติการอาจจะไม่เหมือนกัน ตัวอย่างข้างล่างเป็นของ HPUX
``` c
/*sys/dirent.h of HPUX */
struct dirent {
      ino_t d_ino;                      /* file number of entry */
      short d_reclen;                   /* length of this record */
      short d_namlen;                   /* length of string in d_name */
      char  d_name[_MAXNAMLEN + 1];     /* name must be no longer than this */
};        
```

ตัวอย่าง การเปิดไดเร็กทอรีปัจจุบัน(".") แล้วอ่านไดเร็กทอรแล้วพิมพ์ค่าออกพร้อม offset ของ entry ถัดไปในลู฿ป while โดยใช้ ndir เป็นตัวนับว่ามีกี่ entry ในไดเร็กทรอรีนั้น หลังจากนั้นทำการวนกลับไปเริ่มต้นใหม่ด้วย rewinddir() แล้วทำการ  scan รอบสองเพื่อหา offset ของentry สุดท้ายด้วยลูป for แล้ว rewinddir()รอบสองเพื่อกลับไปเริ่มต้นใหม่แล้วใข้ seekdir() เพื่อไปยัง entry สุดท้าย
```
#include <stdio.h>
#include <dirent.h>
main()
{
	DIR *dirp;
	struct dirent *direntp;
	int i,ndir=0;
	
	dirp = opendir(".");
	printf("start offset <%d>\n",telldir(dirp));
	while ((direntp = readdir(dirp)) != NULL) 
	{
		printf("\n%s<%d>\n",direntp->d_name,telldir(dirp));
		ndir++;
	}
	rewinddir(dirp); /*back to the top*/
	printf("\ncurrent offset is <%d>\n",telldir(dirp));
	for(i=0;i<ndir-1;i++)/*scan offset of last entry*/
		direntp = readdir(dirp);
	i=telldir(dirp); /*remember offset of last entry*/
	rewinddir(dirp); /*back to the top(again)*/
	seekdir(dirp,i); /*go to last entry*/
	direntp = readdir(dirp);
	printf("\n<%d>%s(inode number:%d)\n",i,direntp->d_name,direntp->d_ino);	
	closedir(dirp);
}
```

ตัวอย่างการใช้ readdir_r
``` c
#include <dirent.h>
#include <errno.h> /*for errno*/
main ()
{
	DIR *dirp;
	struct dirent result;
	int i,ndir=0;
	
	dirp = opendir(".");
	while (readdir_r(dirp,&result) != -1) 
	{
		printf("%s\n",result.d_name);
	}
	if(errno!=0)
		perror("readdir_r fail");
}
```
