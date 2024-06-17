
# Install

``` bash
# ตรวจสอบว่า CPU รองรับหรือไม่ต้องได้เลขมากว่า 0
egrep -c '(vmx|svm)' /proc/cpuinfo
# ดูว่ามี vmx หรือ svm หรือไม่
grep -E --color '(vmx|svm)' /proc/cpuinfo
sudo apt install qemu-kvm libvirt-clients libvirt-daemon-system bridge-utils virtinst libvirt-daemon

sudo apt install virt-manager -y
sudo virsh net-list --all
```

ตรวจสอบเน็ตเวิร์กของ KVM และสั่งให้เริ่มทำงาน
```
sudo virsh net-list --all
sudo virsh net-start default
sudo virsh net-autostart default
sudo virsh net-list --all
```


Check this
https://linux.how2shout.com/how-to-install-and-configure-kvm-on-debian-11-bullseye-linux/

