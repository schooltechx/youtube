<script>
	/** @type {import('./$types').ActionData} */
	export let form;
	let message = '';
</script>
<form method="POST" action="?/notify">
	<input name="message" type="text" bind:value={message} />
	<button disabled={!message}>Send</button>
</form>
{#if form?.success}
	<p>Successfully Notify</p>
{/if}
Replace [notify_token] with your own token