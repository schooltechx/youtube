# จัดการไฟล์
``` c
FILE *fopen(const char *pathname, const char *type);
FILE *freopen(const char *pathname, const char *type, FILE *stream);
FILE *fdopen(int fildes, const char *type); /*Not POSIX*/
int fclose(FILE *stream);
size_t fwrite(const void *ptr, size_t size, size_t nitems, FILE *stream);
size_t fread(void *ptr, size_t size, size_t nitems, FILE *stream);
void clearerr(FILE *stream);  /*ยังไม่มีตัวอย่าง*/
int ferror(FILE *stream);    
int feof(FILE *stream);
int fseek( FILE *stream, long offset, int whence);
long ftell( FILE *stream);
void rewind( FILE *stream);
int fgetpos( FILE *stream, fpos_t *pos);
int fsetpos( FILE *stream, fpos_t *pos);
```
ฟังก์ชันเหล่านี้เกี่ยวกับการใช้งานไฟล์ เปิด, ปิด, เขียน, อ่าน, เคลียร์ค่า error, ตรวจสอบ error, ตรวจสอบว่าจบไฟล์หรือเปล่า(End Of File หรือ EOF) 
POSIX จะมองไฟล์เป็นการไหลสายของข้อมูล(ตัวอักษร)ต่อเนื่องเหมือนสายน้ำ(stream)ปิดด้วยรหัส EOF ซึ่งเป็นตัวอักษรพิเศษที่ใช้บอกว่าจบไฟล์แล้ว

### fopen(), freopen(), fdopen()
ฟังก์ชันเหล่านี้จะใช้ในการเปิดไฟล์(หรือสร้างไฟล์ขึ้นมาใหม่) ฟังก์ชันจะส่งค่าของสตรีมกลับมา ถ้าเปิดไม่ได้ก็จะได้ NULL กลับมา 
สตรีมที่ได้จะใช้ในการอ้างถึงตัวข้อมูลในไฟล์ freopen() ใช้สำหรับเปิดไฟล์ใหม่โดยทำการปิดสตรีมของไฟล์ที่เปิดอยู่ก่อนแล้ว(stream) 
โดยไม่สนใจว่าไฟล์ที่ถูกเปิดอยู่ก่อนแล้วนั้นเปิดสำเร็จหรือไม่  ส่วน fdopen() ใช้ในการเข้าถึงไฟล์ที่ถูกเปิดอยู่ก่อนแล้วแต่เรามีแค่ไฟล์ descriptor ซึ่งอาจถูกเปิดด้วย open() 
โดยแปลงมันมาให้อยู่ในรูปของ stream (FILE*)

type จะเป็นชนิดของการเปิดซึ่งมีให้เลือกใช้ดังข้างล่าง

r      (read)เปิดเพื่ออ่านไฟล์

r+     เปิดเพื่ออ่านและเขียน

w      เปิดเพื่อเขียนขนาดของไฟล์หลังจากเปิดแล้วจะเหลือ 0 ดังนั้นข้อมูลเดิมจะหายหมด เป็นการเริ่มเขียนไฟล์ใหม่

w+     เปิดเพื่ออ่านและเขียนขนาดไฟล์หลังจากเปิดจะเหลือ 0  ถ้าไฟล์ไม่มีอยู่แล้วมันจะสร้างขึ้นมาใหม่

a      เปิดเพื่อเขียนถ้าไม่มีไฟล์อยู่จะเป็นการสร้างใหม่ stream จะไปชี้ที่ท้ายไฟล์เป็นการเปิดเพื่อเขียนต่อท้ายข้อมูลเดิม


### fclose()
ใช้สำหรับปิดไฟล์(stream) เมื่อเลิกใช้งาน ข้อมูลที่อยู่ในบัฟเฟอร์ก็จะถูกเขียนลงไปที่ไฟล์ดังนั้นรับประกันได้ว่าหลังจากเรียกฟังก์ชันนี้แล้ว 
ข้อมูลทั้งหมดจากหน่วยความจำถูกเขียนลงไปที่ไฟล์ทั้งหมด ถ้าปิดไฟล์สำเร็จจะรีเทิร์น 0 กลับมาถ้าไม่สำเร็จจะได้ EOF กลับมา

### fwrite(), fread()
fwrite() ใช้สำหรับเขียนข้อมูลจากบัฟเฟอร์ที่ชี้โดย ptr ลงไฟล์ที่ชี้โดย stream ถ้าเป็น fread() จะทำกลับกันคืออ่านจากไฟล์มาเก็บไว้ที่บัฟเฟอร์ 
โดย size จะเป็นขนาดของก้อนข้อมูลที่จะเขียน(หรืออ่าน) nitem ก็จะเป็นจำนวนก้อนที่จะเขียน(หรืออ่าน) ค่าที่รีเทิร์นกลับมา(size_t)จะเป็นจำนาน 
item ที่เขียน(หรืออ่าน)ได้ ถ้า fread() อ่านถึงท้ายไฟล์จะได้ EOF รีเทิร์นกลับมา กรณีที่เกิดความผิดพลาดในกรณีของ fwrite ค่าที่รีเทิร์น(size_t ) 
จะน้อยกว่า size ที่ป้อนให้ ส่วน fread() ไม่สามารถแยกความแต่ต่างของของจบไฟล์(EOF) กับ error ได้ดังนั้นจะต้องใช้ ฟังก์ชัน feof() 
หรือ ferror() ช่วยแยกความแตกต่างนี้

### ferror()
ใช้สำหรับพิสูจน์ว่าเกิดความผิดพลาดกับสตรีมที่จะตรวจสอบหลังจากการใช้งานครั้งล่าสุดหรือเปล่า 
    
