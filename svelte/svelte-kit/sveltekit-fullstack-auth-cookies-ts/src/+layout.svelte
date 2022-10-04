<script lang="ts">
    import { page } from '$app/stores'
    //export let data
    //console.log($page.data.user)
  </script>
  
  <svelte:head>
    <title>SvelteKit Auth</title>
  </svelte:head>
  
  <nav>
    {#if !$page.data.user}
      <a href="/auth/login">Login</a> | 
      <a href="/auth/register">Register</a>
    {/if}
  
    {#if $page.data.user}
    <a href="/">Home</a> | 
    <a href="/auth/profile">Profile</a> 
    {/if}
  </nav>
  
  <main>
    <slot />
  </main>
  