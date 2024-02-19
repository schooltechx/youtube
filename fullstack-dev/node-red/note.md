

## funtion
เขียนโค้ด JavaScript เข้าไปได้เลย 
```js
let s = msg.payload.replace("World","Sorawit")
msg.payload = s 
return msg
```
ถึงแม้จะตัดเอา _msgid ออกตอนส่งค่าออกไป ค่าของมันก็จะติดไปกับข้อมูลอยู่ดี
```js
console.log(msg._msgid)
return {payload:value}
```

## Variable scope
การส่งค่านอกจากจะใช้การเชื่อมระหว่างโหนดแล้วสามารถส่งผ่านตัวแปร
scope ตัวแปรมี context, flow และ global ตรง inject สามารถเอาค่ามาใส่ payload จาก flow หรือ global มาใช้ได้ โดยไม่ต้อง เขียน funtion

### Context scope
อยู่ใน funtion node เดียวเท่านั้น
```js
let value = context.get('count')||0
value++
countext.set('count',value)
return {payload:value}
```

### Flow scope
ตัวแปรใช้ที่ไหนก็ได้ในหน้าของ Flow เดียวกัน
```js
let value = flow.get('count')||0
value++
flow.set('count',value)
return {payload:value}
```

### Global scope
```js
let value = global.get('count')||0
value++
global.set('count',value)
return {payload:value}
```


## Link Node 
เป็นการส่งค่าข้าม Flow หรือให้เริ่มอีก Flow ต่อเนื่อง 