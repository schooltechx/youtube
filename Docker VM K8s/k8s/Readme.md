# Kubernetes
เป็นแพลตฟอร์มโอเพ่นซอร์สที่ออกแบบมาเพื่อรันแอปพลิเคชันแบบคอนเทนเนอร์ ที่สามารถ deploy และ ปรับขนาดโดยอัตโนมัติและมีคุณสมบัติอื่น ๆ อีกมากมาย เริ่มต้นพัฒนาโดยโปรเจ็ก Google ภายในชื่อ Borg เปิดเป็นโอเพ่นซอร์ส ในปี 2014 และดูแลโดย Cloud Native Computing Foundation(CNCF) ในปี 2015 

## เหตผลในการใช้ 
- Scalability ทำได้ทั้งแบบ Horizental โดยเพิ่มจำนวน instant และ Vertical เพิ่ม CPU/Memory
- Portability สามารใช้ใน on-primis, Public Clouds, Hybrid 
- Flexibility มี Plugin เพื่อเพิ่มความสามารถ รองรับ Container Runtime(CRI) หลายตัวเช่น Docker, Containerd หรือเลือกเน็ตเวิร์กได้หลายแบบ
- Community and Ecosystem มีผู้ใช้งานเยอะทำให้มีเครื่องมือรองรับมากมาย

## คุณสมบัติหลัก
- Container Orchestration 
คอนเทนเนอร์ทำงานบนฮาร์ดแวร์หรือเซิร์ฟเวอร์เสมือน kubernetes ทำหน้าที่ประสานคอนเทนเนอร์หลายตัวเข้าด้วยกัน โดยที่ไม่ต้องกังวลอีกต่อไปว่าจะเรียกใช้คอนเทนเนอร์จากเครื่องไหน 
- Automate Deployment and Scaling รวบรวมข้อมูลเช่น CPU และหน่วยความจำที่มีอยู่ จากนั้นจะตัดสินใจว่าจะรันคอนเทนเนอร์ที่เครื่องไหนตามความ
ต้องการที่กำหนด หากคุณมีทรัพยากรการคำนวณจำนวนมาก kubernetes สามารถ
ใช้เซิร์ฟเวอร์ทุกเครื่องที่คุณมีได้อย่างมีประสิทธิภาพ นอกจากนี้ยัง  จัดการวงจรชีวิตของคอนเทนเนอร์ kubernetes ปรับขนาดจำนวนคอนเทนเนอร์ได้โดยอัตโนมัติเพื่อตอบสนอง
ความต้องการหากจำเป็น kubernetes ตัวที่สอง ปรับใช้และปรับขนาด
แอปพลิเคชันแบบคอนเทนเนอร์ได้โดยอัตโนมัติ การทำงานจะมองเป็นออบเจ็กต์ระดับสูง เช่น Deployment และ Statefull set การขยายขีดความสามารถแบบ horizontal ได้อัตโนมัต

- Loadbalancer โหลดบาลานซ์เพื่อเพื่อกระจายการรับส่งข้อมูลเครือข่ายไปยังคอนเทนเนอร์ภายใน โดยคลัสเตอร์ IP โดยจะใช้ Round Robin เพื่อส่งคำขอไปยังแต่ละคอนเทนเนอร์ที่อยู่ด้านหลัง

- Ingress เพื่อเปิดช่องทางให้แอปพลิเคชันเข้าถึงจากอินเทอร์เน็ตได้ จะถูกแทนที่ด้วย Gateway API

- Service Discovery จะใช้ Pod Label ซึ่งช่วยให้คอนเทนเนอร์สามารถค้นหาและสื่อสารระหว่าง
กันภายในคลัสเตอร์

