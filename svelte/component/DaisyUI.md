# [Daisy UI ](https://daisyui.com/) 
UI Component เป็น plugin ของ TailWindCSS ใช้งานง่าย ข้อดีคือใช้ได้ไม่จำกัด Framework


## Install
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


## การใช้งาน 
style ของ html ต่างๆจะถูก reset หมด อยากให้แท็กไหนเป็นอย่างไรให้แก้ style ใน src/app.postcss
```css
/* Write your global styles here, in PostCSS syntax */
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
    h1 {
      @apply text-4xl;
    }
    h2 {
      @apply text-2xl;
    }
    ul{
      @apply list-disc
    }
    ol{
      @apply list-decimal
    }
}
```
ให้ไปดู [component](https://daisyui.com/components/) จะมีตัวอย่างการใช้งาน

