<script>
  import { page } from '$app/stores'
</script>

{#if $page.data.user}
  <h1>Welcome {$page.data.user.name}!</h1>
{/if}

{#if $page.data.user.role === 'ADMIN'}
You are Admintstrator
{:else}
You are not Admintstrator
{/if}
<form action="/auth/logout" method="POST">
  <button type="submit">Log out</button>
</form>

