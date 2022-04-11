<script>
	import user from '$lib/user';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let username, email;
	onMount(() => {
		if (!$user) {
			goto('/login');
		} else {
			username = $user.username;
			email = $user.email;
		}
	});
</script>

<h1>Secret page</h1>
<h2>{username}</h2>
<h2>{email}</h2>
