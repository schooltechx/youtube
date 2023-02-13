# Virtual Machine , Docker, Kubernetes
การพัฒนาซอฟแวร์แบบดั้งเดิมจะติดตั้งระบบปฎิบัติการกับไลบารี่และโปรแกรมที่จำเป็นให้ครบ แล้วค่อยติดตั้งโปรแกรมที่พัฒนา 
การสำรองข้อมูลทำได้ยากต้องเข้าใจระบบทั้งหมดดีพอ เวลาอัปเกรดแล้วมีปัญหาก็ไม่สามารถย้อนกลับได้ ในภายหลังใช้ Virtualization 
เพื่อจำลองฮาร์ดแวร์เป็นเครื่องเสมือน Virtual Machine(VM) แล้วติดตั้งระบบปฎิบัติการในนั้นอีกที 
สามารถสำรองข้อมูลทั้งก้อนของ VM ได้ง่ายรวดเร็ว ถ้าอัปเกรดแล้วมีปัญหาก็ย้อนกลับไปใช้ข้อมูลที่สำรองไว้ได้ทันที 
แต่การสำรองข้อมูลทั้งเครื่องจะใช้เนื้อที่ค่อนข้างมาก และการทำ VM จะต้องจองทรัพยากรให้เพียงพอกับ VM ที่ทำงานอยู่
พอระบบซับซ้อนขึ้นก็จะประสบปัญหาสภาพแวดล้อมของ Porduction ไม่เหมือนกับ Development เกิดปัญหาที่หาเจอยาก
Docker ก็เข้ามาแก้ปัญหาหลายๆอย่างที่พบในแบบ Virtualization โดยสร้าง Container เพื่อจำลองระบบปฎิบัติการแล้วติดตั้งโปรแกรมในนั้นอีกที มีขนาดเล็ก 
ใช้ทรัพยากรน้อย สามารถใช้ทรัพยากรร่วมกันได้ ทั้ง Development และ Production ก็ใช้ Docker สภาพแวดล้อมก็จะเหมือนกันได้เลย 
หลักปรัชญาของ Docker คือหนึ่งโปรแกรมต่อหนึ่ง Container พอระบบใหญ่ขึ้นมากๆ มีการทำ Cluster และ Microservice ทำให้มีหลายร้อยหรือหลายพัน Container
จึงต้องมี Kubernetes ขึ้นมาเป็นตัวจัดการอีกที

