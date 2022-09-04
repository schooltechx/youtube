<script>
    import {PUBLIC_VAR} from  '$env/static/public'
    /** @type {import('./$types').PageData} */
    export let data
</script>

<h1>Welcome to SvelteKit</h1>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
<div>{PUBLIC_VAR} </div>
