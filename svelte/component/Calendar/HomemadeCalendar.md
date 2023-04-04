# Home Made Calendar
ลองทำขึ้นมาใช้โค้ดในอินเตอร์เน็ตมาดัดแปลงให้รองรับ locale ไทยแสดง พ.ศ. ได้ โค้ด TypeScript ลองเอาไปแก้ต่อกันดูนะ ให้ส่ง property เป็น 
- locale เป็น string ตอนนี้รองรับแค่ "th", "en"
- buddhist เป็น boolean True/False
## Model 1
โค้ดใช้ 3 ไฟล์นี้
- [lib/Calendar1/Calendar.svelte](./Calendar1/Calendar.svelte)
- [lib/Calendar1/CalendarArrow.svelte](./Calendar1/CalendarArrow.svelte)
- [lib/Calendar1/calendarize.ts](./Calendar1/calendarize.ts)

## Model 2
โค้ดใช้ 2 ไฟล์นี้
- [lib/Calendar2/Calendar.svelte](./Calendar2/Calendar.svelte)
- [lib/Calendar2/CalendarContent.svelte](./Calendar2/CalendarContent.svelte)

