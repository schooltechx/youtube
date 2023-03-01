# Argo Workflows 
ใช้จัดการงานที่มีขั้นต้อนบน Kubernetes เหมือนการเขียน Script แต่มีระบบการจัดการที่ดีกว่ามาก ถ้าเทียบกับ Github Action ผมว่าใช้ยากกว่าพอสมควรเลย แต่ถ้าเราหาไฟล์ Workflow ตัวอย่างที่ต้องการได้ก็ไม่ใช่ปัญหา หาได้ไม่ยากด้วย นอกจากนี้มันใช้ได้กับงานหลากหลายสายงาน แนะนำให้ลองใช้ครับ ไม่จำเป็นต้องเป็นนักเขียนโปรแกรมก็นำไปใช้ได้ 

[![Argo Workflows Basic](https://img.youtube.com/vi/Y32is2j_Ju0/0.jpg)](https://www.youtube.com/watch?v=Y32is2j_Ju0&list=PLWMbTFbTi55P6Vzv9a-un9oFZY-PwMj98&index=31 "งานเล็กหรือใหญ่จบได้ด้วย Argo Workflows")

การทำงานของ Workflow เป็น Infrastructure as Code ไม่ต้องเซ็ตเครื่องทุกครั้งที่ใช้งานสร้างระบบขึ้นมาใหม่ได้อย่างรวดเร็วเพื่อทดสอบ และใช้งาน ดังนั้นจะสร้าง container ขึ้นมาใหม่ในแต่ละ step ของการทำงาน ถึงจะเริ่มทำงานได้ช้ากว่า แต่ในระยะยาวแล้ว ดีกว่าการเซ็ตระบบด้วยมือสำหรับการทดสอบหรือ deploy เพราะมีความแม่นยำสูงกว่า


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

ถ้าต้องแก้ไขคอนฟิกเซิร์ฟเวอร์ที่ deploy ไปแล้วทำตามคำสั่งนี้และรอดูกว่า Pod จะพร้อมใช้หรือยัง ถ้าใครไม่ถนัดใช้ vi ในการแก้ให้ใช้ editor ตัวอื่นในการแก้ไขได้ให้ไป[วิธีตั้งค่าของ ArgoCD](../argocd/)
``` bash
kubectl -n argo edit deployments.apps argo-server
kubectl -n argo get pod -w
```

## ติดตั้ง Argo Workflow ใช้งานผ่าน Ingress
ในเอกสารไม่มีตัวอย่างที่ชัดเจนให้ แล้วคอนฟิกบางตัวก็ไม่รองรับแล้วกับ Kubernetes 1.24 ที่ผมใช้อยู่ ผมเอาตัวอย่างของ ArgoCD มาปรับใช้ ต้องปิดการใช้งาน https(self-sign certificate) เพื่อใช้ https ของ ingress(ในวีดีโอยังเป็น self-sign certificate ของ traefik) การใช้งานแบบนี้สะดวกกว่า port-forward แต่ไม่ควรปิดการใช้ token ถ้ามีการเข้าถึงจากอินเตอร์เน็ตได้ เราจะดาว์นโหลดคอนฟิกมาแก้ไขตรงๆแบบนี้ก็ได้หรือจะ edit deployments.apps ที่ทำก่อนหน้า
``` bash
kubectl create namespace argo
wget https://github.com/argoproj/argo-workflows/releases/download/v3.4.5/install.yaml
nano install.yaml
## แก้ไขไฟล์ก่อน apply
kubectl apply -n argo -f install.yaml
```
คอนฟิกตัดตอนส่วนของ argo-server มา ให้เพิ่ม "- --secure=false" เปลี่ยน "scheme: HTTPS" เป็น "scheme: HTTP"
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

## Workflows Template
Workflows สามารถรับ parameter และ เรียกใช้ซ้ำและซ้อนกันได้ ถ้าทำเป็น Workflow Template จะเก็บไว้ในระบบเพื่อเรียกใช้เมื่อต้องการ ในวีดีโอนอกจากแสดงวิธีการสร้าง Workflows Template แล้วเป็นตัวอย่างการทำ CI ใช้การ clone โค้ดจาก Github มาเพื่อ build docker image จะใช้โค้ดจากตัวอย่าง Microservice ของวีดีโอก่อนหน้า การทำ Workflow นี้ก็ดูจากโค้ดตัวอย่างพื้นฐานมาปรับให้เหมาะสมกับสภาพแวดล้อมจริง โค้ด Workflows [wf-build-microservice.yaml](./sample/wf-build-microservice.yaml) 

[![Argo Workflows Template](https://img.youtube.com/vi/332c8B8_v5Q/0.jpg)](https://www.youtube.com/watch?v=332c8B8_v5Q&list=PLWMbTFbTi55OtdeRGeerLFQSTw61cEGni&index=11 "Argo Workflows - workflows template build docker image")

ตัวอย่างในวีดีโอจะใช้ความรู้หลายอย่างสามารถทบทวนได้จากวีดีโอเหล่านี้ครับ
- [หัด deploy ขึ้น Kubernetes กันแบบชิวๆ](https://youtu.be/LJN_DGwxcnk)
- [พัฒนา Microservice แบบเป็นทีม](https://youtu.be/-zfABqdhmPg)
- [Deploy Docker Registry บน K8s](https://youtu.be/NJ5zcvvdL9o)
- [Argo Workflows เบื้องต้นทำงานน้อยใหญ่](https://youtu.be/Y32is2j_Ju0)

### Github
ใช้การ clone/checkout ใน container (alpine/git:v2.26.2) ถ้าเป็น Private Repo จะต้องใช้ [Personal Access Token](https://stackoverflow.com/questions/2505096/clone-a-private-repository-github) ลิงค์สำหรับ clone แบบ token จะเป็นประมาณนี้
``` bash
git clone https://<pat>@github.com/<your account or organization>/<repo>.git
```
### Docker Registry
แบบทั่วไปที่มี https(เช่น let's encrypt) ก็จะไม่มีปัญหาครับ ในตัวอย่างนี้ผมใช้ http://registry.home.lan เพื่อให้นักพัฒนาทำเองที่บ้านได้ง่ายไม่ต้องพึ่ง Infra ที่ซับซ้อน ซึ่งจะสร้างปัญหากับ buildkit เหมือนตอน docker registry ที่ต้องเซ็ตให้ใช้แบบ "insecure-registries" หรือถ้าพยายามทำ https ด้วย self-sign certificate ตอน push image จะขึ้น "x509: certificate signed by unknown authority" ต้อง trust rootCA ด้วย มันต้องแก้หลายที่ทำให้ดูซับซ้อนเกิน เลยใช้แบบ HTTP ไป วิธีทำให้ให้ใช้ได้ดูใน buildkit
### buildkit 
จะใช้ [buildkit](https://github.com/moby/buildkit) ในการสร้าง image และ push image ขึ้น registry แบบ http
ในตัวอย่างวีดีโอก่อนหน้าจะแก้ไฟล์ hosts และแก้คอนฟิกของ docker ใน k8s มีวิธีที่เรียบง่ายกว่าใช้ [hostAliases](https://pet2cattle.com/2021/05/k8s-pod-hostaliases) ใส่ใต้ spec
``` yaml
...
spec:
  hostAliases:
  - ip: "192.168.2.61"
    hostnames:
    - "registry.home.lan"
...
```
ส่วนของ template เพิ่ม ",registry.insecure=true" และ securityContext "privileged: true" 
เนื่องจากเครื่องผมมันทำงานช้า buildkit มันยังไม่พร้อม ต้องเพิ่มตัวแปรแวดล้อม BUILDCTL_CONNECT_RETRIES_MAX เป็น 30 (ถ้าไม่ใส่จะเป็น 10) 
``` yaml
...
        workingDir: /work/{{inputs.parameters.path}}
        env:
          - name: BUILDKITD_FLAGS
            value: --oci-worker-no-process-sandbox
          - name: BUILDCTL_CONNECT_RETRIES_MAX
            value: "30"
        command:
          - buildctl-daemonless.sh
        args:
          - build
          - --frontend
          - dockerfile.v0
          - --local
          - context=.
          - --local
          - dockerfile=.
          - --output
          - type=image,name=registry.home.lan/{{inputs.parameters.image}},push=true,registry.insecure=true
        securityContext:
          privileged: true
...
```
"privileged: true" ก็มีอีกปัญหาซับซ้อนที่ผมกว่าจะหาทางแก้ได้คือ Host VM แต่ละเครื่องจะมีปัญหาที่แก้ไม่เหมือนกัน บางเครื่องก็ไม่มี [ลองดูปัญหานี้ใน stackoverflow พอมีทางแก้อยู่](https://github.com/moby/buildkit#registry-push-image-and-cache-separately) 
โฮสต์(โหนด)ของผมเป็น  Proxmox 7.x แล้วใช้ VM เป็น Ubuntu 22.04
เพิ่ม "kernel.unprivileged_userns_clone=1" ไปที่บรรทัดล่างสุดของ /etc/sysctl.conf  แล้วเรียกคำสั่ง "sudo sysctl --system" ถึงจะใช้งานได้

## SSO
กำลังลองทำอยู่ยังทำไม่เวิร์กเท่าไหร่ได้แล้วจะมาอัปเดตครับ

## อ่านเพิ่ม
- [Workflow Tutorial](https://argoproj.github.io/argo-workflows/walk-through/hello-world/) ไล่ๆทำตัวอย่างในรายการนี้ 
- [วิธีการติดตั้ง](https://argoproj.github.io/argo-workflows/quick-start/)
- [ตัวอย่าง Ingress ของ Argo CD](https://argoproj.github.io/argo-workflows/argo-server/#ingress)
- [Migrating from Jenkins to Argo at Sendible](https://blog.argoproj.io/migrating-from-jenkins-to-argo-at-sendible-2ad4268837e9)
- [Practical Argo Workflows Hardening](https://blog.argoproj.io/practical-argo-workflows-hardening-dd8429acc1ce)
- [What is Buildkit?](https://earthly.dev/blog/what-is-buildkit-and-what-can-i-do-with-it/) 
- [How To Run Docker in Docker Container [3 Easy Methods]](https://devopscube.com/run-docker-in-docker/)