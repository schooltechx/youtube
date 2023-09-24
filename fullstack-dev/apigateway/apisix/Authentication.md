# Authentication

การ authentication ไม่ว่าแบบใดบน production ควรใช้ https เสมอ

TODO:ทำวีดีโอและเพิ่มเนื้อหาหัวข้อนี้

## [key-auth ](https://apisix.apache.org/docs/apisix/plugins/key-auth/)
บางทีเรียก API key เป็นแบบง่ายสุดลักษณะเหมือนรหัสผ่านเพื่อใช้ API เหมาะกับการสร้าง API ให้คนอื่นใช้งาน ต้องสร้าง consumer ก่อน 

สร้าง [Consumer](https://apisix.apache.org/docs/apisix/terminology/consumer/) key_auth_web1 และ key_auth_web2 เพื่อใช้ Plugin
``` bash
# Request
curl "http://127.0.0.1:9180/apisix/admin/consumers" \
-H "X-API-KEY: edd1c9.....5c8f1" -X PUT -d '
{
  "username": "key_auth_web1",
  "plugins": {
    "key-auth": {
      "key": "Password-web1"
    }
  }
}'
# Response
{"key":"/apisix/consumers/key_auth_web1","value":{"username":"key_auth_web1","create_time":1688966699,"plugins":{"key-auth":{"key":"Password-web1"}},"update_time":1688967814}}

# Request
curl "http://127.0.0.1:9180/apisix/admin/consumers" \
-H "X-API-KEY: edd1c9.....5c8f1" -X PUT -d '
{
  "username": "key_auth_web2",
  "plugins": {
    "key-auth": {
      "key": "Password-web2"
    }
  }
}'
# Response
{"key":"/apisix/consumers/key_auth_user","value":{"username":"key_auth_user","create_time":1688962876,"plugins":{"key-auth":{"key":"Password"}},"update_time":1688962876}}
```
สร้าง Route โดยใช้ Key Auth

``` bash
# Create route with key-auth plugin
curl http://127.0.0.1:9180/apisix/admin/routes \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "id": "web1-key-auth",
    "uri": "/web1-key-auth",
    "host": "example.com",
    "methods": ["GET"],
    "plugins": {
        "key-auth": {}
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "web1:80": 1
        }
    }
}'
# Response
{"key":"/apisix/routes/1","value":{"methods":["GET"],"uri":"/web1-key-auth","upstream":{"type":"roundrobin","nodes":{"web1:80":1},"hash_on":"vars","scheme":"http","pass_host":"pass"},"id":1,"status":1,"priority":0,"create_time":1688961105,"plugins":{"key-auth":{"hide_credentials":false,"header":"apikey","query":"apikey"}},"update_time":1688963794}}

# Test
curl -i http://127.0.0.2:9080/web1-key-auth \
-H 'apikey: Password-web1' -H 'Host: example.com'
# Response
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 10
Connection: keep-alive
Date: Mon, 10 Jul 2023 04:38:08 GMT
Server: APISIX/3.3.0

hello web1
```

สร้าง route web2 ไอดีเป็น web2-key-auth สำหรับ web2 ใช้ header เป็น secretkey(เดิม default เป็น apikey) จำกัดผู้ใช้งานด้วย  consumer-restriction เพื่อให้คอนซูมเมอร์ key_auth_web2 ได้ได้คนเดียว

```bash
curl http://127.0.0.1:9180/apisix/admin/routes \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "id": "web2-key-auth",
    "uri": "/web2-key-auth",
    "methods": ["GET"],
    "plugins": {
        "key-auth": {
          "header": "secretkey"
        },
        "consumer-restriction": {
            "whitelist": [
                "key_auth_web2"
            ]
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "web2:80": 1
        }
    }
}'
# Response
{"key":"/apisix/routes/web1-key-auth","value":{"methods":["GET"],"uri":"/web2-key-auth","upstream":{"type":"roundrobin","nodes":{"web2:80":1},"hash_on":"vars","scheme":"http","pass_host":"pass"},"id":"web1-key-auth","status":1,"priority":0,"create_time":1688966246,"plugins":{"key-auth":{"key":"Password-web2","hide_credentials":false,"header":"secretkey","query":"apikey"}},"update_time":1688966246}}
# Request ทั้ง 3 แบบจะ return 200
curl -i http://127.0.0.2:9080/web2-key-auth \
-H 'secretkey: Password-web2' -H 'Host: example.com'
curl -i http://127.0.0.2:9080/web1-key-auth \
-H 'apikey: Password-web1' -H 'Host: example.com'
curl http://127.0.0.2:9080/web1-key-auth \
-H 'apikey: Password-web2' -H 'Host: example.com'
```

Note: เมื่อสร้าง consumer ที่ใช้ plugin key-auth ค่า apikey สามารถใช้ได้กับ ทุก route ต้องใช้ plugin consumer-restriction กำหนด whitelist เพื่อจำกัด consumer ในการใช้ API ควรจะต้องมี blacklist/whitelist  เสมอสำหรับการใช้ key-auth

## basic-auth

basic-auth เป็นการ authentication แบบดั้งเดิม ใช้งานค่อนข้างง่าย การใช้งานคล้ายกับ key-auth แค่มีชื่อผู้ใช้เพิ่มขึ้นมา ข้อเสียคือส่ง username:password ทุก request ดังนั้นต้องใช้ https เสมอ

```bash
# สร้าง consumer web1_basic_auth
curl http://127.0.0.1:9180/apisix/admin/consumers \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "username": "web1_basic_auth",
    "plugins": {
        "basic-auth": {
            "username": "web1-basic",
            "password": "web1-password"
        }
    }
}'
# สร้าง consumer web2_basic_auth
curl http://127.0.0.1:9180/apisix/admin/consumers \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "username": "web2_basic_auth",
    "plugins": {
        "basic-auth": {
            "username": "web2-basic",
            "password": "web2-password"
        }
    }
}'
```

``` bash
# สร้าง route /web1-basic-auth
curl http://127.0.0.1:9180/apisix/admin/routes \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "id": "web1-basic-auth",
    "uri": "/web1-basic-auth",
    "host": "example.com",
    "methods": ["GET"],
    "plugins": {
        "basic-auth": {}
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "web2:80": 1
        }
    }
}'
# สร้าง route /web2-basic-auth ให้ basic_auth_web2 ใช้ได้เท่านั้น
curl http://127.0.0.1:9180/apisix/admin/routes \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "id": "web2-basic-auth",
    "uri": "/web2-basic-auth",
    "host": "example.com",
    "methods": ["GET"],
    "plugins": {
        "basic-auth": {},
        "consumer-restriction": {
            "whitelist": [
                "web2_basic_auth"
            ]
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "web2:80": 1
        }
    }
}'
```
ทดสอบ
```
# Return 200
curl -i -uweb1-basic:web1-password http://127.0.0.1:9080/web1-basic-auth -H 'Host: example.com'
curl -i -uweb2-basic:web2-password http://127.0.0.1:9080/web1-basic-auth -H 'Host: example.com'
curl -i -uweb2-basic:web2-password http://127.0.0.1:9080/web2-basic-auth -H 'Host: example.com'
#Return 403
curl -i -uweb1-basic:web1-password http://127.0.0.1:9080/web2-basic-auth -H 'Host: example.com'
```


## jwt-auth

- ใช้แบบ share secret ก็ใช้ง่ายสำหรับ microservice ที่เชื่อถือกัน จะแสดงเป็นตัวอย่างนี้ 
- public/private ใช้สำหรับระบบที่แชร์ secret ไม่ได้ client ต้องใช้ public key ในการ verify

Consumer
``` bash
curl http://127.0.0.1:9180/apisix/admin/consumers -H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "username": "web1_jwt_auth",
    "plugins": {
        "jwt-auth": {
            "key": "web1-jwt",
            "secret": "web1-secret-key"
        }
    }
}'
```
Route

``` bash
curl http://127.0.0.1:9180/apisix/admin/routes \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "id": "web1-jwt-auth",
    "uri": "/web1-jwt-auth",
    "host": "example.com",
    "methods": ["GET"],
    "plugins": {
        "jwt-auth": {}
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "web1:80": 1
        }
    }
}'
```

สร้าง route สำหรับการ sign โดยใช้ public-api เปลี่ยน uri 

``` bash
curl http://127.0.0.1:9180/apisix/admin/routes/jas \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "uri": "/apisix/plugin/jwt/sign",
    "plugins": {
        "public-api": {}
    }
}'
```
สร้าง route สำหรับการ sign สะดวกไม่ต้องเขียนโค้ดเอง โดยใช้ public-api เปลี่ยน uri เป็น /jwtsign มีใส่ key-auth เพื่อความปลอดภัยด้วย จะใช้ของอันก่อนหน้าที่ทำไว้ของคอนซูมเมอร์ key_auth_web1

``` bash
curl http://127.0.0.1:9180/apisix/admin/routes/jas \
-H 'X-API-KEY: edd1c9.....5c8f1' -X PUT -d '
{
    "uri": "/jwtsign",
    "plugins": {
        "public-api": {
             "uri": "/apisix/plugin/jwt/sign"
        },
        "key-auth": {}
    }
}'

# สร้าง Token
# Request token แบบไม่มี payload
curl http://127.0.0.1:9080/jwtsign?key=web1-jwt -H "apikey: Password-web1"
# Response
eyJxxxXVCJ9.eyJxxx0In0.fNCmRxxxcZk4
# Request token แบบมี payload
curl -G --data-urlencode 'payload={"uid":10000,"uname":"web1"}' \
http://127.0.0.1:9080/jwtsign?key=web1-jwt -i -H "apikey: Password-web1"
# Response
eyJhbxxxXVCJ9.eyJrZXxxx4OTA1OTMwNH0.QeVocxxxjk-2I
```
ทดสอบโดยใช้ token ที่ได้มา
```
curl -i http://127.0.0.1:9080/web1-jwt-auth -H 'Host: example.com' \
-H 'Authorization: eyJxxxXVCJ9.eyJxxx0In0.fNCmRxxxcZk4'
```

ถ้าสร้าง token เองด้วยวิธีอื่น เช่น [jwt.io](https://jwt.io) ใน payload จำเป็นต้องมี key ของ consumer ด้วย


## openid-connect
TODO: หัวข้อนี้ยังไม่เสร็จ
เนื้อหามาจาก [Use Keycloak with API Gateway to secure APIs](https://apisix.apache.org/blog/2022/07/06/use-keycloak-with-api-gateway-to-secure-apis/)


``` bash
docker run -d -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=secret_password quay.io/keycloak/keycloak:21.1.2 start-dev 
```


``` bash
version: "3.7"
services:    
  sso:
    image: quay.io/keycloak/keycloak:21.1.2
    container_name: "keycloak-sso"
    volumes:
      - /etc/localtime:/etc/localtime:ro
    command:
      - start-dev
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=secret_password
      - PROXY_ADDRESS_FORWARDING=true
      - VIRTUAL_HOST=sso.example.com
      - VIRTUAL_PORT=8080
    networks:
      - apisix
networks:
  apisix:
    driver: bridge
```
