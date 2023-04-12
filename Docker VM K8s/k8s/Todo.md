
# หัวข้อที่จะทำวีดีโอ
- Argo Event
- CI/CD ใช้ Argo Event, Workflow, CD
- Argo Rollout
- Github Action ย้ายไปใน DevOps
## SSO ของ Argo Workflow
ยังไม่เวิรกเลย
``` yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: workflow-controller-configmap
  namespace: argo
data:
  sso: |
    issuer: https://keycloak.example.com/realms/k8s
    clientId:
      name: argo-workflows-sso
      key: client-id
    clientSecret:
      name: argo-workflows-sso
      key: client-secret
    redirectUrl: https://argo-workflows.frappet.synology.me/oauth2/callback
---
```

``` bash
kubectl create secret -n argo generic client-id-secret   --from-literal=client-id=argo-workflows-sso --from-literal=client-secret=OleT70CaY9xoTRSwOGw79xIMsPyIQdzS --dry-run=client -o yaml >secret.yaml
kubectl apply -f secret.yaml
```
secret.yaml
``` yaml
apiVersion: v1
data:
  client-id: YXJnby13b3JrZmxvd3Mtc3Nv
  client-secret: T2xlVDcwQ2FZOXhvVFJTd09Hdzc5eElNc1B5SVFkelM=
kind: Secret
metadata:
  creationTimestamp: null
  name: client-id-secret
```
