


## ขั้นตอนที่ต้องทำ
```
# เปิด IOMMU vt-d ถูกต้องจะเจอข้อความ IOMMU enabled
dmesg | grep -e DMAR -e IOMMU
nano /etc/default/grub
# แก้ GRUB_CMDLINE_LINUX_DEFAULT ด้วยเนื้อหาด้านล่างไม่ต้องขึ้นบรรทัดใหม่
update-grub
nano /etc/modules
update-initramfs -u -k all
```


# เปิด IOMMU


## แก้ boot loader
/etc/default/grub
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream,multifunction initcall_blacklist=sysfb_init video=simplefb:off video=vesafb:off video=efifb:off video=vesa:off disable_vga=1 vfio_iommu_type1.allow_unsafe_interrupts=1 kvm.ignore_msrs=1 modprobe.blacklist=radeon,nouveau,nvidia,nvidiafb,nvidia-gpu,snd_hda_intel,snd_hda_codec_hdmi,i915"
```
หรือ 
/etc/default/grub
```
#Intel
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"
#AMD
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on"
```
ทำ backlist ไปที่ /etc/modprobe.d/blacklist.conf
```
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nvidia" >> /etc/modprobe.d/blacklist.conf
echo "blacklist radeon" >> /etc/modprobe.d/blacklist.conf
```
# ดู PCI address ยกตัวอย่างของ Nvidia จะมี GPU กับ Audio เอา address ไปใส่ตรง ids
``
lspci -nn | grep -i nvidia
echo "options vfio-pci ids=10de:128b,10de:0e0f disable_vga=1"> /etc/modprobe.d/vfio.conf
echo "options kvm ignore_msrs=1" >> /etc/modprobe.d/kvm.conf 
``

```
# Modules required for PCI passthrough
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

/etc/pve/qemu-server/<vmid>.conf
```
machine: q35
cpu: host,hidden=1,flags=+pcid
args: -cpu 'host,+kvm_pv_unhalt,+kvm_pv_eoi,hv_vendor_id=NV43FIX,kvm=off'
```


https://3os.org/infrastructure/proxmox/gpu-passthrough/igpu-passthrough-to-vm/#proxmox-configuration-for-igpu-full-passthrough


https://www.virtualizationhowto.com/2023/10/proxmox-gpu-passthrough-step-by-step-guide/
https://www.reddit.com/r/homelab/comments/b5xpua/the_ultimate_beginners_guide_to_gpu_passthrough/


## Info
- จำ PCI-E ที่บอร์ดรองรับ แก้เลยท้ายลิงค์ตามจำนวนที่ค้นหา 
[5](https://pangoly.com/en/hardware/motherboard/pci-express-x16-slots/6)
[6](https://pangoly.com/en/hardware/motherboard/pci-express-x16-slots/6)
[7](https://pangoly.com/en/hardware/motherboard/pci-express-x16-slots/7)

