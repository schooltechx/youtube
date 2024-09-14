
## ขั้นตอนที่ต้องทำ
```
nano /etc/default/grub
# แก้ GRUB_CMDLINE_LINUX_DEFAULT ด้วยเนื้อหาด้านล่างไม่ต้องขึ้นบรรทัดใหม่
update-grub
reboot
# เปิด IOMMU vt-d ถูกต้องจะเจอข้อความ IOMMU enabled
dmesg | grep -e DMAR -e IOMMU
lspci -nnv
nano /etc/modprobe.d/vfio.conf
nano /etc/modprobe.d/kvm.conf
nano /etc/modprobe.d/nvidia.conf
nano /etc/modprobe.d/vfio.conf
nano /etc/modprobe.d/iommu_unsafe_interrupts.conf
nano /etc/initramfs-tools/modules
nano /etc/modules
update-initramfs -u -k all
reboot
```



/etc/default/grub
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"
```
update
```
update-grub
``

Script find group
```
#!/bin/bash
shopt -s nullglob
for d in /sys/kernel/iommu_groups/*/devices/*; do
    n=${d#*/iommu_groups/*}; n=${n%%/*}
    printf 'IOMMU Group %s ' "$n"
    lspci -nns "${d##*/}"
done;
```

group 17,19 
```
IOMMU Group 17 0000:01:00.0 3D controller [0302]: NVIDIA Corporation GP104GL [Tesla P4] [10de:1bb3] (rev a1)
IOMMU Group 19 0000:06:00.0 VGA compatible controller [0300]: NVIDIA Corporation GK208B [GeForce GT 710] [10de:128b] (rev a1)
IOMMU Group 19 0000:06:00.1 Audio device [0403]: NVIDIA Corporation GK208 HDMI/DP Audio Controller [10de:0e0f] (rev a1)
```

/etc/modprobe.d/vfio.conf
```
options vfio-pci ids=10de:128b,10de:0e0f,10de:1bb3
```

/etc/modprobe.d/kvm.conf
```
options kvm ignore_msrs=1
```

/etc/modprobe.d/nvidia.conf
```
softdep nouveau pre: vfio-pci
softdep nvidia pre: vfio-pci
softdep nvidia* pre: vfio-pci
```

/etc/modprobe.d/iommu_unsafe_interrupts.conf
```
options vfio_iommu_type1 allow_unsafe_interrupts=1
```

/etc/initramfs-tools/modules
```
vfio vfio_iommu_type1 vfio_virqfd vfio_pci ids=10de:128b,10de:0e0f,10de:1bb3
```

/etc/modules
```
vfio vfio_iommu_type1 vfio_pci ids=10de:128b,10de:0e0f,10de:1bb3
```

/etc/pve/qemu-server/106.conf
```
agent: 1,freeze-fs-on-backup=0
args: -cpu 'host,+kvm_pv_unhalt,+kvm_pv_eoi,hv_vendor_id=NV43FIX,kvm=off'
cpu: host,hidden=1,flags=+pcid
machine: pc-q35-8.1
```



How to Pass-through PCIe NICs with Proxmox VE on Intel and AMD
https://www.servethehome.com/how-to-pass-through-pcie-nics-with-proxmox-ve-on-intel-and-amd/