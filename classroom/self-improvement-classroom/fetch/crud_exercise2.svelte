<script>
  //code for App.svelte, impliment function del() and update
  // npx json-server --watch db.json
  // https://svelte.dev/tutorial/onmount
  // https://svelte.dev/tutorial/group-inputs
  // https://www.w3schools.com/jsref/jsref_find.asp
  // https://www.youtube.com/watch?v=Q_fN0MQiBs4

  import { onMount } from "svelte"
  let posts = []
  let title = ""
  let author = ""
  let id = 0
  let msg = ""
  onMount(load)
  async function load() {
    const res = await fetch("http://localhost:3000/posts")
    posts = await res.json()
    if (res.status != 200) {
      msg = "Can not load post list"
    } else {
      msg = ""
    }
  }
  async function create() {
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    })
    if (!res.ok) {
      msg = "create user fail " + res.status
      return
    }
    load()
  }
  // implement Delete(DELETE)
  async function del() {
    msg = "Delete "+id
    id=0
  }
  // implement Update(PUT)
  async function update() {
    msg = "Update "+id
  }
  async function sel(sel_id) {
    let p = posts.find((o) => o.id == id)
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
  <button on:click={update} disabled={!title || !author || !id}
    >Update</button
  >
  <button on:click={del} disabled={!id}>Delete</button>

</div>
{#each posts as post}
  <div>
    <input
      type="radio"
      name="po"
      bind:group={id}
      value={post.id}
      on:change={() => sel(post.id)}
    />{post.title}({post.author})
  </div>
{/each}
<div>{msg}</div>
