# Ingress


Ingress

Ingress Controller
เป็น Pod ตัวเดียวหรือหลายตัว 
- ทำหน่าที่ประมวล Ingress Rules 
- จัดการกาพ Redirections 
- entrypoint ของ Cluster
- 3rd implementation  


ถ้าใช้ cloud provider จะมี Cloud Load Balancer รับหน้าก่อนจะส่งให้ Ingress Controller ถ้าทำเครื่องเองก็ต้องทำ entrypoint ด้วยตัวเอง

ตัวอย่างการสร้าง config สำหรับ web 
```bash
kubectl create deployment webserver --image=nginx --dry-run=client -o yaml > nginx.yaml
kubectl create service clusterip nginx-svc --tcp=80:80 --dry-run=client -o yaml > nginx-svc.yaml
kubectl create ingress nginx-ingress --rule="bar.com/=nginx-svc:80" --dry-run=client -o yaml > nginx-ingress.yaml

```


```bash
kubectl create deployment nginx --image=nginx --dry-run=client -o yaml > nginx.yaml
nano nginx.yaml
kubectl apply -f nginx.yaml
kubectl get pods
kubectl create service clusterip nginx --tcp=80:80
kubectl apply -f ingress-nginx.yaml
kubectl describe ingress nginx
```



nginx.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: nginx
  name: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx
        name: nginx
        resources: {}
status: {}
```


ingress-nginx.yaml
```yaml
# apiVersion: networking.k8s.io/v1beta1 # for k3s < v1.19
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx
  annotations:
    ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx
            port:
              number: 80
```


## อ่านเพิ่ม

https://www.youtube.com/watch?v=80Ew_fsV4rM