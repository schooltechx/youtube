# Install


## Docker Install

``` bash
oom@debian12:~/docker$ git clone https://github.com/apache/apisix-docker.git
oom@debian12:~/docker$ cd apisix-docker/example
oom@debian12:~/docker/apisix-docker/example$ docker compose up -d 
[+] Building 0.0s (0/0)     
[+] Running 8/8
 ✔ Network example_apisix                Created            0.3s 
 ✔ Container example-web2-1              Started            4.8s 
 ✔ Container example-etcd-1              Started            6.4s 
 ✔ Container example-apisix-dashboard-1  Started            5.6s 
 ✔ Container example-grafana-1           Started            7.5s 
 ✔ Container example-prometheus-1        Started            8.0s 
 ✔ Container example-web1-1              Started            9.3s 
 ✔ Container example-apisix-1            Started            7.9s
```

- apisix-dashboard เป็นหน้าเวปเข้าไปตั้งค่า ไปที่ http://127.0.0.1:9000/

ยูสเซอร์: admin

รหัสผ่าน: admin

- web1 หน้าเวปทดสอบ ไปที่ http://127.0.0.1:9081/ จะแสดงคำว่า “hello web1” 
- web2 หน้าเวปทดสอบ  ไปที่ http://127.0.0.1:9082/ จะแสดงคำว่า "hello web2"
- etcd เป็นฐานข้อมูลของคอนฟิกต่างๆ แบบ cloud native ใช้พอร์ต 2379 
- apisix เป็นส่วนของตัวหลักที่ทำงาน 
  - 9180 เป็นพอร์ตสำหรับ Management API ทดสอบการใช้งาน
  ``` bash
  oom@debian12:~/docker/apisix-docker/example$ curl "http://127.0.0.1:9180/apisix/admin/services" -H "X-API-KEY: edd1...5c8f1"
  {"total":0,"list":[]}
  ```
  - 9080/9443 เป็นช่องของ API Gateway แบบ http/https
  - 9091 ให้ Prometheus ดึงค่า metric 
  ``` bash
  curl http://127.0.0.1:9091/apisix/prometheus/metrics
  ```
  - 9092 (น่าจะไม่ได้ใช้ เห็นในตัวอย่างใช้เป็นตัวอย่างแก้คอนฟิกเปลี่ยนพอร์ต)

- grafana แสดง Dashboard ที่พอร์ต 3000 ไปตั้งค่าที่ Dashboard ของ APISIX UI 
- [prometheus](https://apisix.apache.org/docs/apisix/2.14/plugins/prometheus/) เก็บ metric จะ exposed metric ที่พอร์ต พอร์ต 9090
```
curl http://127.0.0.1:9090/metrics
```

## Configuration
ที่เก็บค่อนข้างตรงไปตรงมาในโฟลเดอร์ *_conf ปกติใช้ตาม default ที่ควรเข้าไปแก้คือ
dashboard_conf/config.yaml ควร แก้ยูสเซอร์และรหัสสำหรับการ login

``` yaml
...
authentication:
  secret:
    secret              # secret for jwt token generation.
                        # NOTE: Highly recommended to modify this value to protect `manager api`.
                        # if it's default value, when `manager api` start, it will generate a random string to replace it.
  expire_time: 3600     # jwt token expire time, in second
  users:                # yamllint enable rule:comments-indentation
    - username: admin   # username and password for login `manager api`
      password: admin_password
    - username: user
      password: user_password

plugins:                          # plugin list (sorted in alphabetical order)
  - api-breaker
  - authz-keycloak
  - basic-auth
...
```
apisix_conf/config.yaml คอนฟิก admin API เพื่อความปลอดภัย แก้ IP ของ allow_admin, ip/port ที่ใช้, admin key

``` yaml
... 
deployment:
  admin:
    allow_admin:   # https://nginx.org/en/docs/http/ngx_http_access_module.html#allow
      - 0.0.0.0/0  # 127.0.0.0/24
    admin_listen:
      ip: 0.0.0.0  # default เป็น `0.0.0.0` แก้เป็นอันอื่น
      port: 9180   # อาจะเปลี่ยนเป็นเลขอื่น
    admin_key:
      - name: "admin"
        key: edd1...5c8f1 # แก้ API Key 
        role: admin                 # admin: manage all configuration data
...
```