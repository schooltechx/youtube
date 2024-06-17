# Cound Image

## ดาว์นโหลด Cound Image
- [Debian](https://cloud.debian.org/images/cloud/) ไฟล์ debian-12-genericcloud-amd64-20240211-1654.qcow2
- [Ubuntu](https://cloud-images.ubuntu.com/releases/) ไฟล์ ubuntu-22.04-server-cloudimg-amd64.img
- [RockyLinux](http://dl.rockylinux.org/pub/rocky) ไฟล์ Rocky-x-GenericCloud.latest.x86_64.qcow2
- [Fedora](https://mirror.nju.edu.cn/fedora/releases/) ไฟล์ Fedora-Cloud-Base-XX-YY.x86_64.qcow2
- [Alpine](https://alpinelinux.org/cloud/)

## สร้าง Linux VM
- General Name: template-ubuntu22.04 ตัวอย่างนี้ใช้ id 1001
- OS Do not use any media
- System Qemu Agent ส่วนอื่นใช้ตาม default ถ้าจะทำ GPU Passthrugh ให้ใช้ q35/OVMF (UEFI) แทนได้
- Disk ให้ลบออก จะสร้างทีหลังจาก Cloud image
- CPU 4 core, Type hosts
- Memory ตามต้องการ ถ้าจะทำ GPU Passthrugh ให้เอา Baloon Device ออก
- Network ตามค่า default แล้วจบการสร้าง
- ดาว์นโหลด cloud image แล้ว import เป็น Disk Image
    ```
    wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img
    qm disk import 1001 ./jammy-server-cloudimg-amd64.img local-lvm 
    ```
- ไปที่ Hardware จะเห็น "Unused Disk 0" ให้ Edit เลือก Discard แล้วกด Add
- Add CloudInit Drive
- ลบ CD ROM ออก 
- ไปที่ Options/Boot Order ให้ Enable scsi0 แล้วเปลี่ยนให้เป็นดีสก์แรก
- Coud-Init แก้ค่าตั้งต้นตามต้องการ
- คลิ้กขวาที่ VM เลือก Contert to template เพื่อไม่ให้แก้ไขได้อีก
- สร้าง VM ใหม่โดยการคลิ้กขวาที่ template แล้วเลือก clone แนะนำให้เลือก Full Clone เพื่อที่จะสามารถลบ template ทิ้งได้ในภายหลัง
- ดีสก์จาก template จะขนาดเล็กให้ขยายดีสก์ก่อนเริ่มใช้งาน Hardware/Disk Action/Resize

## Note
- ขยาย linux VM ดีส์ไปที่ Hardware/Disk Action/Resize แล้ว[ทำการขยายดีสก์และ filesystem](https://help.clouding.io/hc/en-us/articles/360010074599-How-to-extend-partitions-manually-on-Linux)
    ```
    df -h
    sudo sfdisk -l
    sudo growpart /dev/sda 1
    resize2fs /dev/sda1
    ```
- Install Graphic Desktop
```
sudo apt install lightdm
sudo apt install ubuntu-desktop
```
- [Install Desktop Environment](https://phoenixnap.com/kb/how-to-install-a-gui-on-ubuntu)

## POP OS
เพิ่ม [Pop!_OS PPA](https://launchpad.net/~system76/+archive/ubuntu/pop)
```
sudo add-apt-repository ppa:system76/pop
sudo apt update
```



# อ่านเพิ่ม

- [Linux VM Templates in Proxmox on EASY MODE using Prebuilt Cloud Init Images!](https://www.apalrd.net/posts/2023/pve_cloud/) - วีดีโอสอนทำแบบง่ายและมี script สำหรับดาว์นโหลด

- [CLOUDINIT WITH PROXMOX | Why, what and how | Make installs easier than ever before!](https://www.youtube.com/watch?v=UQaCrByk53E) - วีดีโอสอนการทำ

- [Proxmox Ubuntu 22.04 Jammy LTS Cloud-init Image Script](https://austinsnerdythings.com/2023/01/10/proxmox-ubuntu-22-04-jammy-lts-cloud-image-script/)

- [Building Windows Cloud Images on OpenMetal](https://openmetal.io/docs/manuals/engineers-notes/building-windows-cloud-images-on-openmetal)