# Virtual Machine
เซิร์ฟเวอร์ส่วนใหญ่แล้วจะเป็น Linux แต่เครื่องเดสท็อปมักจะเป็นวินโดว์ ถ้าจะต้องใช้ Linux บนวินโดว์ก็แนะนำให้ทำงานผ่าน Virtual Machine จะใช้ VMWare, Hyper-V 
หรือ ใช้ WSL(windows 10+)ก็ได้ ถ้ามีเครื่องสำหรับติดตั้ง Linux ต่างหากผมก็แนะนำให้ติดตั้งบน Type1 Hypervisor อีกที จะได้ติดตั้งหรือทดสอบได้หลายๆแบบ 
ผมใช้เครื่องเก่าๆมาติดตั้ง Promox ทำงานทำตามวีดีโอนี้เลย [Proxmox 7.x portable: ทำคลัสเตอร์เซิร์ฟเวอร์แบบพกติดตัว](https://youtu.be/EPYAjAd3Dkg) 
การติดตั้งวินโดว์เพื่อให้ได้ประสิทธิ์ที่ดีขึ้น เราจะใช้ติดตั้งไดร์เวอร์ Para-Virtualization ตามวีดีโอนี้ [Proxmox Win 10/11: VM Windows อย่างแรง](https://youtu.be/2xoqJQ4O3a0)

## Docker
สำหรับการพัฒนาโปรแกรมในปัจจุบันควรเริ่มใช้ Docker ตั้งแต่ต้นเพื่อลดปัญหาต่างๆ และสามารถย้ายไป Kubernetes ได้ง่าย
สำหรับผู้ใช้วินโดว์ติดตั้งตามวีดีโอ [ติดตั้ง Docker ร่วมกับ WSL2](https://youtu.be/8g_GwM60MaU) 

วิธีใช้งาน docker และ docker compose เบื้องต้นทำตามวีดีโอ [Docker in WSL2: เริ่มต้นใช้งาน Docker บน WSL2](https://youtu.be/ntLLCJk9LyY)
สำหรับผู้ใช้งานบน Linux บน Cloud หรือ Virtual Host ผมมีวีดีโอประสบการณ์การใช้งานของ [Proen Cloud](https://youtu.be/ALNn-X_2PEs)
มาแชร์ 

บน Production ต้องจัดการ Domain ต่างๆรวมถึง SSL ควรทำความรู้จัก Reverse Proxy ไว้บ้าง สำหรับมือใหม่ผมแนะนำ [Nginx Proxy Manager](https://youtu.be/iWrbL-xDwlk) 
ใช้งานง่ายใช้บน Production ได้เลย 

สำหรับใครใช้ S3 Storage ของ AWS ก็สามารถตั้งระบบเพื่อการพัฒนาหรือใช้เองได้ด้วย [MiniO](https://youtu.be/Q0kbsayEOGE) ตามวีดีโอนี้ครับ 

ตัว docker-compose ได้เปลี่ยนวิธีการใช้เป็น docker compose แล้วสามารถดูวีดีโอแนะนำได้ [Compose V2 เวอร์ชั่นใหม่ที่ยังเหมือนเดิม](https://youtu.be/H5qSnrIFlD8)

พักหลังๆ CPU ARM แบบ 64บิตมาแรงมาก Apple M1, Raspberry Pi, Cloud เจ้าต่างๆก็มีใช้ใช้ ประสิทธิ์ภาพต่อพลังงานก็ดีกว่า ก็คงพลาดไม่ได้แล้วสำหรับการใช้
Docker บน ARM64(v8) ลองดูวีดีโอ [Multi-arch docker image: ทำ Docker อิมเมจใข้ได้ หลาย CPU](https://youtu.be/3qDzLhPDt6c)

## Kubernetes
ตอนนี้ทางบริษัทที่ผมทำงานพยายามนำโปรแกรมที่พัฒนาบน Docker ไปทำงานบน Kubernetes(K8) ผมก็เลยลองติดตั้ง K8 หลายๆแบบดู ลองดูได้ครับ

### [Install Talos on Proxmox: ติดตั้ง Kubernetes เล่นที่บ้าน](https://youtu.be/LTEFGiiL4wQ)
ตัวนี้ไม่ต้องบริหารจัดการ node เพราะไม่มียูสเซอร์หรือโปรแกรมอื่นๆนอกจาก K8 อย่างเดียวเลย ปลอดภัยสุดๆ

### [Kubernetes : ติดตั้ง Microk8s cluster](https://youtu.be/XdJE8z_d3v4)
Microk8s มีคนใช้เยอะเลยตั้งแต่ Development ยัน Production เลยทีเดียว

### [K3S Setup: K8s ขนาดเล็กแต่แรงไม่ธรรมดา](https://youtu.be/L0C39xgWWKQ)
เล็กและแรงจริงใช้ตั้งแต่ Raspberry Pi ยัน Production เลย

### [Setup K3D: K3s บน Docker รวดเร็วดั่งติดปีก](https://youtu.be/dRUEwnq-xxM)
ตัวนี้ผมชอบมากทำงานบน Docker สามารถสร้าง K8 Cluster ได้ในไม่กี่วินาทีน่าจะเหมาะกับ นักพัฒนา ทดสอบระบบ หรือทำ CI/CD

### [Install Rancher สำหรับ บริหารจัดการ K8s Cluster](https://youtu.be/Q4eDDzNNlPY)
GUI สำหรับ K8 ทำให้ใช้งานง่ายขึ้นมาเลย

### VDI & Thinclient
- [Apache Guacamole](https://guacamole.apache.org/) is a clientless remote desktop gateway. It supports standard protocols like VNC, RDP, and SSH. [Video1](https://www.youtube.com/watch?v=gsvS2M5knOw)
- [Freenx](https://fedoranews.org/contributors/rick_stout/freenx/)
- VNC 
[x11vnc](https://www.lazysystemadmin.com/2009/08/real-x-display-of-workstation-can-be.html)
