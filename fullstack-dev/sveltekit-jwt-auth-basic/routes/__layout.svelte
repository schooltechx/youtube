<script>
    import Navbar from '$lib/Navbar.svelte'
    import user from '$lib/user'
    import {onMount} from 'svelte'
    let loading = true
    onMount(async()=>{
        let token = localStorage.getItem('token')
        const res = await fetch('http://localhost:1337/api/users/me',{
            headers:{Authorization:`Bearer ${token}`}
        })
        const u = await res.json()
        if(res.ok){
            $user=u
            console.log(u)
        }
        loading = false
    })
</script>
<Navbar />
{#if loading}
<h3>Loading</h3>
{:else}
<slot></slot>
{/if}