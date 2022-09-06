<script>
    import { browser, dev, prerendering } from '$app/environment';
    import logo from "$lib/asset/logo.png"
</script>
<h1>About</h1>
<div>About page </div>
<div>{browser}</div>
<div>{dev}</div>
<div>{prerendering}</div>
<img src={logo} alt="svelte" width="100" >