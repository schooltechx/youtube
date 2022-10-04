# [Keycloak](https://www.keycloak.org/)

เป็นหัวข้อที่น่าสนใจตัวหนึ่งสำหรับการพัฒนาระบบขนาดใหญ่ ที่ต้องรวมระบบจาก เก่า ใหม่ หรือพัฒนาจากนักพัฒนาอื่น เข้าด้วยกันโดยทำให้ยูสเซอร์รู้สึกเหมือนเป็นระบบเดียวกัน

## Single-Sign On

Integration กับระบบ Login ที่มีอยู่เดิม ยูสเซอร์และรหัสผ่านเดียวกันเข้าได้ทุกระบบ  
บางระบบเราไม่ต้องพัฒนาเอง เอามาเชื่อมต่อกับระบบเดิมได้เลย เหมาะกับการพัฒนาระบบขนาดใหญ่ หรือ Micro Service.

## Identity Brokering and Social Login

รองรับ OpenID Connect และ SAML 2.0 ทำให้ต่อ social networks อย่าง [google](sso-google/) , Facebook , Github, 

## User Federation

เชื่อมต่อแอป กับ LDAP หรือ Active Directory ซึ่งเป็นระบบยอดจัดการยูสเซอร์ในองค์กร 

## Admin Console

รวมศูนย์กลางการจัดการทั้งหมดไว้ที่เดียว เปิดปิดการทำงาน เชื่อมต่อกับระบบต่างๆ

## Account Management Console

มีระบบหลังบ้านจัดการเพื่อจัดการข้อมูลยูสซอร์, เปลี่ยนระหัสผ่าน, two-factor authentication ฯลฯ 

## Authorization Services

# ตัวอย่างการใช้งาน
- [พื้นฐานการใช้ร่วมกับ .NET](api-jwt-auth/)
- [การใช้ Roles กับ .NET](api-authorization-role/)
- [การใช้งานร่วมกับ Google](sso-google/)
- [การใช้งานกับ Flutter](https://www.youtube.com/watch?v=xs6GRuj_MBs)
