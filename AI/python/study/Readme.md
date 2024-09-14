
# Study

- AI Artificial Intelligence เป้าหมายคือทำให้คอมพิวเตอร์และเครื่องจักรทำงานได้คล้ายกับมนุษย์
- ML Machine learning เป็นส่วนย่อยของ AI พยายามแก้ปัญหาเฉพาะทางและทำนายด้วยข้อมูล
- DS Data science เป็นสาขาที่พยายามหารูปแบบและดึงข้อมูลเชิงลึกจากข้อมูล

ทั้งสามตัวมันเกี่ยวเนื่องกัน ซึ่งอาจจะ ML ร่วมด้วย 

Machine Learning เป็นสาขาย่อยของวิทยาการคอมพิวเตอร์ที่ทำให้คอมพิวเตอร์เรียนรู้จากข้อมูลโดยไม่ต้องเขียนโปรแกรมที่ชัดเจน

## ประเภทของ ML
- Supervised learning จะมี Input และ Output(เฉลย,label) ป้อนเข้าไปเพื่อเรียนรู้ เช่น input เป็นภาพสัตว์ต่างๆ(pixel) จะมี label กำกับว่าเป็นสุนัข แมว นก
- Unsupervised learning จะไม่มี label ให้ จะให้เรียนรู้และหารูปแบบจากชุดข้อมูลที่ป้อนให้
- Reinforcement learning เรียนแบบมีการตอบโตกันในลักษณะให้รางวัลและการลงโทษ เช่นให้รางวัลถ้าทำออกมาได้ถูกต้องเป็นสิ่งที่ต้องการให้ทำต่อไป




## Supervised Learning 

ลักษณะการทำงานทั่วไปจะมี Input(Features) เข้าที่โมเดลแล้วเราจะได้ Output ออกมา

Feature vector -> Model -> Output(prediction)

เป็น Input มีได้หลายตัว จำเป็นต้องแปลงเป็นตัวเลขก่อนเพื่อให้คอมพิวเตอร์ประมวลผลได้แบ่งได้เป็น

- Qualitative (เชิงคุณภาพ) ข้อมูลเชิงหมวดหมู่ (จำนวนหมวดหมู่หรือกลุ่มที่จำกัด) อาจจะมีลำดับหรือไม่มีก็ได้

เช่น หญิง/ชาย(0/1) , ไทย/ลาว/ญี่ปุ่น/พมา(0001,0010,0100,1000), Rating(0-5) ฯลฯ

- Quantitative (เชิงปริมาณ) ข้อมูลที่มีค่าเป็นตัวเลข อาจเป็นแบบไม่ต่อเนื่อง(discrete)หรือต่อเนื่อง(continuous)ก็ได้
  - discrete เช่นจำนวนของในตะกร้า
  - continuous เช่นความยาว,อุณหภูมิ


### Supervised Learning 
- Classification - ทำการคาดเดาหมวดหมู่

| Binary Classification | Multiclass classification |
| ------------------ | ----------------- |
| สูง/ต่ำ              | สุนัข/นก/แมว/ปลา    |
| สแปมเมลล์/ไม่ใช่สแปม  | กล้วย/ส้ม/แอปเปิ้ล    |
| บวก/ลบ             | พันธุ์พืช            |

- Regression - ทำการคาดเดาค่าต่อเนื่อง เช่นทำนายค่าหุ้น


## Note

- [OpenAPI Postman Collection](https://www.postman.com/devrel/workspace/openai/documentation/13183464-90abb798-cb85-43cb-ba3a-ae7941e968da)

## Tutorial
- [Scikit-Learn Course - Machine Learning in Python Tutorial](https://www.youtube.com/watch?v=pqNCD_5r0IU)
- [Machine Learning for Everybody – Full Course](https://www.youtube.com/watch?v=i_LwzRVP7bg)
- Python for Machine Learning 
[slide](https://drive.google.com/drive/folders/1Wgz5F8dGXpda4EuyeV-wcVNICV4zdVeF), 1,
[2](https://www.youtube.com/watch?v=H7Gb5js14_s),
3,
[4](https://www.youtube.com/watch?v=mdeKjtoM35U)