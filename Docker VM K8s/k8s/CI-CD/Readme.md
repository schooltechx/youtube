# CI/CD
น่าจะทำประมาณนี้
Pull Request -> Git -> Build Docker -> Auto Test-> Git tag -> Deploy Test
แรกสุดจะใช้ตัวอย่าง [Docker-in-Docker Using Sidecars](https://argoproj.github.io/argo-workflows/walk-through/docker-in-docker-using-sidecars/) 
เป็นฐาน  (แนะนำให้ใช้อิมเมจ docker:23.0.1-git และ docker:23.0.1-dind)
เนื่องจากติดปัญหาบางอย่างเลยใช้ตัวอย่าง [buildkit](https://github.com/argoproj/argo-workflows/blob/master/examples/buildkit-template.yaml
) แทน


## Artifact Repository
[Artifacts](https://argoproj.github.io/argo-workflows/walk-through/artifacts/#artifacts) 
เป็นที่เก็บเพื่อส่งข้อมูลระหว่าง Workflow เหมือนการ Mount Volume เข้ากับ Pod ส่วนใหญ่ใช้ S3 ในการเก็บ ที่น่าสนใจอันหนึ่งคือสามารถ mount git เข้ามาใช้ได้ จะเป็นแบบ Read Only
- [git repo as a hard-wired input artifact](https://github.com/argoproj/argo-workflows/blob/master/examples/input-artifact-git.yaml)
- [Configuring Your Artifact Repository](https://argoproj.github.io/argo-workflows/configure-artifact-repository/)


เนื่องจากต้องแชร์ระหว่าง step ของ workflow ต้องสร้าง Volume สำหรับการแชร์โค้ด หรือ output 
อาจจะต้องตรวจสอบว่า storage นิดหนึ่งว่าตั้งค่า default หรือเปล่าควรมี แค่อันเดียวด้วย ในตัวอย่างผมเอา longhorn ออกจาก default
``` bash
kubectl get storageclass
kubectl patch storageclass longhorn -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'

```




github.com/golang/example/stringutil
github.com/golang/example/hello

git command
https://www.atlassian.com/git/tutorials/setting-up-a-repository
สอนใช้ Git มีหัวข้อ Pull request
https://www.youtube.com/watch?v=5TlGWHU_SQc

## check
- [Github Actions Review And Tutorial](https://www.youtube.com/watch?v=eZcAvTb0rbA)
- [Environments Based On Pull Requests (PRs): Using Argo CD To Apply GitOps Principles On Previews](https://youtu.be/cpAaI8p4R60)
- [10 Must-Have Kubernetes Tools](10 Must-Have Kubernetes Tools)



https://www.crossplane.io/


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
buildctl build \
--frontend=dockerfile.v0 \
--local context=. \
--local dockerfile=. \
--output type=image,name=192.168.0.110:8082/docker-local/test,push=true,registry.insecure=true \
--export-cache type=registry,ref=192.168.0.110:8082/docker-local/test,mode=max,push=true,registry.insecure=true \
--import-cache type=registry,ref=192.168.0.110:8082/docker-local/test,registry.insecure=true 


https://stackoverflow.com/questions/75192693/how-to-use-buildctl-with-localhost-registry-with-tls


https://github.com/moby/buildkit/issues/2441

# mkcert

https://stackoverflow.com/questions/13732826/convert-pem-to-crt-and-key
openssl pkey -in cert.pem -out cert.key
openssl crl2pkcs7 -nocrl -certfile cert.pem | openssl pkcs7 -print_certs -out cert.crt


https://devopscube.com/configure-ingress-tls-kubernetes/
kubectl create secret tls registry-tls \
    --namespace my-registry \
    --key home.lan.key \
    --cert home.lan.crt --dry-run=client -o yaml > registry-tls.yaml

## อ่านเพิ่ม
