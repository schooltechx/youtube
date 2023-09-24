
# Proxmox 7.x portable: ทำคลัสเตอร์เซิร์ฟเวอร์แบบพกติดตัว

[![Proxmox 7.x portable: ทำคลัสเตอร์เซิร์ฟเวอร์แบบพกติดตัว](https://img.youtube.com/vi/EPYAjAd3Dkg/0.jpg)](https://youtu.be/EPYAjAd3Dkg "Proxmox 7.x portable: ทำคลัสเตอร์เซิร์ฟเวอร์แบบพกติดตัว")

พัฒนาโปรแกรม Backend,  Frontend บนเครื่องเดียวกันชักไม่ไหว Windows11, WSL2, Docker , Hyper-V กินแรมกับ CPU สูงกว่าบน Linux มาก จะไปใช้ VMware ESXi บริษัท ก็ได้ แต่ต้องต่อ VPN แล้วจะติดตั้งอะไรเองไม่สะดวก หาเครื่องเก่าๆซักเครื่องมาติดตั้ง Linux ก็เข้าที แต่ความอยากมันไม่มีที่สิ้นสุด อยากทำ Lab Network ไว้ทดสอบพวก cluster อยากใช้ทั้ง VM และ Container อยาก ทำเครื่อง Build/Test ไม่อยากติดตั้งอะไรบ่อยๆ และอยากอีกหลายอย่าง ก็ลงเอยที่ติดตั้ง Proxmox ดู กำลังคิดว่างานทั่วไปเช่น Excel Word  ใช้ Remote Desktop  เข้าใช้ใน Windows VM จะทำงานสะดวกหรือเปล่าหว่า ถ้าลองแล้วทำงานได้ราบลื่น ก็อาจจะแปลงร่างเครื่องที่ใช้ประจำเป็น Proxmox หวังว่า คงไม่ติด Loop เดิมที่เครื่องเดียวทำงานไม่ไหว งานส่วนใหญ่ Linux Base น่าจะทำได้เร็วและใช้ทรัพยากรน้อยกว่า Windows 11 เยอะ

ตอนนี้มีเครื่อง Lenovo T430 แรม 4GB , ฮาร์ดดีสก์ 320GB สองตัว (อีกอันใส่ถาดของ DVD) ทำเป็น Software RAID ติดตั้ง Proxmox ทำเป็น Type 1 Hypervisor ไม่กินทรัพยากร แต่ฟีเจอร์ดีกว่าตัวฟรีอื่นๆ ที่มักจะต้องจ่ายถึงจะใช้ได้ ในวีดีโอแสดงการติดตั้งเพื่อใช้บนโน้ตบุ๊ก แบบมี GUI เป็น XWindows ตัวเดียวจบ เปิดเวปเข้าไปจัดการได้ในเครื่องเดียว วีดีโอแถมติดตั้ง Linux Container พ่วง Docker ด้วย ถึงไม่มีเน็ตก็ใช้ได้ ยกไปเป็นเครื่อง demo ให้ลูกค้าดู หรือเอาไปเที่ยวปีใหม่ด้วย ส่วนวันเสาร์/อาทิย์ ไม่ทำงานเปิด Minecraft Server ให้เด็กๆเล่นก็น่าจะดี อยู่บ้านเปิดตลอดเอาไปรัน Home Asistance ก็น่าจะได้อยู่นะเป็นโปรเจ็กที่คิดไว้นานแล้ว เข้าเน็ตเปิด Youtube ตอนว่างๆได้เหมือนเครื่องปกติ  (ฝันไปเรื่อยเปื่อย)

ติดตั้ง Docker  เป็นแบบมาตรฐานยาวหน่อย ถ้าไปดูเวปแสดงวิธีติดตั้งหน้าท้ายๆจะมี script เรียกทีเดียวจบไม่เหมาะกับ production นะ  จริงแล้วติดตั้งบน VM มีปัญหาน้อยกว่ามากแต่กินทรัพยากรมากกว่า ในวีดีโอติดตั้งบน unprivileded LXC ปลอดภัยแต่จะมีปัญหากับ Docker Container  บางตัวที่ต้องการสิทธิ์ในการเข้าถึง device ค่อนข้างมากแก้โดย ตอนสร้างตั้งเป็น  unprivileded เป็น No แล้วตรง Feature ใช้ Nest=1, FUSE=1  เท่าที่ลองตอนนี้จะติดตั้ง minikube ไม่ได้คงต้องไปทำบน VM แทน

# รายการคำสั่ง 

```bash
# comment pve-enterprise
nano /etc/apt/sources.list.d/pve-enterprise.list
# เพิ่ม deb http://download.proxmox.com/debian/pve bullseye pve-no-subscription
nano /etc/apt/sources.list
# ต้องติดตั้ง ceph จาก web ui ก่อน
nano /etc/apt/sources.list.d/ceph.list
apt update
apt upgrade
apt-get install xfce4 chromium lightdm
adduser newusername
systemctl start lightdm
# ให้เลือก HandleLidSwitch=ignore และ HandleLidSwitchDocked=ignore
nano /etc/systemd/logind.conf
systemctl restart systemd-logind.service
#แก้บรรทัดนี้ GRUB_CMDLINE_LINUX="consoleblank=300"
nano /etc/default/grub
update-grub
## รายการคำสั่งเพิ่มจากวีดีโอ
dpkg-reconfigure locales
dpkg-reconfigure tzdata
# สร้างยูสเซอร์เพื่อจะใช้ ssh ได้
apt install sudo
adduser newuser
usermod -aG sudo newuser
# อัปเกรดโปรแกรม
apt-get update && apt-get upgrade
# อัปเกรดเวอร์ชั่นของ proxmox
apt-get update && apt-get dist-upgrade
```

## Software
ทำตัวติดตั้งแบบ [YUMI(แนะนำตัวนี้)](https://www.pendrivelinux.com/yumi-multiboot-usb-creator/), 
[Etcher](https://www.balena.io/etcher/),
[Rufus](https://rufus.ie/en/)

## Download Proxmox
https://pve.proxmox.com/wiki/Package_...

## Proxmox
ข้อมูลเกี่ยวกับ proxmox ในวีดีโอเอามาจากหลายๆที่
- [Install proxmox](https://pve.proxmox.com/wiki/Installation)
- [Community Repo](https://pve.proxmox.com/wiki/Package_Repositories)
- [Developer Workstations with Proxmox VE and X11](https://pve.proxmox.com/wiki/Package_Repositories)
- [Installing Proxmox on a laptop](https://davenewman.tech/blog/install-proxmox-on-a-laptop/)
## Docker
[ติดตั้ง Docker แบบรวดเร็ว](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script) (ไม่แนะนำสำหรับ Production นะ)

```bash
apt update 
apt install curl -y
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

## เพิ่มเติม
การติดตั้งแบบในตัวอย่างมีความปลอดภัยสูง แต่ค่อนข้างมีข้อจำกัดมากในการใช้งาน Docker บางประเภท ปลดข้อจำกัดโดยตอนสร้างตรง General ให้ เอาติ๊ก Unprivileged container ออก พอสร้าง CT เสร็จแล้วตรง Options/Feature ให้เลือก Nesting, FUSE
Chromium ไม่สามารถแสดงเวปภาษาไทยได้เพราะไม่มีฟอนต์ให้ติดตั้งดังนี้
```
apt install fonts-indic fonts-noto fonts-noto-cjk
```
สำหรับคนที่ใช้ ubuntu ให้ลง docker ผ่าน snap ก็ได้
```
sudo snap install docker
```