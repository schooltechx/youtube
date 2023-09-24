# Install & setup Thai search

ในตัวอย่างจะติดตั้ง Elasticsearch, Kibana บน Docker [.env](../../../Docker%20VM%20K8s/docker-compose/elk/thai/.env),
[docker-compose.yaml](../../../Docker%20VM%20K8s/docker-compose/elk/thai/docker-compose.yaml)
และ [Dockerfile](../../../Docker%20VM%20K8s/docker-compose/elk/thai/Dockerfile) ผมใช้ Proxmox CT(LXC) เลย comment ตรง ulimits ไว้ เพราะไม่รองรับ 


ทดสอบ tokenizer thai

```
POST _analyze
{
  "tokenizer": "thai",
  "text": "สวัสดีครับคุณครู"
}
```
ผล
``` json
{
  "tokens": [
    {
      "token": "สวัสดี",
      "start_offset": 0,
      "end_offset": 6,
      "type": "word",
      "position": 0
    },
    {
      "token": "ครับ",
      "start_offset": 6,
      "end_offset": 10,
      "type": "word",
      "position": 1
    },
    {
      "token": "คุณ",
      "start_offset": 10,
      "end_offset": 13,
      "type": "word",
      "position": 2
    },
    {
      "token": "ครู",
      "start_offset": 13,
      "end_offset": 16,
      "type": "word",
      "position": 3
    }
  ]
}
```
ทดสอบ tokenizer icu_tokenizer
```
POST _analyze
{
  "tokenizer": "icu_tokenizer",
  "text": "สวัสดีครับคุณครู"
}

```
ผล
``` json
{
  "tokens": [
    {
      "token": "สวัสดี",
      "start_offset": 0,
      "end_offset": 6,
      "type": "<ALPHANUM>",
      "position": 0
    },
    {
      "token": "ครับ",
      "start_offset": 6,
      "end_offset": 10,
      "type": "<ALPHANUM>",
      "position": 1
    },
    {
      "token": "คุณครู",
      "start_offset": 10,
      "end_offset": 16,
      "type": "<ALPHANUM>",
      "position": 2
    }
  ]
}
```
ทดลองกับภาษาลาว
```
POST _analyze
{
  "tokenizer": "icu_tokenizer",
  "text": "ສະບາຍດີອາຈານ"
}
```

``` json
{
  "tokens": [
    {
      "token": "ສະບາຍດີ",
      "start_offset": 0,
      "end_offset": 7,
      "type": "<ALPHANUM>",
      "position": 0
    },
    {
      "token": "ອາຈານ",
      "start_offset": 7,
      "end_offset": 12,
      "type": "<ALPHANUM>",
      "position": 1
    }
  ]
}
```

ถ้าลองตัดคำว่า “สวัสดีปีใหม่” จะได้ “สวัสดี”  “ปี” “ใหม่” ซึ่งจะมองคำว่า “ปีใหม่“ เป็นคำเดียวกันก็ได้ จะต้องใช้ filter แบบ [shingle](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-shingle-tokenfilter.html) ช่วย  
จะสร้าง custom analyzer ที่ชื่อ analyzer_mythai ใช้ tokenizer เป็น icu_tokenizer 
Customer filter สำหรับภาษาไทย analyzer_shingle, ใช้ฟิวเตอร์ filter_shingle และ mappings กับ content (ใช้ icu_tokenizer กับ field นี้)

```
PUT myindex
{
  "settings": {
    "index": {
      "analysis": {
        "analyzer": {
          "analyzer_mythai": {
            "tokenizer": "icu_tokenizer",
            "filter": [
              "filter_shingle"
            ]
          }
        },
        "filter": {
          "filter_shingle": {
            "type": "shingle",
            "max_shingle_size": 3,
            "min_shingle_size": 2,
            "output_unigrams": "true"
          }
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {
        "analyzer": "analyzer_mythai",
        "type": "text"
      }
    }
  }
}
```

สร้างข้อมูลและทดสอบการค้นหา
```
POST myindex/_doc/1
{
  "content": "สวัสดีปีใหม่",
  "type": "hello"
}

POST myindex/_doc/2
{
  "content": "สวัสดีคุณครู",
  "type": "hello"
}


```
ลองเปลี่ยนการค้นหาหลายๆแบบดู "สวัสดีคุณครู" "สวัสดีปีใหม่ครับคุณครู" แล้วดู score เทียบกัน
```
GET myindex/_search
{
  "query" : 
    {"match" : 
      {"content" : "สวัสดี"}
    }
}
```