### feof()
ใช้ตรวจสอบว่าสตรีมถึงท้ายที่สุดของไฟล์หรือยัง (หลังจากการใช้งานล่าสุด)

### clearerr()  
ใช้เคลียร์ค่าที่ใช้บ่งว่าถึงท้ายไฟล์(End of File หรือ EOF) กับ error ที่เกิดขึ้นกับไฟล์(stream) ที่เราอ้างถึงเพราะว่า เวลาเราใช้งานจะเกิด error หรือ EOF แล้วค่ามันจะถูกเซ็ตเอาไว้ เมื่อเราใช้งานต่อๆไปค่าที่เซ็ตเอาไว้ก็จะเหมือนเดิมไม่เปลี่ยนแปลงดังนั้นเราควรทำการเคลียร์ค่าเพื่อจะได้มีประโยชน์ในการ ตรวจสอบด้วยฟังก์ชัน ferror() หรือ feof() ในครั้งต่อๆไป

## ตัวอย่างการใช้งาน
เป็นโปรแกรมที่ทำการก๊อปปี้โดยเราป้อนพาร์ทของไฟล์ที่ต้องการก๊อปปี้ มันจะก๊อปปี้ไปเป็นไฟล์ชื่อ test.txt 

``` c
#include <stdio.h>
#define MY_BUFFER_MAX 80
char buffer[MY_BUFFER_MAX];
char testfile[] = "test.txt";
int numread;
FILE *in, *out;
int c ,i;
main (int argc,char *argv[])
{
	if(argc!=2)
	{
		printf("Usage: %s path_name\n",argv[0]);
		exit(0);
	}
	if((in=fopen(argv[1],"r"))==NULL)
	{
		perror("can not open file for read\n");
		exit(1);
	}
	
	if((out=fopen(testfile,"w"))==NULL)
	{
		perror("can not create file \n");
		exit(1);
	}
	while((numread=fread(buffer,sizeof(char),MY_BUFFER_MAX,in)) > 0 )
	{
		if(fwrite(buffer,sizeof(char),numread,out)!=numread)
		{
			perror("Write errro !\n");
			break;
		}
	}
	
	if(!feof(in)||ferror(in))
		perror("Get problem while read file\n");

	printf("Copy finish ! \n");
	clearerr(in);

	if(feof(in))
		perror("End of file of input file not clear\n");

	if(fclose(in)!=0)
		perror("close input file error\n");
	if(fclose(out)!=0)
		perror("close output file error\n");
} 
```

## ตัวอย่างการใช้ freopen()
เป็นการสร้างไฟล์ใหม่ชื่อ file1.txt หลังจากนั้นเขียนคำว่า hello ลงไป ปิดมาอีกชื่อหนึ่งคือ file2.txt โดยใช้ตัวแปรตัวเดิมทั้ง file1 และ file2 จะชี้ไปที่สตรีมเดียวกัน
``` c
#include <stdio.h>
FILE *file1, *file2;
main ()
{
	if((file1=fopen("file1.txt","w"))==NULL)
	{
		perror("can not create file1 \n");
		exit(1);
	}	
	fwrite("hello",1,sizeof("hello"),file1);

	if((file2=freopen("file2.txt","w",file1))==NULL)
	{
		perror("can not create file file2\n");
		exit(1);
	}

	fwrite("This is ",1,sizeof("This is "),file1);
	fwrite("file2",1,sizeof("file2"),file2);	

	printf("file1 and file2 are same stream %p = %p\n",file1,file2);
	if(fclose(file2)!=0)
		perror("close file error\n");
} 
```

ตัวอย่างการใช้ fdopen โดยทำการใช้สตรีมเพื่ออ้าง standard input (ไฟล์ descriptor 0) แล้วใช้ fread() เพื่ออ่านข้อมูลจากคีย์บอร์ด ต้องกด Ctrl+D เพื่อเลิกรับข้อความ
``` c
#include <stdio.h>
char buffer[256];
int numread;
FILE *in;
main ()
{
	if((in=fdopen(0,"r"))==NULL)
	{
		perror("can not open standard input \n");
		exit(1);
	}
	numread=fread(buffer,1,256,in);
	buffer[numread]=NULL; /*terminate with NULL*/
	printf("\nYou type=>%s\n",buffer);

	if(fclose(in)!=0)
		perror("close standard input error\n");
} 
```
ตัวอย่างการใช้ fseek() ftell() rewind() fgetpos() fsetpos()
``` c
#include <stdio.h>
FILE *f=NULL;
error_exit(char *msg)
{
	perror(msg);
	if(f!=NULL)
		fclose(f);
	exit(1);
}
main(int argc,char *argv[])
{
	long pos;
	fpos_t fpos;
	if(argc!=2)
	{
		printf("Usage: %s <file_name>\n",argv[0]);
		exit(1);
	}
	if((f=fopen(argv[1],"r"))==NULL)
		error_exit("Can not open file for read\n");
	if(fseek(f,0L,SEEK_END)==-1)
		error_exit("fseek fail\n");
	if((pos=ftell(f))==-1)
		error_exit("ftell fail\n");
	printf("Last position of file = %d\n",pos);
	rewind(f);
	printf("First position of file = %d\n",ftell(f));	
	fpos = pos/2;
	if(fsetpos(f, &fpos)==-1)
		error_exit("fsetpos fail\n");
	fpos = 0;
	if(fgetpos(f, &fpos)==-1)
		error_exit("fgetpos fail\n");
	printf("Middle of file = %d\n",fpos);
	fclose(f);
}
``` 
