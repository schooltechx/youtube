# การเขียนโปรแกรมบน UNIX/Linux ด้วย C และ C++
ผมไปเจอไฟล์ที่ผมเขียนสอนการเขียนภาษา C ไว้นานมากแล้ว ราวๆปี 2000 ตอนนั้นอยู่ต่างประเทศเขียนโปรแกรมบน UNIX (HPUX, Solaris,Linux ฯลฯ)
เขียนโดยอิงมาตรฐาน ANSI C และ POSIX C สามารถนำมาใช้กับวินโดว์ได้ด้วย ตอนนั้นไม่มีข้อมูลภาษาไทย และ ไม่มี google ให้หาง่ายๆด้วย 
ก็เลยเขียนภาษาไทยเก็บไว้ เพื่อดูเอง หรือเผื่อเขียนหนังสือ เนื่องจาก POSIX มันกว้างมากเลยไม่สามารถทำให้เสร็จได้
ผมในตอนนั้นก็เด็กมาก พึงเรียนจบ เอามาใส่ใน Github แต่ก็ยังไม่มีเวลาตรวจเนื้อหา แค่ก็อปแปะแล้วแก้เป็น Markdown ก็แทบแย่แล้ว 
เนื้อหาเป็นการพัฒนาแบบดังเดิม อาจจะมีข้อผิดพลาดต้องขออภัยด้วย หวังว่าจะเป็นประโยชน์กับคนอื่นๆ แล้วจะหาโอกาสอัปเดตเนื้อหาและทำวีดีโอสอนนะครับ

## Quick Start (Draft)
แนะนำการเขียนโปรแกรมด้วยภาษา C บน UNIX ไม่คำนึงถึงรายละเอียด หรือหลัการมากมาย 
แค่แสดงให้เห็นว่าทำได้อย่างไรเท่านั้นเอง ตรงนี้เป็นการแสดงวิธีการใช้คอมไพล์เลอร์ ดีบักเกอร์ 
และ การเขียน Makefile เบื้องต้นเท่านั้น ผมขอสรุปเอาดื้อๆ ว่าผู้อ่านรู้จัก UNIX หรือ Linux พอสมควร สามารถใช้คำสั่งเบื้องต้นได้ 
ใช้ editor บน UNIX ได้ เขียนโปรแกรมพอเป็นบ้างแล้ว และ ระบบทีใช้มี gcc, gdb, make(GNU)
- [การเขียนโปรแกรมบน Unix](./quickC/intro.md)
- [GCC ฉบับย่อ](./quickC/intro.md)
- [GDB ฉบับย่อ](./quickC/gdb.md)
- [Make](./quickC/make.md)
- [C For UNIX/Linux เบื้องต้น](basicC.md)

## ANSI C
ฟังก์ชั่นในกลุ่มนี้จะรองรับระบบปฎิบัติการหลายตัว (DOS, Windows, macOS, UNIX, Linux ฯลฯ)

### stdio
[fflush](./ANSI/fflush.md),
[fopen, freopen, fdopen, fclose,fwrite, fread,ferror,feof,clearerr](./ANSI/files.md),
[gets,fgets,puts,fputs](./ANSI/gets-fgets-puts-fputs.md),
[perror,strerror](./ANSI/perror-strerror.md),
[printf,fprintf,sprintf](./ANSI/printf-fprintf-sprintf.md),
[putc,putchar,fgetc,fputc,getc,getchar](./ANSI/putc-putchar-fgetc-fputc-getc-getchar.md),
[remove](./ANSI/remove),
[rename](./ANSI/rename.md),
[setbuf](./ANSI/setbuf.md),
[tmpfile,tmpnam](./ANSI/tmpfile-tmpnam.md),
[scanf,fscanf,sscanf](./ANSI/xscanf.md),

### stdlib
[abort](./ANSI/abort.md),
[assert](./ANSI/assert.md),
[exit,_exit,atexit](./ANSI/exit_exit-atexit.md)

### string, memory
[memccpy,memchrmemcmp,memcpy,memmove,memset,bcmp,bcopy,bzero,ffs](./ANSI/memorys.md),
[str](./ANSI/str.md),
[strcat,strncat](./ANSI/strcat-strncat.md),
[strcpy,strncpy](./ANSI/strcpy-strncpy.md),
[strtok](./ANSI/strtok.md),
[strxcmp](./ANSI/strxcmp.md)

### ctype
[isalnum, isalpha, iscntrl, isdigit, isgraph, islower, isprint, ispunct, isspace, isupper, isxdigit, tolower, toupper](./ANSI/toupper-tolower-isxxx.md) 

ฟังก์ชันในกลุ่มของ isXXX() ใช้สำหรับเปรียบเทียบตัวอักษรว่าเป็น ตัวอักษร ตัวเลข ตัวอักขระควบคุม ฯลฯ หรือไม่ ส่วนฟังก์ชันในกลุ่ม toXXX() ใช้สำหรับแปลงตัวอักษรเช่น  จากตัวอักษรตัวใหญ่เป็นตัวเล็กหรือกลับกัน

