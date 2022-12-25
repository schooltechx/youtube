<script>
    import {onMount} from 'svelte'
    import AddWorker from './add.worker.js?worker'
    let a=1,b=3,answer=0
    /** @type {Worker} */
    let addWorker
    /** @param {MessageEvent<{answer:number}>} d */
    function onAddWorker({data}){
        console.log("Get anser:",data)
        answer = data.answer
    }
    function loadWorker(){
        addWorker = new AddWorker
        addWorker.onmessage = onAddWorker
    }
    onMount(loadWorker)
</script>
<h1>Web Worker</h1>
{#if addWorker}
<input type="number" bind:value={a}>
<input type="number" bind:value={b}>
={answer}
<button on:click={()=>{addWorker.postMessage({a,b})}}>Add</button>
{/if}
