# Stable Diffusion
เป็น ML ที่ใช้สร้าง จริงๆแล้วมีหลายตัวเช่น DALLE, MidJourney ฯลฯ แต่ Stable Diffusion เป็นที่นิยมเพราะ OpenSource ใช้งานฟรี สามารถติดตั้งในเครื่องตัวเองได้ มีโปรแกรมให้ใช้ง่ายๆหลายตัว 
- [Stable Diffusion Webui ตัวนี้นิยมและอัปเดตสุด (ดูเพิ่มเติมในลิงค์)](./stable-diffusion-webui.md) 
- [NMKD Stable Diffusion GUI](https://nmkd.itch.io/t2i-gui)

## Stable Diffusion Models
หรือบางทีเรียก  checkpoint models จะเป็นโมเดลที่สร้างภาพโดยมีสไตล์เฉพาะเจาะจง เนื่องผ่านการเทรน(สอน)ด้วยภาพสไตล์ที่เจาะจงมา มันไม่สามารถสร้างภาพบางอย่างได้ถ้าไม่มีการเทรนมาก่อน เช่นถ้าไม่มีภาพสุนัขในการเทรนก็ไม่สามารถสร้างภาพสุนัขได้ หรือถ้ามีการเทรนเฉพาะภาพสุนัขก็จะสร้างได้แค่ภาพสุนับเท่านั้น เราสามารถผนวกรวมโมเดลหลายๆตัวเข้าด้วยกันได้เพื่อให้สามารถสร้างภาพได้หลากหลายขึ้น มีกานสร้างโมเดลให้ใช้งานฟรีมากมาย ภาพเหมือนจริง ภาพวาด ภาพการ์ตูน ฯลฯ

ถึงแม้จะใช้ prompt เดียวกันแต่ละ model จะให้ผลที่ต่างกัน 
![dreamshaper_331BakedVae.safetensors](img/kid1.png) 
![ghostmix_v12.safetensors](img/kid2.png)
![v1-5-pruned-emaonly.safetensors](img/kid3.png) 


## ผลงาน
งานจะออกมาดีได้นั้นขึ้นกับหลายปัจจัย
- การสร้าง Prompt ที่ดี มีรายละเอียดและเจาะจง เหมือนการบอกเล่าให้คนอื่นฟัง ไม่มีใครเห็นภาพที่เราคิด จำเป็นต้องอธิบายให้ชัดเจน
ตัวอย่าง prompt ที่เขียนผิดกำกวมจะได้ภาพแปลกๆออกมา

"A realistic drawing of a beautiful girl in a blue shirt and blonde hair, wearing a swimsuit, sitting on the beach.""
![Alt text](img/women_in_the_beach.png)

- keywords 
มีคำเฉพาะบางอย่างที่จะมีผลมากว่าคำอื่นๆเช่น 
ชื่อดารา ชื่อศิลปิล ประเภทของภาพ เช่น illustration, painting, photograph

## Download Model

ส่วนใหญ่สามารถดาว์นโหลดได้ฟรื จาก [huggingface.co](https://huggingface.co/)เก็บไว้ที่ แต่จะค้นหายากเพราะรวมโมเดล AI หลายประเภท ต้องไปเวปอื่นๆที่มีภาพตัวอย่าง บางที่อาจจำเป็นต้องสมัครสมาชิกก่อน 
- [stabilityai/stable-diffusion-xl-base-1.0](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/sd_xl_base_1.0.safetensors) โมเดลรุ่นใหม่ XL

- [Civitai](https://civitai.com) เวปรวมโมเดล
- [Stable Diffusion Art](https://stable-diffusion-art.com/)



## ข้อมูลเพิ่มเติม
- วิธีเรียกใช้งาน Model เจ๋งๆ ใน Stable Diffusion [ตอนที่1](https://www.thepexcel.com/stable-diffusion-part1/),
[ตอนที่2](https://www.thepexcel.com/stable-diffusion-part2)
- [AI Art Tutorial](https://www.youtube.com/watch?v=DHaL56P6f5M&list=PLXS4AwfYDUi63uBtSSMC6SFW9ruRy7qsX&index=1)
- [สอนสร้างภาพ AI บนเครื่องคอมพิวเตอร์ของคุณด้วย Stability Matrix ไม่ต้องรอเครดิต ไม่ต้องกลัวโดนบล็อก!](https://www.youtube.com/watch?v=sfuS4tzVZ6g)
- [Lexica](http://lexica.art) ไปดู prompt ตัวอย่างได้
- [ใช้งาน 4-6GB VRAM](https://community.graphisoft.com/t5/Archicad-AI-Visualizer/TIP-to-run-Stable-in-computers-with-4-6GB-VRAM/td-p/576192
)

- [สอนใช้ Ideogram.ai UX/UI ง่ายมากๆ เหมาะสำหรับหัดเจน เจนฟรีวันละ 100 ภาพ ไม่ต้องกดสะสมเครดิต!](https://www.youtube.com/watch?v=XjNKgmAn0VU)






