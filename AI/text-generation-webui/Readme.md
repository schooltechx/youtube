
# Text generation web UI

[Text generation web UI](https://github.com/oobabooga/text-generation-webui/)

- รองรับหลาย model backends: Transformers, llama.cpp (through llama-cpp-python), ExLlama, ExLlamaV2, AutoGPTQ, AutoAWQ, GPTQ-for-LLaMa, CTransformers, QuIP#.


## Install
รันคำสั่งด้านล่างนี้จะติดตั้งโปรแกรมที่จำเป็นให้
``` bash
git clone https://github.com/oobabooga/text-generation-webui.git
cd text-generation-webui
# Linux: start_linux.sh
# macOS: start_macos.sh
# Windows WSL: start_wsl.bat
start_windows.bat
# Update update_linux.sh, update_windows.bat, update_macos.sh, or update_wsl.bat
```
เอาโมเดลใส่ในโฟลเดอร์ models
```
text-generation-webui
└── models
    └── llama-2-13b-chat.Q4_K_M.gguf
```
ถ้าเป็นแบบหลายไฟล์ให้ใส่แบบนี้
```
text-generation-webui
├── models
│   ├── lmsys_vicuna-33b-v1.3
│   │   ├── config.json
│   │   ├── generation_config.json
│   │   ├── pytorch_model-00001-of-00007.bin
│   │   ├── pytorch_model-00002-of-00007.bin
│   │   ├── pytorch_model-00003-of-00007.bin
│   │   ├── pytorch_model-00004-of-00007.bin
│   │   ├── pytorch_model-00005-of-00007.bin
│   │   ├── pytorch_model-00006-of-00007.bin
│   │   ├── pytorch_model-00007-of-00007.bin
│   │   ├── pytorch_model.bin.index.json
│   │   ├── special_tokens_map.json
│   │   ├── tokenizer_config.json
│   │   └── tokenizer.model

```
ดาว์นโหลดโมเดลด้วยคำสั่งนี้
``` bash
## --help for help
python download-model.py organization/model
```


โน้ตบุ๊กผมมี 2GB รันไม่ผ่าน ขึ้น
"torch.cuda.OutOfMemoryError: CUDA out of memory."


```
./start_linux.sh
sudo apt install wget git python3 python3-venv libgl1 libglib2.0-0
sudo apt install python3-pip
sudo apt install python3-tqdm
python3 download-model.py scb10x/typhoon-7b
```

CMD_FLAGS.txt ใส่บรรทัดนี้เข้าไป
```
--listen --listen-port 4000 --gradio-auth oom:oom --cpu --cpu-mamory 11GiB
```


## อื่นๆ
- [Google Bard](https://bard.google.com/) ลอง prompt
