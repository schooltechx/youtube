# Install k3s 
ติดตั้ง kubernetes บน VM ทำได้ไม่มีปัญหา แต่กินทรัพยากรสูง
รุ่นใหม่จะใช้ k8s 1.25.x ขึ้นไปมีการเปลี่ยนแปลง API ทำให้มีปัญหากับโปรแกรมอื่นๆ(เช่น Longhorn และ Rancher) ตอนนี้แนะนำให้ติดตั้งเวอร์ชั้น 1.24.x คำสั่งโดยสรุป

``` bash
curl -sfL https://get.k3s.io | sudo INSTALL_K3S_VERSION=v1.24.10+k3s1 sh -s - server --cluster-init
mkdir ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown username:username ~/.kube/config
kubectl cluster-info
kubectl get pod --all-namespaces -w
```
เพื่อบรรทัดด้านล่างนี้ใน ~/.bashrc
``` bash
export KUBECONFIG=~/.kube/config
source <(kubectl completion bash)
alias k=kubectl
complete -o default -F __start_kubectl k
```
ทดสอบการใช้เบื้องต้นลองติดตั้ง [Docker Registry](../private-registry/) ดูครับ

## Uninstall
``` bash
sudo /usr/local/bin/k3s-uninstall.sh
sudo /usr/local/bin/k3s-agent-uninstall.sh
```


## อ่านเพิ่มเติม
- [K3S Rocks](https://k3s.rocks)
- ติดตั้ง [Rancher](https://ranchermanager.docs.rancher.com/getting-started/quick-start-guides/deploy-rancher-manager/helm-cli) 

# Install k3s บน Proxom CT (LXC)
ติดตั้งบน Container เพราะใช้ทรัพยากรน้อยกว่ามาก และแชร์ทรัพยากรระหว่าง container ได้ดีด้วย แต่ก็มีปัญหากับ zfs  ติดตั้ง Proxmox ใหม่เปลี่ยนไปใช้ Brtfs หรือ ext4 แทน เนื่องจาก container แชร์ kernel กับ host ด้วยเหตุผลด้านความปลอดภ้ยทำให้ไม่สามารถติดตั้ง Kernel Module เพิ่มได้ และปิดบางโมดูลด้วย จะมีปัญหากับ iSCSI, Longhorn

## Step2 บนเครื่อง HOST
ปิดการใช้งาน swap บน เครื่อง host 
``` hosts
echo overlay >> /etc/modules
sysctl vm.swappiness=0
swapoff -a
```
## Step 2 สร้าง Container (LXC) 
สร้าง CT เอาติ๊ก unprivileged ออก CPU 2 Core, RAM 4 GB (swap 0), Disk 40GB  , Options ให้เลือก fuse=1,nesting=1 
อย่าพึ่งเริ่มทำงาน

## Step 3 ที่เครื่อง HOST
เครื่อง host ให้เพิ่ม 4 บรรทัดนี้ไปในท้ายไฟล์คอนฟิกของ container /etc/pve/lxc/<container_id>.conf 
```
lxc.apparmor.profile: unconfined
lxc.cgroup.devices.allow: a
lxc.cap.drop:
lxc.mount.auto: "proc:rw sys:rw"
```

รัน  CT ขึ้นมา แล้วจากเครื่อง host ให้เรียกคำสั่งนี้
```
pct push <container_id> /boot/config-$(uname -r) /boot/config-$(uname -r)
```

## Step 4
เครื่อง  CT ให้สร้างไฟล์ /usr/local/bin/conf-kmsg.sh

```
#!/bin/sh -e
if [ ! -e /dev/kmsg ]; then
	ln -s /dev/console /dev/kmsg
fi
mount --make-rshared /
```

เครื่อง  CT  สร้างไฟล์ /etc/systemd/system/conf-kmsg.service

``` bash
[Unit]
Description=Make sure /dev/kmsg exists
[Service]
Type=simple
RemainAfterExit=yes
ExecStart=/usr/local/bin/conf-kmsg.sh
TimeoutStartSec=0
[Install]
WantedBy=default.target
```

``` bash
chmod +x /usr/local/bin/conf-kmsg.sh
systemctl daemon-reload
systemctl enable --now conf-kmsg
```
หลังจากนั้นก็ติดตั้ง K3s เหมือนบน VM


## อ่านเพิ่ม
- [Setting up a k3s Kubernetes cluster on Proxmox virtual machines with MetalLB](https://canthonyscott.com/setting-up-a-k3s-kubernetes-cluster-within-proxmox/)