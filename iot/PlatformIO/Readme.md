# PlatformIO
จะทำ Extension ทำให้ VS Code กลายเป็นเป็น IDE สำหรับ Arduino และ ไมโครคอนโทรลเลอร์หลายรุ่น สามารถใช้แทน Arduino IDE ได้และมีความสามารถมากกว่ามาก


## Install
- ติดตั้ง [Python](https://docs.platformio.org/en/latest/faq/install-python.html)
- ติดตั้ง VS Code กับ Extension PlatformIO IDE ปิด VS Code แล้วเปิดใหม่



ทดสอบ serial port บน Linux
```sh
lsusb
# รันคำสั่งนี้ ถอดแล้วเสียบอุปกรณ์ 
sudo dmesg -w
```

## Remote SSH
สำหรับการใช้ง่านผ่าน Remote SSH จะเห็นหน้าว่างจำเป็นต้องมีการตั้งค่า VS Code/File/Preferences/Setting ไปที่ Extensions/PlatformIO IDE
Pio Home Server Http Port เป็น 8008

```
Host debian12ct
  User oom
  HostName 192.168.2.101
  ForwardAgent yes
  LocalForward 127.0.0.1:8008 127.0.0.1:8008
  IdentityFile ~/.ssh/debian12ct-oom
```
## Proxmox USB Passthrugh

ใช้คำสั่ง lsusb เพื่อดูเลขของ "Silicon Labs CP210x UART Bridge" คือ 001 กับ 045 ใช้คำสั่ง ls -la เพื่อดูเลขอุปกรณ์ได้เลข 189, 44
```sh
$ lsusb
Bus 001 Device 002: ID 0b05:19af ASUSTek Computer, Inc. AURA LED Controller
Bus 001 Device 011: ID 8087:0026 Intel Corp. AX201 Bluetooth
Bus 001 Device 045: ID 10c4:ea60 Silicon Labs CP210x UART Bridge
Bus 001 Device 012: ID 04d9:1203 Holtek Semiconductor, Inc. Keyboard
Bus 001 Device 008: ID 05e3:0608 Genesys Logic, Inc. Hub
Bus 001 Device 015: ID 046d:0825 Logitech, Inc. Webcam C270
...
ls -la 
$ ls -la /dev/bus/usb/001/045 
crw-rw-r-- 1 root root 189, 44 Dec 21 22:54 /dev/bus/usb/001/045
```
ผมจะทำกับคอนเทนเนอร์ 101
```sh
nano /etc/pve/lxc/101.conf
```
เพิ่มสองบรรทัดนี้เข้าไป
```
lxc.cgroup.devices.allow: c 189:* rwm
lxc.mount.entry: /dev/bus/usb/001 dev/bus/usb/001 none bind,optional,create=dir
lxc.cgroup.devices.allow: c 188:* rwm
lxc.mount.entry: /dev/ttyUSB0 dev/ttyUSB0 none bind,optional,create=file
```

## อ่านเพิ่ม

- [PlatformIO: All you need to know in 10 Minutes!](https://www.youtube.com/watch?v=PYSy_PLjytQ)
- [ใช้งานผ่าน Remote ssh](https://github.com/luxk3/ubuntu_server_remote_dev_platformio)
- [Getting Started with PlatformIO](https://www.youtube.com/watch?v=JmvMvIphMnY)