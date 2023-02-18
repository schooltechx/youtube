# Argo Workflows 
ใช้จัดการงานที่มีขั้นต้อนบน Kubernetes เหมือนการเขียน Script แต่มีระบบการจัดการที่ดีกว่ามาก ใช้ได้กับงานหลากหลายแนะนำให้ลองใช้ครับ ไม่จำเป็นต้องเขียนโปรแกรมก็ใช้ได้

[![Argo Workflows Basic](https://img.youtube.com/vi/Y32is2j_Ju0/0.jpg)](https://www.youtube.com/watch?v=Y32is2j_Ju0&list=PLWMbTFbTi55P6Vzv9a-un9oFZY-PwMj98&index=31 "งานเล็กหรือใหญ่จบได้ด้วย Argo Workflows")


## Install argo cli
คำสั่งที่ใช้ เอามาจากหน้า [Release](https://github.com/argoproj/argo-workflows/releases/)

``` bash
curl -sLO https://github.com/argoproj/argo-workflows/releases/download/v3.4.5/argo-linux-amd64.gz
gunzip argo-linux-amd64.gz
mv ./argo-linux-amd64 /usr/local/bin/argo
```
## ติดตั้ง Argo Workflow แบบพื้นฐาน

แบบจาก [Main Branch](https://github.com/argoproj/argo-workflows/) จะติดตั้งโปรแกรมสำหรับหัดใช้งานมาด้วย(ไม่เหมาะกับ Production)
```bash
kubectl create ns argo
kubectl apply -n argo -f https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/quick-start-postgres.yaml
```
สำหรับใช้งานจริงให้เอาคำสั่งจากหน้า [Release](https://github.com/argoproj/argo-workflows/releases/) ให้เปลี่ยนเวอร์ชั่นให้เหมาะสม 
``` bash
kubectl create namespace argo
kubectl apply -n argo -f https://github.com/argoproj/argo-workflows/releases/download/v3.4.5/install.yaml
```
หลังติดตั้งให้รอซักครู่ เวลาใช้งานจะต้อง port-forward เพื่อเข้าใช้งาน หรืออีกวิธีหนึ่งคือผ่าน ingress ดูในหัวข้อต่อๆไป
``` bash
# ใช้ UI ผ่าน https://localhost:2746 หรือ  https://<IP>:2746
kubectl -n argo port-forward deployment/argo-server 2746:2746 --address 0.0.0.0
kubectl -n argo port-forward service/argo-server 2746:2746 --address 0.0.0.0
```
ค่าตั้งต้นของ Authentication ต้อง สร้าง token ไปใช้ในการ login เข้า Web UI ต้องมี Bearer นำหน้าด้วย ฟอร์แม็ตประมาณนี้ "Bearer eyJJ9.....-tyfMg" (สำหรับ K8s 1.24 ขึ้นไป) รุ่นเก่าให้ทำจาก [Service Account](https://argoproj.github.io/argo-workflows/access-token/#token-creation) สำหรับการใช้แบบไม่ต้อง Authentication ดูใน [Quick Start](https://argoproj.github.io/argo-workflows/quick-start/#quick-start)

``` bash
kubectl create token argo -n argo
```

ถ้าต้องแก้ไขคอนฟิกเซิร์ฟเวอร์ที่ deploy ไปแล้วทำตามคำนั่งนี้และรอดูกว่า Pod จะพร้อมใช้หรือยัง
``` bash
kubectl -n argo edit deployments.apps argo-server
kubectl -n argo get pod -w
```
Linux แบบ Text Mode ใช้ nano แทน vi ได้ หรือ macOS ใช้ Visual Studio Code เปิดคอนฟิกได้
```bash
export KUBE_EDITOR="/usr/bin/nano"
export KUBE_EDITOR='open -a "Visual Studio Code" --wait'
```
วินโดว์ใช้ Visual Studio Code ทำแบบนี้
```
KUBE_EDITOR=code -w
```

## ติดตั้ง Argo Workflow ใช้งานผ่าน Ingress
ในเอกสารไม่มีตัวอย่างที่ชัดเจนให้ แล้วคอนฟิกบางตัวก็เก่าเกินไม่รองรับแล้ว ใช้การดูตัวอย่างของ ArgoCD มาปรับใช้ ต้องปิดการใช้งาน https(self-sign certificate) เพื่อใช้ https ของ ingress(ในวีดีโอยังเป็น self-sign certificate ของ traefik) การใช้งานแบบนี้สะดวกกว่า port-forward แต่ไม่ควรปิดการใช้ token ถ้ามีการเข้าถึงจากอินเตอร์เน็ตได้ ตัวอย่างนี้จะดาว์นโหลดคอนฟิกมาแก้ไขตรงๆ
``` bash
kubectl create namespace argo
wget https://github.com/argoproj/argo-workflows/releases/download/v3.4.5/install.yaml
nano install.yaml
## แก้ไขไฟล์ก่อน apply
kubectl apply -n argo -f install.yaml
```

เพิ่ม "- --secure=false" เปลี่ยน "scheme: HTTPS" เป็น "scheme: HTTP"
``` yaml
...
    spec:
      containers:
      - args:
        - server
        - --secure=false
        env: []
        image: quay.io/argoproj/argocli:v3.4.5
        name: argo-server
        ports:
        - containerPort: 2746
          name: web
        readinessProbe:
          httpGet:
            path: /
            port: 2746
            scheme: HTTP
...
```

เพิ่ม Ingress ดังนี้แก้โดเมนตามที่ใช้ อันนี้ดัดแปลงมาจากของ ArgoCD
``` yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: argo-server
  namespace: argo
spec:
  entryPoints:
    - websecure
  routes:
    - kind: Rule
      match: Host(`argo-workflow.home.lan`)
      priority: 10
      services:
        - name: argo-server
          port: 2746
  tls:
    certResolver: default
```
## Argo CLI
คำสั่ง argo พื้นฐานเทียบกับ kubectl
``` bash
argo submit hello-world.yaml    # ส่ง workflow ขึ้น Kubernetes
argo list                       # แสดงรายการ workflows
argo get hello-world-xxx        # ดูข้อมูลของ workflow
argo logs hello-world-xxx       # แสดงล็อกของ workflow
argo delete hello-world-xxx     # ลบ workflow

# ใช้คำสั่ง kubectl แทนก็ได้แต่ไม่มีการตรวจสอบดีเท่าคำสั่ง argo
kubectl create -f hello-world.yaml
kubectl get wf
kubectl get wf hello-world-xxx
kubectl get po --selector=workflows.argoproj.io/workflow=hello-world-xxx --show-all  # similar to argo
kubectl logs hello-world-xxx-yyy -c main
kubectl delete wf hello-world-xxx
```
ตัวอย่าง Workflow ที่สามารถรับพารามิเตอร์ได้ สร้างไฟล์
arguments-parameters.yaml
``` yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: hello-world-parameters-
spec:
  # invoke the whalesay template with
  # "hello world" as the argument
  # to the message parameter
  entrypoint: whalesay
  arguments:
    parameters:
    - name: message
      value: hello world

  templates:
  - name: whalesay
    inputs:
      parameters:
      - name: message       # parameter declaration
    container:
      # run cowsay with that message input parameter as args
      image: docker/whalesay
      command: [cowsay]
      args: ["{{inputs.parameters.message}}"]
```
เรียกใช้แบบนี้ 
``` bash
argo submit arguments-parameters.yaml -p message="goodbye world" --watch
# ดูรายการ Workflow
argo list -n argo
# ดู Workflow ล่าสุด
argo get -n argo @latest
# ดู log ล่าสุด
argo logs -n argo @latest
```

## misc
- [Migrating from Jenkins to Argo at Sendible](https://blog.argoproj.io/migrating-from-jenkins-to-argo-at-sendible-2ad4268837e9)
- [Practical Argo Workflows Hardening](https://blog.argoproj.io/practical-argo-workflows-hardening-dd8429acc1ce)