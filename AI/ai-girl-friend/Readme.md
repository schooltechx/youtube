# AI Girlfriend

สร้างต้นแบบแฟนที่เป็น AI กันดีกว่า ถึงแม้ตอนนี้ DeepSeek R1 จะมาแรงแต่ ภาษาไทยมีข้อจำกัดหลายอย่าง แฟนผมไม่จำเป็นต้องมีเหตุผลมากนัก โมเดลของ เลือกใช้ OpenThaiGPT จะทำออกมาได้น่ารักและคุยสนุกกว่าครับ
ให้เรา เลือก ภาพ , Prompt, โมเดล ปรับให้เหมาะสมเราก็จะได้ต้นแบบพร้อมเอาไปพัฒนา Aplication แล้ว 

[![AI Girl friend](https://img.youtube.com/vi/4O8Wjqt3AUg/0.jpg)](https://youtu.be/4O8Wjqt3AUg "สร้างแฟนที่เป็น AI ด้วยตัวเอง")

ในวีดีโอจะมีการใช้ openai-edge-tts
```
   openai-edge-tts:
    image: travisvn/openai-edge-tts:latest
    restart: unless-stopped
    ports:
      - 5050:5050
    environment:
      - DEFAULT_LANGUAGE=th-TH
      # - DEFAULT_VOICE=th-TH-PremwadeeNeural
      - DEFAULT_VOICE=th-TH-NiwatNeural
      - API_KEY=your_api_key_here
      # - PORT=5050
      - DEFAULT_RESPONSE_FORMAT=mp3
      - DEFAULT_SPEED=1.1
      - REQUIRE_API_KEY=False
```

## ข้อมูลเพิ่มเติม
- [compose.yaml](./compose.yaml)
- [Chaputri - AI Girlfriend](https://openwebui.com/m/dotslashgabut/chaputri:latest)
- [ขาหมู.docx](./ขาหมู.docx)