### math
ฟํงก์ชันของสมการทางคณิตศาสตร์ ได้แก่

acos, asin, atan, atan2, ceil, cos, cosh, exp, fabs, floor, fmod, frexp, ldexp, log, log10, modf, pow, sin, sinh, sqrt, tan, tanh 

### signals
  การติดต่อสื่อสารระหว่างโพรเซส วิธีที่ง่ายและไม่ซับซ้อนคือการส่งซิกแนล การทำงานจะคล้ายๆการทำอินเตอร์รับของฮาร์ดแวร์ 
  โพรเซสที่สามารถตอบสนองซิกแนลได้จำเป็นต้องมีฟังก์ชันที่ถูกรีจิสเตอร์ด้วยฟังก์ชัน signal() ฟังก์ชั่นที่เกี่ยวข้องได้แก่
  
[raise](./ANSI/raise.md),[signal,sleep,pause](./ANSI/signal-sleep-pause.md) 



## POSIX C
POSIX ย่อมาจาก Portable Operating System Interface เป็นข้อตกลงมาตรฐานที่ถูกระบุโดย IEEE Computer Society
ซึ่งมาตรฐานเหล่านั้นประกอบไปด้วย กลุ่มของ API (application programming interfaces) สำหรับ 
ระบบปฏิบัติการ Unix และ Unix-like ต่างๆ เช่น Solaris (Oracle), AIX (IBM), HP-UX (HP), OS X (Apple) 
และ Linux distros ต่างๆ (Linux distros ส่วนใหญ่ คลอบคลุมตาม POSIX เกือบทั้งหมด) และคำสั่ง(comman line) ที่จำเป็น

Windows รองรับ function บางส่วน command line และ ฟังชั่นไม่ได้รองรับจริงๆต้องทำผ่านทาง 
- "Windows Subsystem for Linux"
- Cygwin  
- WSL2 ซึ่งเป็น kernel Linux ที่ทำงานบน Windows ได้

### Process Primitives (Section 3)
[execl, execle, execlp, execv, execve, execvp,](execx.md)
[alarm,](alarm.md)
[fork](fork.md)
[sigemptyset, sigfillset, sigaddset, sigdelset, sigismember, sigaction,sigprocmask,sigsuspend,](sigxx.md)
[wait, waitpid,](wait-waitpid.md)

### Process Environment (Section 4)
setsid, setpgid, getgroups, getlogin,getlogin_r,
setuid, setgid,
time (ดู ANSI time),
ttyname_r,ctermid,

[getenv,putenv](./POSIX/getenv-putenv.md),
[getgroups,getlogin](./POSIX/getgroups-getlogin.md),
[getuid,geteuid,getgid,getegid](./POSIX/getuid-geteuid-getgid-getegid.md),
[istty-ttyname](./POSIX/istty-ttyname.md),
[sysconf](./POSIX/sysconf.md),
[times](./POSIX/times.md),
[uname](./POSIX/uname.md),
[getpgid,getpgrp,getpgrp2 ,getpid, getppid](./POSIX/fork-pid.md), 

### Files and Directories (Section 5)

[stat,fstat,lstat,](./POSIX/stat-fstat-lstat.md)
[open,read,write,](./POSIX/open-read-write.md)
[opendir,readdir,teldir,seekdir,rewinddir,](./POSIX/opendir-readdir-teldir-seekdir-rewinddir.md)

### Input and Output Primitives (Section 6)
[dup,dup2](./POSIX/dupx.md),
[fcntl](./POSIX/fcntl.md),
[fsync](./POSIX/fsync.md),
[lseek](./POSIX/lseek.md),
[pipe](./POSIX/pipe.md),

### Device- and Class-Specific Functions (Section 7)
cfgetispeed, cfgetospeed, cfsetispeed, cfsetospeed, tcdrain, tcflow, tcflush, , tcgetpgrp, tcsendbreak, tcsetpgrp 
tcgetattr, tcsetattr

### Language-Specific Services for the C Programming Language (Section 8)
asctime_r ctime_r flockfile ftrylockfile funlockfile getc_unlocked getchar_unlocked gmtime_r localtime_r putc_unlocked putchar_unlocked rand_r strtok_r
setlocale, siglongjmp, sigsetjmp, 
fseek, ftell  (see ANSI),
[fileno](./POSIX/fileno.md),
tmpfile, tmpnam (see ANSI),
tzset (see ANSI),
perror(see ANSI),
remove (see ANSI),
fprintf,printf (see ANSI),
fscanf,scanf (see ANSI),
abort (see ANSI),
exit(see ANSI),
fflush (see ANSI),
putc, putchar,fgetc, fputc,getc, getchar,rewind(see ANSI),
gets,fgets,fputs,puts(see ANSI),
fclose,  fopen, freopen,fread,fwrite, fdopen(see ANSI),
### System Databases (Section 9)>
getpwnam_r,getpwuid_r,
getpwnam,getpwuid,
getgrgid, getgrnam,getgrgid_r,getgrnam_r
### Synchronization (Section 11)
pthread_cond_broadcast, pthread_cond_destroy,pthread_cond_init,pthread_cond_signal,pthread_cond_timedwait, pthread_cond_wait,
pthread_condattr_destroy, pthread_condattr_getpshared, pthread_condattr_init ,pthread_condattr_setpshared, pthread_mutex_destroy,
pthread_mutex_init, pthread_mutex_lock,pthread_mutex_trylock,pthread_mutex_unlock,sem_close,sem_destroy,sem_getvalue,
sem_init, sem_open, sem_post, sem_trywait, sem_unlink, sem_wait

