<script>
import { error } from "@sveltejs/kit";

    import {Form,TextInput,Button} from "carbon-components-svelte";
	/** @type {import('./$types').PageData} */
	export let data
    /** @type {{message:string}} */
	export let errors
    let id=0,name="",email=""
</script>

<Form method="POST" action="/user">
    <TextInput hidden name="id" bind:value={id} />
    <TextInput name="name" bind:value={name} labelText="User name" placeholder="Enter user name..." />
    <TextInput name="email" bind:value={email} labelText="User name" placeholder="Enter Email..." />
    <Button type="submit" size="small" on:click={()=>id=0}
    disabled={name==""||email==""} >
        Add
    </Button>
    <Button type="submit" size="small" disabled={id==0|| name==""||email==""}>Update</Button>
</Form>
{#if errors}
<b>{errors.message}</b>
{/if}
<h1>User List</h1>
<ul>
    {#each data.users as user}
    <li>
        <a href="/user?del={user.id}">x</a>
        <b on:click={()=>{
            id=user.id
            name=user.name
            email=user.email}}>
            {user.name}:{user.email}
        </b>
    </li>
    {/each}
</ul>