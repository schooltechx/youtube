<script>
/** @type {import('./$types').PageData} */
export let data
//console.log(JSON.stringify(data))
//console.log(data) 
let id="",op = "", name="",category="drink",price=50,tags=""
$: disable_update = (name=="" || id=="" || price<1 )
$: disable_create = (name=="" || price<1 )
$: disable_delete = (id == "")
</script>
<h2>Product</h2>
<h3>{data.message}</h3>
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
    <input type="text" name="tags" bind:value={tags} placeholder="cheap,sales,new"><br>
    <input type="submit" disabled={disable_create} 
        value="Create" on:click={()=>{op='create';id=""}}>
    <input type="submit" disabled={disable_update} 
        value="Update" on:click={()=>{op='update'}}>
    <input type="submit" disabled={disable_delete} 
        value="Delete" on:click={()=>{op='delete'}}>
    <input type="submit" 
        value="Search" on:click={()=>{op='search'}}>
</form>

{#each data.products as p}
    <div><b on:click={ ()=>{
        id = p._id.toString()
        name = p.name??""
        price = p.price??0
        category = p.category??""
        tags = String(p.tags??[])
    } }>
        {p.name} {p.price} </b>
    </div>
{/each}