### Memory Management (Section 12)
mlock, mlockall, munlock, shm_open, shm_unlink,
mmap, mprotect, msync, munmap 

### Execution Scheduling (Section 13)
pthread_attr_getinheritsched pthread_attr_getschedparam pthread_attr_getschedpolicy pthread_attr_getscope pthread_attr_setinheritsched pthread_attr_setschedparam pthread_attr_setschedpolicy pthread_attr_setscope pthread_getschedparam pthread_mutex_getprioceiling pthread_mutex_setprioceiling pthread_mutexattr_getprioceiling pthread_mutexattr_getprotocol pthread_mutexattr_setprioceiling pthread_mutexattr_setprotocol pthread_setschedparam sched_get_priority_max sched_get_priority_min sched_getparam sched_getscheduler sched_rr_get_interval sched_setparam sched_setscheduler sched_yield

### Clocks and Timers (Section 14)
clock_getres clock_gettime clock_settime nanosleep timer_create timer_delete timer_getoverrun timer_gettime timer_settime 

### Message Passing (Section 15) 
mq_close mq_getattr mq_notify mq_open mq_receive mq_send mq_setattr mq_unlink 

### Thread Management (Section 16) 
pthread_attr_destroy pthread_attr_getdetachstate pthread_attr_getstackaddr pthread_attr_getstacksize pthread_attr_init pthread_attr_setdetachstate pthread_attr_setstackaddr pthread_attr_setstacksize pthread_create pthread_detach pthread_equal pthread_exit pthread_join pthread_once pthread_self 

### Thread-Specific Data (Section 17)
pthread_getspecific pthread_key_create pthread_key_delete pthread_setspecific  

### Thread Cancellation (Section 18)
pthread_cancel pthread_cleanup_pop pthread_cleanup_push pthread_setcancelstate pthread_setcanceltype pthread_testcancel 

============= Misc Functions ======================
### Networking (net.cc) (Standardized by POSIX 1.g, which is probably still in draft?) 
accept bind connect getdomainname gethostbyaddr gethostbyname getpeername getprotobyname getprotobynumber getservbyname getservbyport getsockname getsockopt herror htonl htons inet_addr inet_makeaddr inet_netof inet_ntoa listen ntohl ntohs rcmd recv recvfrom rexec rresvport send sendto setsockopt shutdown socket socketpair 
Of these networking calls, rexec, rcmd and rresvport are implemented in MS IP stack but may not be implemented in other vendors' stacks. 
### Other
chroot (stub, sets ENOSYS, returns -1) closelog cwait cygwin_conv_to_full_posix_path cygwin_conv_to_full_win32_path cygwin_conv_to_posix_path, cygwin_conv_to_win32_path, cygwin_posix_path_list_p, cygwin_posix_to_win32_path_list, cygwin_posix_to_win32_path_list_buf_size, cygwin_split_path, cygwin_win32_to_posix_path_list, cygwin_win32_to_posix_path_list_buf_size, cygwin_winpid_to_pid dlclose, dlerror dlfork dlopen dlsym endgrent endhostent ffs fstatfs ftime get_osfhandle getdtablesize getgrent gethostname getitimer getmntent getpagesize getpwent gettimeofday: BSD grantpt initgroups (stub) ioctl killpg login logout lstat mknod (stub, sets ENOSYS, returns -1) memccpy nice openlog pclose popen ptsname putenv random readv realpath regfree rexec select setegid: SVR4 (stub, sets ENOSYS, returns zero)@item endpwent setenv seterrno seteuid (stub, sets ENOSYS, returns zero) sethostent setitimer setmntent setmode setpassent setpgrp setpwent 
settimeofday: BSD (stub, set ENOSYS, return -1) sexecl sexecle sexeclp sexeclpe sexeclpe sexecp sexecv sexecve sexecvpe sigpause spawnl (spawn calls are from Windows C library) spawnle spawnlp spawnlpe spawnv spawnve spawnvp spawnvpe srandom statfs strsignal strtosigno swab syslog timezone truncate (SVR4/4.3+BSD) ttyslot unlockpt unsetenv usleep utimes vfork: stub that calls fork vhangup (stub, sets ENOSYS, returns -1) wait3 wait4 wcscmp wcslen wprintf writev 


## C++ 
จะหาเวลามาทำหัวข้อนี้นะ

