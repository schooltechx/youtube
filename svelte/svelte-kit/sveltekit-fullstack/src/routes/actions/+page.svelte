<script>
    import { enhance } from '$app/forms'
    import { page } from '$app/stores';

    import {Form,TextInput,Button} from "carbon-components-svelte";
	/** @type {import('./$types').PageData} */
	export let data
    /** @type {import('./$types').ActionData} */
    export let form;
    /** @type {{message:string}} */
	export let errors
    let id=0,name="",email=""
</script>
{#if form?.message}
	{#if form.success} <div>เพิ่มหรืออัปเดตยูสเซอร์สำเร็จ</div>{/if}
	{#if form.missing} <div>ข้อมูลไม่ครบ</div> {/if}
	{#if form.incorrect} <div>มีบางอย่างไม่ถูกต้อง</div> {/if}
  	<p>{form.message}</p>
{/if}

<form action="POST" use:enhance>
	<input type="hidden" name="id" id="id" bind:value={id}>
	<input type="text" name="name" placeholder="Enter your name..." bind:value={name}>
	<input type="email" name="email" placeholder="Enter your email" bind:value={email}>
	<button formaction="?/create">Create</button>
	<button formaction="?/update">update</button>
</form>

<Form method="POST">
    <TextInput hidden name="id" bind:value={id} />
    <TextInput name="name" bind:value={name} labelText="User name" placeholder="Enter user name..." />
    <TextInput name="email" bind:value={email} labelText="User name" placeholder="Enter Email..." />
    <Button type="submit" size="small" on:click={()=>id=0} formaction="?/create" 
    disabled={name==""||email==""} >
        Add
    </Button>
    <Button type="submit" size="small" formaction="?/update" disabled={id==0|| name==""||email==""}>Update</Button>
</Form>
{#if errors}
<b>{errors.message}</b>
{/if}
<h1>User List</h1>
<ul>
    {#each data.users as user}
    <li>
        <a href="/actions?del={user.id}">x</a>
        <b on:click={()=>{
            id=user.id
            name=user.name
            email=user.email}}>
            {user.name}:{user.email}
        </b>
    </li>
    {/each}
</ul>
{$page.status}