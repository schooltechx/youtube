<script>
  //You can delete all style in app.css
  import {Button,TextInput,Grid,Row,Column,OrderedList,
    ListItem,} from "carbon-components-svelte"
  let name = ""
  let fruits = ["apple"]
  function add() {
    fruits = [...fruits, name]
    name = ""
  }
</script>

<svelte:head>
  <link rel="stylesheet"
    href="https://unpkg.com/carbon-components-svelte/css/g100.css"/>
</svelte:head>
<Grid>
  <Row noGutter={true} padding={false}>
    <Column padding={false}>
      <TextInput size="sm" placeholder="Fruit Name" bind:value={name} />
    </Column>
    <Column>
      <Button on:click={add} disabled={!name} size="small">Add</Button>
    </Column>
  </Row>
</Grid>
<OrderedList>
  {#each fruits as fruit}
    <ListItem>{fruit}</ListItem>
  {/each}
</OrderedList>
