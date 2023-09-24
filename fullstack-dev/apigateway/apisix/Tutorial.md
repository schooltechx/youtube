# Tutorial

ไปดูตัวอย่าง [Expost API](https://apisix.apache.org/docs/apisix/tutorials/expose-api/) , 
[Loadbalance](https://apisix.apache.org/docs/apisix/getting-started/load-balancing/) 
เลยก็ได้ ในตัวอย่างนี้จะดัดแปลงให้ง่ายกว่า และแสดง output  เพื่อให้เข้าใจโดยไม่ต้องลองทำ ตอนติดตั้งผ่าน docker compose จะมี web1 web2 มาให้ เป็นตัวอย่างประกอบการใช้งาน พารามิเตอร์ API โดยละเอียดควรดูใน [admin api](https://apisix.apache.org/docs/apisix/admin-api/)

## Expose API

สร้าง upstream
``` bash
# Request
 curl "http://127.0.0.1:9180/apisix/admin/upstreams/web1" \
-H "X-API-KEY: edd1...5c8f1" -X PUT -d '
{
  "type": "roundrobin",
  "nodes": {
    "web1:80": 1
  }
}'
# Reply
{"key":"/apisix/upstreams/1","value":{"type":"roundrobin","nodes":{"web1:80":1},"scheme":"http","hash_on":"vars","id":"1","pass_host":"pass","create_time":1688960902,"update_time":1688960902}}
# Request
curl "http://127.0.0.1:9180/apisix/admin/upstreams" \
-H "X-API-KEY: edd1...5c8f1"
# Reply
{"total":1,"list":[{"value":{"type":"roundrobin","nodes":{"web1:80":1},"scheme":"http","hash_on":"vars","id":"1","create_time":1688960902,"pass_host":"pass","update_time":1688960902},"modifiedIndex":42,"createdIndex":42,"key":"/apisix/upstreams/1"}]}

```
สร้าง Route โดยใช้กับ upstream ที่สร้างก่อนหน้า 
- method : ["GET", "POST"] เมทอดที่รองรับถ้าว่างแสดงว่ารองรับทั้งหมด
- host : ถ้าว่างจะใช้กันทุก address จะใช้รูปแบบนี้ก็ได้ *.example.com ถ้ามีมากกว่าหนึ่งใช้ hosts : ["foo.com", "*.bar.com"]
- uri : รูปแบบการ match ที่รองรับดูหัวข้อ router ถ้ามีมากกว่าหนึ่งใช้ uris : ["/hello", "/word"]


``` bash
# Request
curl "http://127.0.0.1:9180/apisix/admin/routes/1" \
-H "X-API-KEY: edd1...5c8f1" -X PUT -d '
{
  "methods": ["GET"],
  "host": "example.com",
  "uri": "/web1/*",
  "upstream_id": "1"
}'
# Reply
{"key":"/apisix/routes/1","value":{"methods":["GET"],"uri":"/web1/*","id":"1","status":1,"priority":0,"create_time":1688961105,"host":"example.com","upstream_id":"1","update_time":1688961105}}
# Request
curl "http://127.0.0.1:9180/apisix/admin/routes" \
-H "X-API-KEY: edd1...5c8f1"
# Reply
{"total":1,"list":[{"value":{"methods":["GET"],"uri":"/web1/*","id":"1","status":1,"priority":0,"upstream_id":"1","host":"example.com","create_time":1688961105,"update_time":1688961105},"modifiedIndex":43,"createdIndex":43,"key":"/apisix/routes/1"}]}
```

ลอง GET โดยใช้ชื่อ example.com
``` bash
# Request
curl -X GET "http://127.0.0.1:9080/web1/index.html" -H "Host: example.com"
# Reply
hello web1
```
รวบขั้นตอนการสร้าง upstream และ route และมี route id ในรูปแบบนี้ก็ได้ 
``` bash
# Request create route "web2-route"
curl "http://127.0.0.1:9180/apisix/admin/routes" \
-H "X-API-KEY: edd1...5c8f1" -X PUT -d '
{
  "id": "web2-route",
  "methods": ["GET"],
  "host": "example.com",
  "uri": "/web2",
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "web2:80": 1
    }
  }
}'
# Request web2
curl -X GET "http://127.0.0.1:9080/web2" -H "Host: example.com"
# Reply
hello web2
```

ดูหน้า UI


upstream มีอันเดียวเพราะของ web2 มันฝังอยู่ใน route เลย

วิธี disable route

``` bash
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1...5c8f1' -X PATCH -i -d '
{
    "status": 0
}'
```


## Load Balance

ตอนติดตั้งจะ web1 web2 ให้เราเอามาลองเล่นได้ สร้าง [Load balance](https://apisix.apache.org/docs/apisix/getting-started/load-balancing/) จากสองเวปนี้ จะเป็นแบบ round robin เหมือนตัวอย่างที่แล้วแค่มี node เพิ่ม (เลข 1 ด้านหลังคือ weight) เนื่องจากอยู่ใน docker network เดียวกันจะใช้ service name ในการอ้างแทน DNS และใช้ port ตัวมันเองได้เลย
``` bash
# Request
curl "http://127.0.0.1:9180/apisix/admin/routes" \
-H "X-API-KEY: edd1...5c8f1" -X PUT -d '
{
  "id": "web-loadbalance",
  "methods": ["GET"],
  "host": "example.com",
  "uri": "/web",
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "web1:80": 1,
      "web2:80": 1
    }
  }
}'
# Reply
{"key":"/apisix/routes/web-loadbalance","value":{"methods":["GET"],"uri":"/web","upstream":{"type":"roundrobin","nodes":{"web2:80":1,"web1:80":1},"hash_on":"vars","scheme":"http","pass_host":"pass"},"id":"web-loadbalance","status":1,"priority":0,"create_time":1688962217,"host":"example.com","update_time":1688962217}}
```
request ตามนี้จะได้ “hello web1” กับ “hello web2” สลับกัน

``` bash
curl -X GET "http://127.0.0.1:9080/web" -H "Host: example.com"
```
ใน Web UI จะไม่มี upstream เพิ่มเพราะมันฝังอยู่ใน route เลย

## Traffic Control

การจำกัดการ request ทำผ่าน plugin มีให้เลือกใช้ค่อนข้างมาก 

- limit-conn จำกัดจำนวน requests ที่ทำพร้อมๆกัน
- limit-req จำกัดจำนวน requests โดยใช้อัลกอริทึมแบบ leaky bucket  
- limit-count จำกัดจำนวน requests ในช่วงเวลาที่กำหนด
- proxy-cache: ทำ cache ให้ backend แบบใช้ disk หรือ memory ก็ได้
- request-validation: ใช้ validate requests .
- proxy-mirror: ทำสำนา requests ของไคลเอน เพื่อใช้วิเคราะห์โดยไม่กระทบกับบริการที่ใช้งานอยู่.
- api-breaker: ใช้ตัดวงจร เพื่อป้องกัน upstream business services.
- traffic-split: ใช้ในการแบ่ง traffic ในแต่ละ upstreams เพื่อการ release แบบ blue-green และ grayscale 
- request-id: ใส่ไอดีให้ทุก request เพื่อการติดตาม API requests.
- proxy-control: ควบคุมพฤติกรรมของ  NGINX proxy แบบไดนามิก
- client-control: ควบคุมขนาดของ body ของ NGINX แบบไดนามิก


ตัวอย่างจำกัดให้ Request ได้สองครั้งในหนึ่งนาที

``` bash
# สร้าง route แบบมี limit-count
curl "http://127.0.0.1:9180/apisix/admin/routes/" \
-H "X-API-KEY: edd1...5c8f1" -X PUT -d '
{
  "id": "web1-limit-count",
  "host": "example.com",
  "uri": "/web1-limit-count",
    "plugins": {
        "limit-count": {
            "count": 2,
            "time_window": 60,
            "rejected_code": 503,
            "key_type": "var",
            "key": "remote_addr"
        }
    },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "web1:80": 1
    }
  }
}'
# ทดสอบรัน 3 ครั้งติดๆกัน
curl -X GET "http://127.0.0.1:9080/web1-limit-count" -H "Host: example.com"

# ครั้งที่ 3 จะแสดง
<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body>
<center><h1>503 Service Temporarily Unavailable</h1></center>
<hr><center>openresty</center>
<p><em>Powered by <a href="https://apisix.apache.org/">APISIX</a>.</em></p></body>
</html>
```