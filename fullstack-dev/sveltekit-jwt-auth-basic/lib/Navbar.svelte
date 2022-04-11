<script>
  import user from './user'
  import {goto} from '$app/navigation'
  function logout(){
    localStorage.clear()
    $user = null
    goto('/')
  }
</script>
<nav>
  <a href="/">Home</a>
  <a href="/secret">Secret</a>
  {#if !$user}
  <a href="/login">Login</a>
  {:else}
  <b on:click={logout}>{$user.email}</b>
  {/if}
</nav>
