<script>
    /** @type {import('./$types').PageData} */
    export let data
    let products = data.products
    let message = data.message
    let id="",op = "", name="",category="drink",price=50,tags=""
    $: disable_update = (name=="" || id=="" || price<1 )
    $: disable_create = (name=="" || price<1 )
    $: disable_delete = (id == "")
</script>
<div id="product-form">
    <h2>Prisma SQLite</h2>
    <form method="GET">
        <input type="hidden" name="operation" bind:value={op}>
        <input type="hidden" name="id" bind:value={id}>
        <input type="text" name="name" bind:value={name} placeholder="Product name.">
        <select name="category" bind:value={category}>
            <option value="food" >Foods</option>
            <option value="drink" >Drinks</option>
            <option value="toy" >Toys</option>
        </select>
        <input type="number" name="price" bind:value={price} size="2">
        <input type="text" name="tags" bind:value={tags} placeholder="cheap,sales,new">
        <input type="submit" disabled={disable_create} 
            value="Create" on:click={()=>{op='create';id=""}}>
        <input type="submit" disabled={disable_update} 
            value="Update" on:click={()=>{op='update'}}>
        <input type="submit" disabled={disable_delete} 
            value="Delete" on:click={()=>{op='delete'}}>
        <input type="submit" 
            value="Search" on:click={()=>{op='search'}}>
    </form>
    {#each products as p}
        <div><b on:click={ ()=>{
            id = p.id??"Unknow product"
            name = p.name??""
            price = p.price??0
            category = p.category??""
            tags = String(p.tags??[])
        } }>
            {p.name} {p.price} </b>
        </div>
    {/each}
    <hr>
    <div>{message}</div>
</div>
<style>
#product-form {
  width: 280px;
  margin: 0 auto;
  background-color: #fcfcfc;
  padding: 20px 50px 40px;
  box-shadow: 1px 4px 10px 1px #aaa;
  font-family: sans-serif;
}

#product-form * {
    box-sizing: border-box;
}

#product-form h2{
  text-align: center;
  margin-bottom: 30px;
}

#product-form input {
  margin-bottom: 15px;
}

#product-form input[type=text] {
  display: block;
  height: 32px;
  padding: 6px 16px;
  width: 100%;
  border: none;
  background-color: #f3f3f3;
}

</style>
