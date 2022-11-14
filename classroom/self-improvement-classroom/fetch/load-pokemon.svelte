<script> //code for App.svelte
	let mon
	let name="pikachu"
	async function getPost(){
		const res = await fetch('https://pokeapi.co/api/v2/pokemon/'+name)
		mon = await res.json()
	}
</script>
<button on:click={getPost}>Load Poke</button>
<input bind:value={name}>
{#if mon}
<h2>{mon.name}</h2>
<img src={mon.sprites.front_default} alt={mon.name}>
<h3>Weight:{mon.weight}</h3>
<h3>Abilities</h3>
<ol>
{#each mon.abilities as ab}
	<li>{ab.ability.name}</li>
{/each}
</ol>
{/if}
