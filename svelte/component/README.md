# UI Component

## [Daisy UI ](https://daisyui.com/) 
UI Component ที่ใช้ TailWindCSS ใช้ได้ไม่จำกัด Framework
```bash
# ติดตั้ง Tailwindcss พร้อมเซ็ตค่าให้เรียบร้อย
npx svelte-add@latest tailwindcss
# เมื่อติดตั้ง daisyui ให้ดูวิธีการตั้งค่าเพิ่มจากในเวป 
npm i daisyui
```
คอนฟิก plugin ใน tailwind.config.cjs
```js
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require("daisyui")],
	daisyui: {
		styled: true,
		themes: ["cupcake","cmyk"],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "dark",
	  },
};
module.exports = config;
```

## [Full calendar](./FullCalendar.md)
ปฎิทินรองรับพ.ศ. 