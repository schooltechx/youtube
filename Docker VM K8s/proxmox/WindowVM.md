# Proxmox Win 10/11: VM Windows อย่างแรง

[![Proxmox Win 10/11: VM Windows อย่างแรง](https://img.youtube.com/vi/2xoqJQ4O3a0/0.jpg)](https://youtu.be/2xoqJQ4O3a0 "Proxmox Win 10/11: VM Windows อย่างแรง")

ติดตั้งวินโดว์ VM บน Proxmox เพื่อให้ได้ประสิทธิ์ภาพสูงสุด ทำตาม[คู่มือ](https://pve.proxmox.com/wiki/Windows_10_guest_best_practices)ได้เลย 
วีดีโอทำสำหรับคนไม่มีเวลาลองหรือขี้เกียจอ่าน จะอธิบายว่า Paravirtualization ทำให้เร็วขึ้นได้อย่างไร ใช้ได้กับวินโดว์เวอร์ชั่นอื่นๆได้ด้วย

สำหรับวินโดว์ 11 ทำเหมือนกันเลย ตอนการตั้งค่า System ให้ติ๊กที่ TPM แล้วเลือกเป็น v2.0, ขนาด Hard Disk ซัก 64GB ขึ้นไป
ให้ใช้ไดร์เวอร์ของวินโดว์ 10