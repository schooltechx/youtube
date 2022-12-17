<script>
  import { page } from "$app/stores"
  /** @type {import('./$types').PageData} */
  export let data
  /** @type {import('./$types').ActionData} */
  export let form
  let email = ""
  let name = ""
  let id = 0
</script>

{#if form}
  {#if !form.success}<p class="error">{$page.status} {form.msg}</p>{/if}
  {#if form.success}<p>{$page.status} {form.msg}</p>{/if}
{/if}

<form method="POST">
  <input name="id" bind:value={id} placeholder="Name" type="hidden" />
  <input name="email" bind:value={email} type="email" placeholder="Email" />
  <input name="name" bind:value={name} placeholder="Name" />
  <br />
  <button formaction="?/create" disabled={!name || !email}>Create</button>
  <button formaction="?/update" disabled={!name || !email || !id}>Update</button>
  <button formaction="?/del" disabled={!id}>Delete</button>
</form>
{#each data.users as user}
  <div>
    <input
      type="radio"
      name="u"
      bind:group={id}
      value={user.id}
      on:click={() => {
        name = user.name
        email = user.email
      }}
    />
    {user.email}({user.name})
  </div>
{/each}

<style>
  .error {
    background-color: red;
  }
</style>
