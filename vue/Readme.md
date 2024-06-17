# Quick Start
เริ่มหัดใช้ Vue แบบ TypeScript 
## install 
- Node.js ด้วย [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) (Linux/Mac)
- VS Code + Extension "Vue - Official"
สำหรับ Vue 3 ไม่ต้องใช้ Vetur และ Volar ระบุใน [เอกสารของ Vue](https://vuejs.org/guide/scaling-up/tooling#ide-support) ถ้าใช้จะเจอปัญหาจุกจิกตามมา

## Setup vue
ใช้ npm ติดตั้ง vue ในเบื้องต้นตรง TypeScrit ESLint,Prettier เป็น Yes นอกนั้นเป็นอะไรก็ได้

```bash
$ npm create vue@latest

Vue.js - The Progressive JavaScript Framework

✔ Project name: … contactList
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add an End-to-End Testing Solution? › Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes

Scaffolding project in /home/oom/dev/vue/real-world-vue...

Done. Now run:

  cd contactList
  npm install
  npm run format
  npm run dev

```
ใช้ VS Code เปิดโฟลเดอร์ contactList เปิด Terminal เรียก npm install แล้วค่อย npm run dev สามารถกำหนด port และ ใช้กับ ip อื่นนอกจาก localhost ได้ตามนี้

```
npm run dev -- --port 3000 --host 0.0.0.0
```



## Sample Contact List
ตัวอย่างการสร้าง form กรอก ชื่อ และ อีเมลล์ เอามาแสดงเป็นรายการได้ เอาโค้ดนี้ไปใส่ไว้ที่ src/App.vue หรือ src/views/HomeView.vue ก็ได้
- v-for เพื่อเอาค่าในอาเรย์มาแสดง
- v-model ทำ two way binding
- defineComponent() เพื่อให้ TypeScript อ้างใช้ Type ได้ถูกต้อง
- ref() ทำตัวแปรที่มีการอัปเดตใน DOM โดยอัตโนมัติเมื่อมีการแก้ไข(reactive) 
- reactive() คล้ายๆกับ ref() แต่ใช้กับ object
```html
<template>
  <main>
    <h1>Contact List</h1>
    <ul>
      <li v-for="(item,key) in contactList" :key="key"> 
        <button @click="delContact(key)">X</button> {{ item.name }} : {{ item.email }}  </li>
    </ul>
    <form @submit.prevent>
      <label for="username">Name:</label>
      <input type="text" name="username" v-model="username"><br/>
      <label for="email">E-mail</label>
      <input type="text" name="email" v-model="email"><br/>
      <button @click="addContact" >Add</button>
    </form>
    <span>#debug : {{username}} {{ email }} {{ count }}</span>
  </main>
</template>
<script lang="ts">
import {defineComponent,ref,reactive} from 'vue'
export default defineComponent({
  setup(){
    let count = 2
    let username= ref<string>("")
    let email=ref<string>("")
    const contactList = reactive([
      {"email":"oom@xxx.com","name":"สรวิชญ์ พลสิทธิ์"}
    ])
    const addContact = ()=>{
      // count++
      // console.log("debug",username.value ,email.value,count)
      if(!email.value||!username.value) 
        return
      contactList.push({"email":email.value,"name":username.value})
    }
    const delContact = (key:number)=>{
      contactList.splice(key,1)
    }
    return {contactList,username,email,addContact,count,delContact}
  }
})
</script>
```