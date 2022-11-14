<script> //code for App.svelte
  let users=[]
  async function load(){
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await res.json();
  }
</script>
<button on:click={load}>Load Users</button>
<button on:click={()=>users=[]}>Clear</button>
<ol>
{#each users as user}
<li>{user.name}({user.email})</li>
{/each}
</ol>