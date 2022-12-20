## Misc
ตัวอย่างโค้ดทั่วไป

## ตรวจสอบ อุปกรณ์, os และ browser ที่ใช้ 
``` html
<script>
  /* 
  npm i ua-parser-js
  npm i --save-dev @types/ua-parser-js
  npx vite --port=4000 --host 0.0.0.0
  */
  import {UAParser } from 'ua-parser-js'
  var parser = new UAParser();
  let result = parser.getResult()
</script>
<pre>
  {result.browser.name}
  {result.engine.name}
  {result.os.name}
  {result.cpu.architecture}
</pre>
<div>
  {result.ua}
</div>
<h2>Check device</h2>
{#if result.os.name==='Android'}
<b>Android</b>
{/if}
{#if result.os.name==='Windows'}
<b>Windows</b>
{/if}
```

