<script>
  //code for App.svelte
  let mon
	let name="ditto"
	async function load(){
		const res = await fetch('https://pokeapi.co/api/v2/pokemon/'+name);
		mon = await res.json();
	}
</script>
<ol>
	<input bind:value={name}>
	<button on:click={load}>Load</button>
	{#if mon}
    <li>Name: {mon.name}</li>
    <li>Weight: {mon.weight}</li>
	{/if}
</ol>
