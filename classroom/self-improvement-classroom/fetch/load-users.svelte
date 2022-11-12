<script>
  //code for App.svelte
  let users=[]
  async function load(){
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await res.json();
  }
</script>
<button on:click={load}>Load Users</button>
{#each users as user}
<div>{user.name}({user.email})</div>
{/each}
