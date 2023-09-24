# ELK Stack
ELK Stack คืออะไร
ELK Stack บางทีก็เรียกแค่ Elasticsearch  ประกอบด้วยสามโปรแกรมหลักสามตัว 
- Elasticsearch คือเครื่องมือค้นหาและวิเคราะห์ข้อมูลแบบกระจาย สร้างหรือต่อยอดมาจาก Apache Lucene 
- Logstash คือเครื่องมือนำเข้าข้อมูล ช่วยในการรวบรวมข้อมูลจากแหล่งต่างๆ ก่อนจะแปลงข้อมูลดังกล่าว แล้วส่งไปยังปลายทางที่คุณต้องการ 
- Kibana ใช้แสดงข้อมูลเป็นรูปภาพที่จัดเก็บไว้ใน Elasticsearch มี UI เพื่อเข้าไปวิเคราห์ บันทึกและเหตุการณ์ต่างๆ นำเสนอแผนภูมิใช้งานง่าย

## ข้อดีของ Elasticsearch
Elasticsearch สามารถใช้เดี่ยวๆก้ได้ เป็นแบบ NoSQL ที่เหมาะกับงานที่ใช้การค้นหาเป็นหลัก ตั้งแต่ข้อมูลของพนักงาน หรือข้อมูลของ log ช่วยแก้ปัญหาเดิมๆของ SQL หลายอย่าง
- SQL ใช้ LIKE % มีข้อจำกัดมาก query ขนาดใหญ่จอยหลายตาราง
- SQL full text search ไม่ยืดหยุ่น ถ้าข้อมูลเยอะเริ่มช้า 
- การใช้งาน Aggregation ใน NoSQL Database ทั่วไปมันยาก
- ยูสเซอร์ทั่วไปสามารถทำ query ค้นหาได้ไม่ยากผ่าน Kibana
- รองรับการขยายตัวในอนาคต
- การค้นหาทั่วไปไม่รองรับการตัดคำไทย อยากทำทำ search คล้ายๆกับ Google ก็สามารถทำได้

## ตัวอย่างการใช้งาน
- [การค้นหาคำไทย](./setup-thai/)

## License

เมื่อวันที่ 21 มกราคม 2021 Elastic ได้ประกาศ[เปลี่ยนจาก](https://www.blognone.com/node/120632) Apache License เวอร์ชัน 2.0 (ALv2) ที่ได้รับอนุญาต ไปเป็น Elastic License หรือ SSPL ซึ่งไม่ใช่แบบโอเพนซอร์ และไม่ได้ให้อิสระแก่ผู้ใช้เช่นที่ผ่านมา Amazon fork ออกมาดูแลเป็น โปรเจ็กต์ [OpenSearch](https://opensearch.org/) 
- [Elasticsearch vs. OpenSearch: Unraveling the performance gap](https://www.elastic.co/blog/elasticsearch-opensearch-performance-gap)