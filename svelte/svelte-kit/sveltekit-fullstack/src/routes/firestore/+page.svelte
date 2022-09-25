<script>
  import {proColRef,createProduct,updateProduct, 
    deleteProduct,searchProduct} from "./Firebase"
  import {onSnapshot} from "firebase/firestore"

  /**
   * @typedef { import("./types").Data } Data
  */

  /** @type {Data} data */
  let data = {products:[],message:""}
    $: message = data.message
    $: products = data.products 
    let loading = "Loading..."
    data.message = loading
  /*
    getDocs(proColRef).then((snapshot)=>{
        snapshot.forEach((p)=>{
            data.products.push({...p.data(), id:p.id})
        })
        data = data
    })
    */

    onSnapshot(proColRef, (snapshot) => {
        
        data.products = []
        snapshot.forEach((p) => {
            data.products.push({ ...p.data(), id: p.id })
            //console.log(p)
        })
        if(data.message==loading)
            data.message = ""
    })

//monitorProduct(data)
  function cl(){
    name = "",
    category = "drink",
    price = 50,
    tags = ""
  }
  let id = "",
    op = "", //unuse for this sample
    name = "",
    category = "drink",
    price = 50,
    tags = ""
  $: disable_update = name == "" || id == "" || price < 1
  $: disable_create = name == "" || price < 1
  $: disable_delete = id == ""
</script>

<div id="product-form">
  <h2>Firebase Firestore</h2>
  <form method="GET" on:submit|preventDefault>
    <input type="hidden" name="operation" bind:value={op} />
    <input type="hidden" name="id" bind:value={id} />
    <input type="text" name="name" bind:value={name}
      placeholder="Product name." />
    <select name="category" bind:value={category}>
      <option value="food">Foods</option>
      <option value="drink">Drinks</option>
      <option value="toy">Toys</option>
    </select>
    <input type="number" name="price" bind:value={price} size="2" />
    <input type="text" name="tags" bind:value={tags} 
    placeholder="cheap,sales,new" />
    <input type="submit" disabled={disable_create} value="Create"
      on:click={async() => {
        let atags = tags.split(",").map(e => e.trim())
        await createProduct({name, category, price, tags:atags}, data)
        data=data
        cl()
      }}
    />
    <input type="submit" disabled={disable_update} value="Update"
      on:click={async() => {
        let atags = tags.split(",").map(e => e.trim())
        await updateProduct({id, name, category, price, tags:atags}, data)
        data=data
        cl()
      }}
    />
    <input type="submit" disabled={disable_delete} value="Delete"
      on:click={async () => {
        await deleteProduct(id,data)
        data=data
        cl()
      }}
    />
    <input type="submit" value="Search"
      on:click={async() => {
        await searchProduct(name, data)
        data=data
        cl()
      }}
    />
  </form>
  {#each products as p}
    <div>
      <b
        on:click={() => {
          id = p.id ?? "Unknow product"
          name = p.name ?? ""
          price = p.price ?? 0
          category = p.category ?? ""
          tags = String(p.tags ?? [])
          //console.log(data.message)
        }}
      >
        {p.name}
        {p.price}
      </b>
    </div>
  {/each}
  <hr />
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

  #product-form h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  #product-form input {
    margin-bottom: 15px;
  }

  #product-form input[type="text"] {
    display: block;
    height: 32px;
    padding: 6px 16px;
    width: 100%;
    border: none;
    background-color: #f3f3f3;
  }
</style>
