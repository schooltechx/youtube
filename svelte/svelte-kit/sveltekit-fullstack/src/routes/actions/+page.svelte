<script>
	import { page } from '$app/stores';
	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('./$types').ActionData} */
	export let form;
</script>
<form method="POST" action="?/login">
	{#if form}
		{#if !form.success}<p class="error">{$page.status} {form.msg} {data.email}</p>{/if}
		{#if form.success}<p>{$page.status} {form.msg} {data.email}</p>{/if}
	{/if}
	<label>
		Email
		<input name="email" type="email" value={form?.email ?? ''} />
	</label>
	<br />
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button>Log in</button>
	<button formaction="?/register">Register</button>
</form>
<style>
	.error {
		background-color: red;
	}
</style>
