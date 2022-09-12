<script>
// @ts-nocheck

	import { enhance } from '$app/forms';
	import { TextInput,Form,Button } from "carbon-components-svelte";
	/** @type {import('./$types').PageData} */
	export let data
	/** @type {import('./$types').ActionData} */
	export let form;

	/** @type {{message:string}} */
	export let errors
	let id=0,name="",email=""
</script>

{#if form?.message}
	{#if form?.success} <div>เพิ่มยูสเซอร์สำเร็จ</div>{/if}
	{#if form?.missing} <div>ข้อมูลไม่ครบ</div> {/if}
	{#if form?.incorrect} <div>มีบางอย่างไม่ถูกต้อง</div> {/if}
  	<p>{form.message}</p>
{/if}

<form action="POST" use:enhance>
	<input type="hidden" name="id" id="id" bind:value={id}>
	<input type="text" name="name" placeholder="Enter your name..." bind:value={name}>
	<input type="email" name="email" placeholder="Enter your email" bind:value={email}>
	<button formaction="?/create">Create</button>
	<button formaction="?/update">update</button>
</form>

<Form method="POST" >
	<TextInput hidden name="id" bind:value={id} />
	<TextInput name="name" bind:value={name} required placeholder="Enter user name..." />
	<TextInput name="email" bind:value={email} required placeholder="Enter Email..." />
	<Button type="submit" size="small" formaction="?/create" 
		on:click={()=>id=0} disabled={name==""||email==""}>Add</Button>
	<Button type="submit" size="small" formaction="?/update" 
		disabled={id==0||name==""||email==""}>Update</Button>
</Form>
{#if errors}
<b>{errors.message}</b>
{/if}
<h1>User list</h1>
<ul>
	{#each data.users as user}
		<li>
			<a href="/user?del={user.id}">x</a>
			<b on:click={()=>{
					id=user.id 
					name=user.name??""
					email=user.email
                }}>
                {user.name}: {user.email}
            </b>	
		</li>
	{/each}
</ul>
