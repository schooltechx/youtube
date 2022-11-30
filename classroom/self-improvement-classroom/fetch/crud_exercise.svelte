<script>
  //code for App.svelte, impliment function del() and update
  // npx json-server --watch db.json
  // https://svelte.dev/tutorial/onmount
  // https://svelte.dev/tutorial/group-inputs
  // https://www.w3schools.com/jsref/jsref_find.asp
  // https://www.youtube.com/watch?v=Q_fN0MQiBs4
  import { onMount } from "svelte"
  let posts = [],
    title = "",
    author = "",
    id = 0,
    msg = ""
  onMount(load)
  async function load() {
    const res = await fetch("http://localhost:3000/posts")
    posts = await res.json()
    if (res.status != 200) {
      msg = "Can not load post list"
    }
  }
  async function create() {
    console.log({ title, author })
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    })
    if (!res.ok) {
      msg = "create post fail " + res.status
    }
    load()
  }
  // TODO: implement Update(PUT)
  async function update() {
    msg = "I want to update post " + id
  }
  // TODO: implement Delete(DELETE)
  async function del(sel_id) {
    msg = "I want to delete post " + sel_id
  }
  async function sel(sel_id) {
    let p = posts.find((o) => o.id == sel_id)
    if (p) {
      id = p.id
      title = p.title
      author = p.author
      msg = `Post ${id} selected`
    }
  }
</script>
<div>
  <input placeholder="Title" bind:value={title} />
  <input placeholder="Author" bind:value={author} />
  <button on:click={create} disabled={!title || !author}>Create</button>
  <button on:click={update} disabled={!title || !author || id == 0}>Update {id}</button>
</div>
{#each posts as post}
  <div>
    <input type="radio" name="po" on:click={() => sel(post.id)} />
    <button on:click={() => del(post.id)}>x</button>
    {post.title}({post.author})
  </div>
{/each}
<div>{msg}</div>