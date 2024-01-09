## Stable Diffusion WebUI 

[![Stable Diffusion WebUI - Install](https://img.youtube.com/vi/W1J57mCE4vg/0.jpg)](https://youtu.be/W1J57mCE4vg "Install Stable Diffusion WebUI")


[Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) เป็น Web App ตัวหนึ่งที่นิยม ติดตั้งใช้งานบนเครื่องส่วนตัวได้ง่าย รองรับ Windows, macOS, Linux 
![Alt text](img/cat-on-the-moon.png)
การตั้งค่าส่วนใหญ่จะแก้ตัวแปรแวดล้อม 
[COMMANDLINE_ARGS](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Command-Line-Arguments-and-Settings)
ดูที่ไฟล์ webui-user
ในวินโดว์จะเป็น webui-user.bat ใน linux จะเป็น webui-user.sh ตัวอย่างการตั้งค่า
ถ้า[การ์ดจอมีแรมน้อย](https://techtactician.com/stable-diffusion-low-vram-memory-errors-fix/#how-to-run-stable-diffusion-with-low-vram
) เช่นแค่ 2GB ให้ใส่ค่า --lowvram ตัวอย่างใน webui-user.bat
```
set COMMANDLINE_ARGS="--lowvram"
```
CPU Intel (ไม่มี GPU) แนะนำให้ใช้ 
["Stable Diffusion web UI with OpenVINO™ Acceleration"](https://github.com/openvinotoolkit/stable-diffusion-webui?tab=readme-ov-file#stable-diffusion-web-ui-with-openvino-acceleration) 
ในไฟล์ webui-user.sh เป็นดังนี้
```
export COMMANDLINE_ARGS="--skip-torch-cuda-test --precision full --no-half --port 3000 --listen"
```

บน Linux ถ้าขึ้นข้อความนี้ "Cannot find TCMalloc (improves CPU memory usage)" ให้ติดตั้ง google-perftools
```
sudo apt install --no-install-recommends google-perftools
```

ผู้หญิงผิวขาว ใส่แว่น หน้าตาสวยหมดจด ชุดสูต เดินบนสนามหญ้า

### การตั้งค่า  Generation
- Prompt: ใส่วงเล็บเพื่อเน้น คำอธิบายนั้น
- Sampling steps: ขั้นต่ำ 20 steps. ให้เพิ่มขึ้นถ้าภาพไม่ชัด.
- Width/Height: ขนาดเริ่มต้น 512×512 pixels. ปรับให้ใหญ่ตามต้องการ
- CFG scale: ปกติตั้งไว้ 7. ให้เพิ่มถ้าต้องการให้เชื่อฟัง prompt มากขึ้น.
- Seed value: -1 จะสุ่มการสร้างภาพ กำนดเลขที่ต้องการจะได้ภาพเดิมตอนสร้างใหม่.

ถึงจะใช้ Prompt เดียวกัน ขนาดภาพและ seed ก็มีผลต่อการสร้างภาพ
![Alt text](jgirl.png)
![Alt text](jgirl2.png)

- Batch Count จำนวนรอบต่อไปของการประมวลภาพครั้ง
- Batch Size จำนวนภาพที่สร้างขึ้นแบบขนาน(ในเวลาเดียวกัน) ถ้าหน่วยความจำน้อยให้ใช้ Size น้อยแต่เพิ่ม Count แทน

