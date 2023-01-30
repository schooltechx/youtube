# Docker Registry
ใช้เก็บ docker image ทำใช้งานส่วนตัวเพื่อจะได้ไม่ติด Rate limit ทำได้บ่อยและเร็วกว่าใช้เซิร์ฟเวอร์นอก เหมาะกับใช้กันภายใน ตัวอย่างมีทั้ง docker compose และ K8s จะใช้โดเมน registry.home.lan ไม่ได้ผ่าน DNS จะเพิ่มในไฟล์ hosts ตัวอย่างนี้ เก็บอิมเมจใน hostPath และ ไม่มี security ใดๆ เหมาะสำหรับ developer หรือ tester ใช้ภายในเท่านั้น

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
ให้
เพิ่มไฟล์ /etc/rancher/k3s/registries.yaml ในทุก node
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
สำหรับเครื่องทดสอบ เนื่องจากไม่มี https ให้ใช้แบบ insecure ให้เซ็ตตามนี้
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
- ทำตามเวปนี้
https://itnext.io/how-to-setup-a-private-registry-on-k3s-d9283906d16
- ใช้ registry แบบ http
https://docs.docker.com/registry/insecure/

- Private container registry
https://k3s.rocks/private-registry/