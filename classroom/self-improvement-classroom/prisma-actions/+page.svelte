<script>
	import { page } from '$app/stores';
	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('./$types').ActionData} */
	export let form;
	let id=0,title="",content=""
</script>
{#if form}
{#if !form.success}<p class="error">{$page.status} {form.msg} </p>{/if}
{#if form.success}<p>{$page.status} {form.msg} </p>{/if}
{/if}
<form method="POST" >
	<input name="id" type="hidden" bind:value={id}/>
	<input name="title" bind:value={title} placeholder="Title"/>
	<br />
	<input name="content" bind:value={content} placeholder="Content"/>
	<br />
	<button formaction="?/create" disabled={!title ||!content} >Create</button>
	<button formaction="?/update" disabled={!title ||!content ||!id}>Update</button>
	<button formaction="?/del" disabled={!id}>Delete</button>
</form>
{#each data.posts as post}
  <div>
    <input type="radio" name="po" bind:group={id} value={post.id}/>
	{post.title}({post.content})
  </div>
{/each}
<style>
.error {
		background-color: red;
}
</style>