- Self-Healing มีความสามารถในการซ่อมแซมตนเอง หากคอนเทนเนอร์ล้มเหลวหรือไม่ตอบสนอง  จะรีสตาร์ท หรือย้ายไปยังโหนดที่มีสุขภาพดี มีประโยชน์อย่างยิ่ง ในระบบคลาวด์ เช่น ถ้ามีมี Noisy Neighbor บนเซิร์ฟเวอร์ฮาร์ดแวร์ที่คุณใช้เครื่องเสมือนของคุณ หรืออาจใช้อินสแตนซ์ส Pod ราคาถูกที่ ผู้ให้บริการคลาวด์สามารถนำออกไปได้ตลอดเวลา Pod ก็จะย้ายไปทำงานที่เครื่องอื่นได้อัตโนมัติ

- Declarative Configuratio ค่าคอนฟิกเป็นที่กำหนดสถานะที่ต้องการของแอปพลิเคชันเช่น จำนวนเรพลิกาที่คุณต้องการเรียกใช้ ตัว kubernetes จะตรวจสอบสถานะที่ต้องการ เปรียบเทียบ
กับสถานะจริง และดำเนินการที่จำเป็น หากไม่ตรงกัน แนวทางนี้จะ แตกต่างจากแบบเดิม (imperative)
โดยที่  คุณกำหนดรายการคำสั่งคำสั่งให้รันเพื่อให้ได้สถานะที่คุณต้องการ

- Storage Orchestration ปกติแล้วจะเหมาะกับการรับโปรแกรมแบบ Stateless แต่เมื่อต้องการรันแบบ stateful อย่างเช่นฐานข้อมูลจำเป็นต้องมีการจัดการที่แตกต่าง ถ้ามีการรันฐานข้อมูลบนโหนดใหม่จะจะไม่ีมีข้อมุลเดิมอยู่ จะมีวิธีการการเชื่อมกับโวลุ่มเข้ากับคอนเทนเนอร์ได้ตามต้องการ ด้วย NFS หรือวิธีอื่นๆ

- Secret and Configuration Management ใช้ Secret เพื่อจัดเก็บข้อมูลที่ละเอียดอ่อน เช่น รหัสผ่าน,โทเค็นของแอปพลิเคชัน ฯลฯ นอกจากนี้ คุณยังสามารถแยกซอร์สโค้ดแอปพลิเคชันออกจาก
ตัวแปรเฉพาะสภาพแวดล้อมโดยใช้ config map เช่นใน


## Install
การติดตั้งและใช้งานดูที่ Play list นี้ครับ

