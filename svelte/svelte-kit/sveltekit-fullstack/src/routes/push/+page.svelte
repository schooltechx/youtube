<script>
import {onMount} from 'svelte'
let title = ""
/** @type {ServiceWorkerRegistration}*/
let sw
/** @type {PushSubscription | null}*/
let sub

async function unSubscribe(){
    sub?.unsubscribe()
    sub = await sw.pushManager.getSubscription()
}
async function subscribe(){
    const status = await Notification.requestPermission()
    if(status !== 'granted'){
        alert("Please allow notification")
        return
    }
    console.log("Notification granted")
    if(!sub){
        let res = await fetch('/push/subscribe')
        if(!res.ok){
            alert("Get Public Key fail")
            return
        }
        let publicKey = await res.text()
        console.log("Try to subscribe")
        sub = await sw.pushManager.subscribe({
            userVisibleOnly:true,
            applicationServerKey:publicKey
        })

    }
    console.log("Subscribed ",JSON.stringify(sub))
    let m = {
        title:"Welcome",
        options:{
            body:"Thank for subscribe",
            icon:'/schooltech.png',
            actions:[
                {action:'yes',title:'Yes'},
                {action:'no',title:'No'}
            ]
        }
    }
    sendNoti(m)
}
/** @param {{title:string,options:any}} msg*/
async function sendNoti(msg){
    const res = await fetch('/push/subscribe',{
        method: 'POST',
        body: JSON.stringify({sub,msg}),
        headers:{
            'content-type':'application/json'
        }
    })
    if(!res.ok){
        alert("Send notification fail " + res.status)
        return
    }
    console.log("Web push sent ...")
}

async function init(){
    if('serviceWorker' in navigator && 'PushManager' in window){
       sw = await navigator.serviceWorker.register('/sw.js',{scope:'/'}) 
       console.log("Service Worker register ...")
       sub = await sw.pushManager.getSubscription()
    }
}
onMount(init)
</script>
<h1>Web Push test</h1>

{#if sw}
    {#if !sub}
    <button on:click={subscribe}>Subscribe</button>
    {:else}
    <button on:click={unSubscribe}>Unsubscribe</button>
    <input type="text" bind:value={title} placeholder="Notify text"> 
    <button disabled={!title} on:click={()=>{sendNoti({title,options:{}})}}>Notify</button>
    {/if}
{:else}
    <div>
       Not support Web push 
    </div>
{/if}

