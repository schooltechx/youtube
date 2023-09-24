# APISIX
[APISIX](https://apisix.apache.org/) เป็น API Gateway ใช้งานได้ฟรี  มีฟีเจอร์ระดับ Enterprise โดยปรับเพิ่มฟีเจอร์จาก plugin สามารถคอนฟิกผ่าน API หรือ Web UI ได้
วีดีโอเกี่ยวกับ API Gateway ก่อนหน้าจะใช้ Traefik กิน resource น้อยไม่ต้องมีฐานข้อมูลใช้แค่คอนฟิก ผมว่าเหมาะกับใช้ Development หรือ Production ที่ไม่ซับซ้อน แต่ถ้าจะเอาฟีเจอรดีๆ ก็ต้อง Traefik Enterprise ซึ่งเสียเงินเพิ่ม ก็ใช้ APISIX แทนน่าจะดีกว่า 

Note: ขณะที่ผมใช้ตอนนี้ APISIX มีข้อด้อยอันหนึ่งคือยังหาวิธี auto renew certificate กับ let's encrypt ไม่ได้

## เริ่มต้นใช้งาน

[![APISIX Basic](https://img.youtube.com/vi/0Rmy2Iwnmr0/0.jpg)](https://youtu.be/0Rmy2Iwnmr0 "APISIX Basic")

ให้ติดตั้งแบบ docker compose ดูในเอกสารย่อย [Install](./Install.md) เรียนรู้วิธีใช้แบบคร่าวๆในเอกสารย่อย [Tutorial](./Tutorial.md)
# อ่านเพิ่ม

- [Centralized Authentication with Apache APISIX Plugins](https://dev.to/apisix/centralized-authentication-with-apache-apisix-plugins-30fo)
- [API Observability with Apache APISIX Plugins](https://dev.to/apisix/apis-observability-with-apache-apisix-plugins-1bnm)
- [API Security with OIDC by using Apache APISIX and Microsoft Azure AD](https://dev.to/apisix/api-security-with-oidc-by-using-apache-apisix-and-microsoft-azure-ad-50h3)

