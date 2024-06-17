# k3sup and kube-vip
- k3sup ติดตั้ง k3s ได้ง่ายและรวดเร็วผ่าน ssh 
- kube-vip เป้น loadbalancer จะมี virtual IP เป็นทางผ่าน 

## install k3sup

## setup 1st server node
```sh
cd 
k3sup install \
  --ip 192.168.2.102 \
  --user oom \
  --sudo \
  --tls-san 192.168.2.109 \
  --cluster \
  --local-path ~/.kube/k8s-cluster.dev.dman.cloud.yaml \
  --context k8s-cluster-ha \
  --k3s-extra-args "--disable traefik --disable servicelb --node-ip=192.168.2.102"
```

## setup and install kube-vip
```sh 
sudo -i
ctr image pull docker.io/plndr/kube-vip:latest
alias kube-vip="ctr run --rm --net-host docker.io/plndr/kube-vip:latest vip /kube-vip"
kube-vip manifest daemonset \
--arp \
--interface eth0 \
--address 192.168.2.109 \
--controlplane \
--leaderElection \
--taint \
--inCluster | tee /var/lib/rancher/k3s/server/manifests/kube-vip.yaml
```



## join Server Node 2
```sh
k3sup join --ip 192.168.2.103 --user oom --sudo --k3s-channel stable --server --server-ip 192.168.2.109 --server-user oom --sudo --k3s-extra-args "--disable traefik  --disable servicelb --node-ip=192.168.2.103"
```

## join Server Node 3
```sh
k3sup join --ip 192.168.2.104 --user oom --sudo --k3s-channel stable --server --server-ip 192.168.2.109 --server-user oom --sudo --k3s-extra-args "--disable traefik  --disable servicelb --node-ip=192.168.2.104"
```


## join worker node1
TODO

## Check leader
ดูว่าโหนดไหนเป็น leader ของ HA
```sh
kubectl get pod -A
kubectl logs kube-vip-ds-6qdsf -n kube-system | grep -i leader
```
ในตัวอย่างนี้จะเห็น k3s-s1 เป็น leader
ให้ ping 192.168.2.109 ค้างไว้แล้วลอง shutdown k3s-s1



## อ่านเพิ่ม

[Lightweight HA Kubernetes with k3s & kube-vip](https://docs.dman.cloud/tutorial-documentation/k3sup-ha/#install-k3sup
)