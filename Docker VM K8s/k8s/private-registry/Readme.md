# Docker Registry
ใช้เก็บ docker image ส่วนตัว สามารถ Pull/Push รัวๆไม่ติด Rate limit เร็วกว่าใช้เซิร์ฟเวอร์จากข้างนอกมากๆ เหมาะกับใช้กันภายใน ผมทำตัวอย่างมีทั้ง docker compose และ K8s จะได้เห็นเทียบกัน ตัวอย่าง Docker จะใช้เป็น localhost:5000 
ส่วน K8s ผมจะใช้โดเมน registry.home.lan เนื่องจากไม่ได้ผ่าน DNS จะเพิ่มในไฟล์ hosts เป็นแบบโหนดเดียว(ไม่ได้ทำ cluster) เก็บอิมเมจใน hostPath และ ไม่มี security ใดๆ เหมาะสำหรับ developer หรือ tester ใช้ภายในเท่านั้น วีดีโอใช้ฟีเจอร์พื้นฐาน เพื่อง่ายต่อการเรียนรู้ ถ้าทำได้แล้วแนะนำให้ดูลิงค์เพิ่มเติมตอนท้ายหน้านี้ครับ

[![IMAGE ALT TEXT](https://img.youtube.com/vi/NJ5zcvvdL9o/0.jpg)](https://youtu.be/NJ5zcvvdL9o "Deploy Docker Registry บน K8s")

```bash
kubectl create ns my-registry
echo "---"  > my-registry.yaml
kubectl create deploy my-registry --image=registry:2 --port=5000 --dry-run=client -o yaml -n my-registry >>my-registry.yaml
echo "---"  >> my-registry.yaml
kubectl create service clusterip my-registry --tcp=5000 --dry-run=client -o yaml -n my-registry  >> my-registry.yaml
echo "---"  >> my-registry.yaml
kubectl create ingress my-registry --rule="registry.home.lan/*=my-registry:5000" --dry-run=client -o yaml -n my-registry >> my-registry.yaml
kubectl apply -f my-registry.yaml
```
## สำหรับ k3s
ให้ทำเพิ่มอีกหน่อยเพิ่มไฟล์ /etc/rancher/k3s/registries.yaml ในทุก node
``` yaml
mirrors:
  "registry.home.lan":
    endpoint:
      - "http://registry.home.lan"
```
หลังแก้ไขให้รันคำสั่ง
```bash
systemctl restart k3s
```
## ตั้งค่าในเครื่องที่ใช้งาน
สำหรับเครื่องทดสอบ เนื่องจากไม่มี https ให้ใช้แบบ insecure ให้เซ็ตค่าตามนี้
/etc/docker/daemon.json, C:\ProgramData\docker\config\daemon.json
```json
{
  "insecure-registries" : ["http://registry.home.lan"]
}
```
ทำการ restart เพื่อให้โหลดคอนฟิกใหม่
```bash
sudo service docker restart
```

## ทดสอบ
ไปที่ลิงค์เวปนี้จะได้ {} กลับมา

http://registry.home.lan/v2/

ทดสอบเอาอิมเมจใส่ใน registry
```bash
docker pull nginx
docker tag nginx registry.home.lan/nginx
docker push registry.home.lan/nginx
docker rmi registry.home.lan/nginx
docker pull registry.home.lan/nginx
```

ถ้าต้องการถอนการติดตั้งก็แค่ลบ namespace ออก
```bash
kubectl delete ns my-registry
```
## อ่านเพิ่ม
แนะนำให้ไปทำ https, ระบบล็อกอิน, GUI Frontend เพิ่มเติมครับ
- [ผมใช้เวปนี้เป็นต้นแบบการทำ](https://itnext.io/how-to-setup-a-private-registry-on-k3s-d9283906d16)
- [ใช้ registry แบบ http](https://docs.docker.com/registry/insecure/)
- [Private container registry](https://k3s.rocks/private-registry/)
- [Private Docker Registry Part 1: basic local example](https://medium.com/p/c409582e0e3f)
- [Private Docker Registry Part 2: let’s add basic authentication](https://medium.com/@cnadeau_/private-docker-registry-part-2-lets-add-basic-authentication-6a22e5cd459b)
- [Creating A Private Container Registry: Repository And Web Service](https://clarusway.com/creating-a-private-container-registry-repository-and-web-service/)
