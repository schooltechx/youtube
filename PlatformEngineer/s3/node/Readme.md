# การพัฒนาด้วย Node.js

เริ่มโปรเจ็ก node แล้วติดตัง package ที่จำเป็น
```sh
npm init -y
npm i @aws-sdk/client-s3
npm i @aws-sdk/s3-request-presigner
npm i minio
```
package.json เพิ่ม "type": "module" เพื่อให้ใช้แบบ import แทน require

```json
{
...
  "type": "module",
...
}
```
## AWS SDK
เนื่องจาก minio มีความเข้ากันได้กับ AWS s3 อย่างมาก สามารถใช้ aws-sdk ได้เลย โค้ดนี้ดัดแปลงจากตัวอย่าง Get started with Node.js ติดตั้ง @aws-sdk/client-s3 และ @aws-sdk/s3-request-presigner ถ้าใช้ aws-sdk ตั้งแต่ต้นสามารถพัฒนาบน mino แล้วย้ายไป production บน AWS ได้ทันทีโดยแค่แก้คอนฟิก

ตัวอย่างโค้ด [s3.js](./s3.js)

output
```
$ node s3.js
Created client
CreateBucketCommand:test-bucket-1734326847099
ListBucketsResult:  [
  {
    Name: 'test-bucket-1734326661512',
    CreationDate: 2024-12-16T05:24:21.522Z
  },
  {
    Name: 'test-bucket-1734326847099',
    CreationDate: 2024-12-16T05:27:27.115Z
  }
]
PutObjectCommand
getSignedUrl:http://localhost:9000/test-bucket-1734326847099/testfolder/my-first-object.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=trainee%2F20241216%2Fth-middle-rack-1%2Fs3%2Faws4_request&X-Amz-Date=20241216T052727Z&X-Amz-Expires=3600&X-Amz-Signature=508ab1205b308f0e4ba0466fbf90f70259ecac6ef25959e3bb8f328bdfbf4a29&X-Amz-SignedHeaders=host&x-id=GetObject
GetObjectCommand:Hello JavaScript SDK!
List folder in test-bucket-1734326847099
testfolder [
  {
    Key: 'testfolder/my-first-object.txt',
    LastModified: 2024-12-16T05:27:27.134Z,
    ETag: '"8582211a5f461f7c64a8304b6c36e4ef"',
    Size: 21,
    StorageClass: 'STANDARD'
  }
]
Empty and delete bucket? (y/n) y
DeleteObjectCommand:my-second-object.txt
DeleteObjectCommand:testfolder/my-first-object.txt
```

- S3Client เชื่อมต่อกับ minio ค่า region ใส่อะไร minio ไม่ใช้, forcePathStyle เป็น true เพื่อให้ bucket ใช้ sub folder แทน sub domain
- CreateBucketCommand สร้าง bucket 
- ListBucketsCommand เพื่อแสดงรายการ bucket ที่มี
- PutObjectCommand อัปโหลดอ็อปเจ็กเข้าไปใส่ bucket
- getSignedUrl ได้ URL สำหรับการดาว์นโหลดหรืออัปโหลดแบบมี token จำกัดเวลา BE จะทำตัวนี้ให้ FE ใช้
- GetObjectCommand เพื่อดึงออปเจ็กที่ต้องการออกมาใช้

- ListObjectsV2Command ถ้าต้องการแสดงออปเจ็กในโฟลเดอร์ testfolder เนื่องจาก s3 ไม่มีโฟลเดอร์มีแต่ไฟล์เท่านั้นใช้ Key ของอ็อปเจ็ก โดยกำหนดใช้ Delimiter และ Prefix เพื่อกรองออกมา

- paginateListObjectsV2 คล้ายกับคำสั่งก่อนหน้า แสดงรายการออกมาเป็นหน้าๆได้ เหมาะกับการแสดงออปเจ็กที่มีจำนวนมากได้
DeleteObjectCommand ใช้เพื่อลบอ็อปเจ็กออกไป

## Minio SDK
minio ก็มี JavaScript SDK เป็นของตัวเองฟังก์ชั่นการทำงานเหมือน AWS-SDK แต่วิธีการใช้จะต่างกัน โค้ดอ่านง่ายเข้าใจง่ายกว่า ในเบื้องหลังจะเรียก AWS S3 API [ดูโค้ด minio.js](./minio.js)

- Minio.Client() สร้าง Client สำหรับการเชื่อมต่อ
- makeBucket() สร้าง Bucket
- putObject() อัปโหลดอ็อปเจ็กเข้าไปใส่ bucket
- presignedUrl สำหรับการดาว์นโหลดหรืออัปโหลดแบบมี token จำกัดเวลา BE จะทำตัวนี้ให้ FE ใช้
- getObject เพื่อดึงออปเจ็กที่ต้องการออกมาใช้
- listObjectsV2 ในตัวอย่างจะแสดงการใช้ prefix recursive เพื่อจำกัดให้แสดงค่าเฉพาะโฟลเดอร์ที่ต้องการ
- listObjects ในตัวอย่างจะแสดงอ็อปเจ็กใน bucket ออกมาทั้งหมด (recursive เป็น true)



```

```

