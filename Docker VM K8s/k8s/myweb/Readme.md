# Deploy Web Server
ตัวอย่างสำหรับการเรียน Kubenetes อย่างรวดเร็ว ใช้งานได้จริง เนื่องจากใช้ hostPath เหมาะกับแบบ Single Node เช่น Test และ Development
- deploy nginx ขึ้น Kubenetes ผ่านคำสั่ง kubectl
- ได้ใช้พื้นฐาน deployment, service และ ingress
- ได้ใช้งาน hostPath เพื่อ mount volume บน node
- ได้ใช้งาน ConfigMap 
- ได้ใช้งาน Secret 
- ใช้ Namespace ชื่อ my-web เพื่อให้จัดการได้ง่าย  

[![IMAGE ALT TEXT](https://img.youtube.com/vi/LJN_DGwxcnk/0.jpg)](https://www.youtube.com/watch?v=LJN_DGwxcnk&list=PLWMbTFbTi55OtdeRGeerLFQSTw61cEGni&index=9 "หัด deploy ขึ้น Kubernetes กันแบบชิวๆ")


## คำสั่งที่ใช้
``` bash
kubectl create ns my-web --dry-run=client -o yaml
kubectl create deployment myweb --image=nginx -n my-web --dry-run=client -o yaml
kubectl create service clusterip myweb --tcp=80:80 -n my-web --dry-run=client -o yaml 
kubectl create ingress myweb --rule="bar.com/=nginx-svc:80" -n my-web --dry-run=client -o yaml 
kubectl create configmap myweb-configmap --from-file=./config/config.html --from-file=config1.html=./config/config.txt -n my-web --dry-run=client -o yaml
kubectl create secret generic myweb-secret --from-literal=username=oom --from-literal=password=123456 -n my-web --dry-run=client -o yaml
echo -n "123456" | base64
echo "MTIzNDU2" | base64 -d
kubectl get pod -n myweb
kubectl exec -it <pod name> -n my-web -- /bin/bash
ls /usr/share/nginx/secret
# ลบทิ้งทั้งหมด
kubectl delete ns my-web
```

## อ่านเพิ่มเติม
- [ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)

- [Secret](https://kubernetes.io/docs/concepts/configuration/secret/)


