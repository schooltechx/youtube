<script>
    //code for App.svelte. Modify code to support json-server
    // npx json-server --watch db.json
    // https://www.w3schools.com/jsref/jsref_splice.asp
    let newItem = ""
    let todoList = [
      { text: "Learn HTML", status: true },
      { text: "Install VS Code git and Node ", status: true },
      { text: "Create Web with html5up.net and Github page", status: true },
      { text: "Learn Svelte", status: true },
      { text: "Learn Web API", status: false },
    ]
    function addToList() {
      todoList = [...todoList, { text: newItem, status: false }]
      newItem = ""
    }
    function removeFromList(index) {
      todoList.splice(index, 1)
      todoList = todoList
    }
  </script>
  
  <input bind:value={newItem} type="text" placeholder="New Todo.." />
  <button on:click={addToList}>➕</button>
  <br />
  {#each todoList as item, index}
    <input bind:checked={item.status} type="checkbox" />
    <span class:checked={item.status}>{item.text}</span>
    <button on:click={() => removeFromList(index)}>❌</button>
    <br />
  {/each}
  
  <style>
    .checked {
      text-decoration: line-through;
    }
  </style>
  