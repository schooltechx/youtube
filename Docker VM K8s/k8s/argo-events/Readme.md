# [Argo Event](https://argoproj.github.io/events)
จะมี custom Controller และ Resource
## CRD
- Event Source คอยรอฟังเหตุการณ์ที่มาจากข้างนอก แล้วเขียนลง Event Bus
- Event Bus บริการนำ event จาก Event Source ไปที่ Sensor
- Sensor ตรวจสอบว่า event ใน Bus ว่าตรงกับที่ต้องการแล้วบอกไปที่ Tricker
- Tricker คือ Workflow ที่ทำงาน


อ่านเพิ่ม
- [Integrating Argo Workflows and Events](https://sdbrett.com/post/2021-06-18-integrate-argo-wf-events/)
- [Installation, usage and personal experience with Argo Workflows, the cloud-native pipeline](https://www.sobyte.net/post/2022-01/expirence-of-argo-workflow/)


- [มีปัญหาทึไม่สามารถลบ argo-event ได้เพราะยังมี event-bus กับ อื่นๆอยู่](https://github.com/argoproj/argo-events/issues/1348)