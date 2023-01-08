# svelte-chartjs
[svelte-chartjs](https://github.com/SauravKanchan/svelte-chartjs) เป็น wrapper ของ 
[chart.js](https://www.chartjs.org/) ทำให้สร้างกราฟแบบต่างๆออกมาได้ง่ายๆ
## ติดตั้ง
``` sh
pnpm add svelte-chartjs chart.js
# or
yarn add svelte-chartjs chart.js
# or
npm i svelte-chartjs chart.js
```

## ตัวอย่างการใช้งาน


``` js
<script>
  import { Line } from 'svelte-chartjs'
  const data = {datasets:data: [65, 59, 80, 81, 56, 55, 40],}
</script>
<Line
  data={data}
  width={100}
  height={50}
  options={{ maintainAspectRatio: false }}
/>

```

