<script>
import {goto} from '$app/navigation'
import user from '$lib/user'
let identifier =''
let password = ''
async function login(){
    const res = await fetch('http://localhost:1337/api/auth/local',{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({identifier,password})
    })
    const data = await res.json()
    if(res.ok){
        console.log(data)
        if(data){
            localStorage.setItem('token',data.jwt)
            $user = data.user
            goto('/')
        }
    }else{
       if(data?.error?.message){
           alert(data.error.message)
       }
    }
}

</script>
<h1>Login</h1>
<input type="email" bind:value={identifier} placeholder="E-mail">
<input type="password" bind:value={password} placeholder="Password">
<button on:click={login}>Login</button>