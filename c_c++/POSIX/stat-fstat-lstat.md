# stat lstat fstat

``` c
#include <sys/stat.h>
int stat(const char *path, struct stat *buf);
int lstat(const char *path, struct stat *buf);  /*not POSIX*/
int fstat(int fildes, struct stat *buf);
```
path :พาร์ทของไฟล์ที่ต้องการทราบข้อมูล (เช่น /usr/ls , ./data.txt)

struct stat :buffer ที่จะใส่ข้อมูล

ทั้งสามฟังก์ชันใช้ในการแสดงคุณสมบัติของไฟล์ หรือ ไดเร็กทอรี โดยจะไปใส่ข้อมูลใน struct stat ในกรณีไฟล์เป็น symbolic link , lstat() จะแสดงคุณสมบัติของไฟล์ที่เป็น symbolic link ส่วน stat() จะแสดงคุณสมบัติของไฟล์ที่ถูกชี้โดย symbolic link ส่วน fstat ใช้สำหรับแสดงข้อมูลของไฟล์ที่เปิดอยู่แล้ว ตัว POSIX เองไม่ได้กล่าวถึง symbolic link แต่ใน UNIX ที่ใช้เกือบทุกเวอร์ชันสนับสนุน ถ้าต้องการให้โปรแกรมสนับสนุน POSIX 100% ก็ควรหลีกเลี่ยงการใช้ symbolic link เพราะมีบางระบบปฎิบัติการที่สนับสนุน POSIXแต่ไม่มี symbolic link 
เวลาใช้งานฟังก์ชันเหล่านี้ควรจะไปดู stat.h เพราะได้มีการประกาศค่าคงและมาโครที่ที่ใช้ควบคู่กับฟังกชัน

ตัวอย่างการใช้งาน
``` c
#include <sys/stat.h>
main(int argc ,char *argv[])
{
	int i;
	char *p;
	struct stat stat_buff;
	if(argc <2)
	{
		printf("Usage: %s path1 [path2] [path3]...\n",argv[0]);
		exit(0);
	}
	for(i=1;i<argc;i++)
	{
		if(stat(argv[i],&stat_buff) < 0)
		{
			perror("Can not stat");
			continue;
		}
		switch(stat_buff.st_mode & S_IFMT)
		{
			case S_IFREG: p="regular file";
				break;
			case S_IFBLK: p="block special file";
				break;
			case S_IFCHR: p="character special file";
				break;
			case S_IFDIR: p="directory";
				break;
			case S_IFIFO: p="fifo special file";
				break;
#ifdef S_IFLNK	/*Pure POSIX did not define symbolic link*/
			case S_IFLNK: p="symbolic link file";
				break;
#endif
			default:      p="unknown file type";
		}
		
		printf("%s is %s\n",argv[i],p);
	}

}
```

``` c
#include <sys/stat.h>
#include <stdio.h>
void
main (int argc, char *argv[])
{
	struct stat stat_buff;
	int result,fd;
	if (argc !=3)
	{
		printf("Useage : %s stat_type <pathname>\n",argv[0]);
		exit(0);
	}
	if(strcmp(argv[1],"stat")==0 )
		result = stat(argv[2],&stat_buff);
	else
	if(strcmp(argv[1],"lstat")==0 )
		result = lstat(argv[2],&stat_buff);
	else
	if(strcmp(argv[1],"fstat")==0 )
	{
		if((fd = open(argv[2],0))==-1)
		{
			perror("can not open file\n");
			exit(1);
		}
		result=fstat(fd,&stat_buff);
		close(fd);
	}
	else
	{
		printf("Useage : %s stat_type <pathname>\n",argv[0]);
		exit(0);
	}

	if(result<0)
	{
		perror("Can not stat,lstat or fstat\n");
		exit(1);
	}

    if( S_ISDIR(stat_buff.st_mode) )
	printf("======This is directory =======\n");
    else
	printf("======This is file =======\n");
    printf("%.3o\t protection or permission (st_mode)\n",stat_buff.st_mode&0777);
    printf("%d\t inode (st_ino)\n",stat_buff.st_ino );
    printf("%d\t device (st_dev)\n",stat_buff.st_dev );
    printf("%d\t number of hard links (st_nlink)\n",stat_buff.st_nlink );
    printf("%d\t user ID (st_uid)\n",stat_buff.st_uid );
    printf("%d\t group ID (st_gid)\n",stat_buff.st_gid );
    printf("%d\t device type (if inode device):st_rdev\n",stat_buff.st_rdev );    
    printf("%d\t total size, in bytes (st_size)\n",stat_buff.st_size );
    printf("%d\t number of blocks allocated (st_blocks)\n",stat_buff.st_blocks);
    printf("%d\t blocksize for filesystem I/O (st_blksize)\n",stat_buff.st_blksize );
    printf("%s\t last access (st_atime)\n",ctime(&stat_buff.st_atime));
    printf("%s\t last modification (st_mtime)\n",ctime(&stat_buff.st_mtime));
    printf("%s\t last change (st_ctime)\n",ctime(&stat_buff.st_ctime));
}
```
ผลลัพท์
``` sh
$ ./myprogram stat x.c
======This is file =======  
761      protection or permission (st_mode)
120090   inode (st_ino)
1074069507       device (st_dev)
1        number of hard links (st_nlink)
16497    user ID (st_uid)
12075    group ID (st_gid)
750288   device type (if inode device):st_rdev
5441     total size, in bytes (st_size)
6        number of blocks allocated (st_blocks)
8192     blocksize for filesystem I/O (st_blksize)
Fri Jul 23 15:49:41 1999
         last access (st_atime)
Wed Jul 21 09:15:27 1999
         last modification (st_mtime)
Fri Jul 23 18:59:41 1999
         last change (st_ctime)
```

เพิ่มเติมดู

sys/stat.h 