[![IMAGE ALT TEXT](https://img.youtube.com/vi/L0C39xgWWKQ/0.jpg)](https://www.youtube.com/watch?v=L0C39xgWWKQ&list=PLWMbTFbTi55OtdeRGeerLFQSTw61cEGni&index=3 "Kubernates")

สำหรับการทดสอบหัดใช้คำสั่งต่างๆแนะนำให้ลอง K3D ถ้าเอาไปใช้งานจริงแนะนำให้ใช้ [K3s](./k3s/) ควรติดตั้งเครื่องหรือ VM Linux แนะนำเป็น Debian การติดตั้ง container มีปัญหาค่อนข้างเยอะต้องปรับแต่งมาก เพราะจะโหลด Kernel Module บางตัวไม่ได้เพราะมันใช่ kernel กับ file system ร่วมกับเครื่อง Host 

## ติดตั้งเพิ่มเติม
- ติดตั้ง [debian](https://www.snel.com/support/debian-vm-in-proxmox-and-networking-setup/) VM บน proxmox
- ติดตั้ง [k3s](./k3s/)
- [helm](https://helm.sh/docs/intro/install/) 
``` bash
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```
- cert-manager ลองดูเวอร์ชั่น[ล่าสุด](https://github.com/cert-manager/cert-manager/releases) และ[รองรับกับ K8s รุ่นที่ใช้หรือไม่](https://cert-manager.io/docs/installation/supported-releases/)
```bash

kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.crds.yaml
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.11.0
```
- ติดตั้ง [Rancher](https://ranchermanager.docs.rancher.com/getting-started/quick-start-guides/deploy-rancher-manager/helm-cli) ต้องรอซักพักถึงจะใช้งานได้ควรมี RAM 8GB ขึ้นไป ให้ติดตั้ง Helm และ cert-manager ให้เรียบร้อยก่อน
``` bash
# check version
helm search repo rancher-latest/rancher --versions
kubectl create namespace cattle-system
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
helm install rancher rancher-latest/rancher \
  --namespace cattle-system \
  --set hostname=<DOMAIN_NAME> \
  --set replicas=1 \
  --set bootstrapPassword=<PASSWORD_FOR_RANCHER_ADMIN>
kubectl get pod -n cattle-system -w
```
- ติดตั้ง [Longhorn](https://longhorn.io)
ติดตั้งผ่าย Market Place ของ Rancher ก็จะง่ายหน่อย รอดูว่าใช้ได้หรือยังด้วยคำสั่งนี้
kubectl get pods --namespace longhorn-system -w

## uninstall
- Rancher Cleanup(https://github.com/rancher/rancher-cleanup)

## คำสั่งพื้นฐาน 
``` bash
kubectl create ns <namespace>
kubectl get pods --all-namespaces
kubectl get all --all-namespaces
kubectl get all -n <namespace>
kubectl logs <pod-name>
kubectl exec -it <podname> -- /bin/bash
kubectl apply -f deploy.yaml
kubectl delete -f deploy.yaml
```

etcd เก็บ status ของ component ใน k8s ไว้

## ตัวอย่างการสร้างเวปเซิร์ฟเวอร์
ดูไฟล์ [my-web.yaml](./web/my-web.yml) สำหรับการทำ web server

เราสามารถแยกเป็น 3 ไฟล์สำหรับ Deploy, Serive และ Ingress ได้ ในตัวอย่างรวมเป็นไฟล์เดียว
- Deployment สร้าง nginx สอง replicas 
- Service สร้าง service ที่ port 80 
- Ingress สร้าง ingress มาเชื่อมต่อกับ service
```bash
kubectl apply -f my-web.yaml
```
ถ้าไม่ใช้แล้ว
```bash
kubectl delete ingress nginx -n my-web
kubectl delete svc nginx -n my-web
kubectl delete deployment nginx -n my-web
```

## YAML
ประกอบไปด้วย สามส่วนหลักๆ
- metadeta
label เป็นตัวที่ service จะอ้างถึง
- spec
ตรง template เป็นต้นแบบ
selector ของ service จะใช้อ้างถึง labal ของ deploymenht


## Namespace
https://youtu.be/K3jNo4z5Jx8
เหมือนเป็น cluster เสมือนไว้จัดระเบียบไม่ให้ปนกัน ที่ใช้เพื่อให้หลายทีมใช้งานร่วมกันอย่างมีประสิทธิ์ภาพ ไม่ต้องกลัวตั้งชื่อซ้ำกัน
- แบ่งตามทีม
- แบ่งตามกลุ่ม app 
- แยกตามเวอร์ชั่น
- จำกัด resource แยก namespace เพื่อความปลอดภัยและแบ่งให้ใช้งาน


```
kubectl apply -f deployment.yaml --namespace=my-namespace
``

มีอบางอย่างเช่น Volume และ Node ที่จะไม่อยู่ใน Namespace มีอะไรบ้างดูด้วยคำสั่ง
```bash
kubectl api-resources --namespaced=false
```




kubectl get ns
kubectl get all --all-namespaces
kubectl create ns <name>
kubectl delete ns <name>






# Storage
Persistent Volumes(pv) จะไม่อยู่ใน namespace ใดๆ จะเห็นทั้งหมด admin เป็นคนสร้าง
Persistent Volumes Claim(pvc) อยู่ใน namespace เดียวกับ Pod
Storage Class จะสร้าง PV แบบ dynamic เมื่อ PVC ต้องการ



# อ่านเพิ่ม
- [Tempate](https://github.com/ChristianLempa/boilerplates/tree/main/kubernetes/templates)

