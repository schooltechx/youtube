import { MongoClient,ObjectId } from 'mongodb'
import { error, redirect } from '@sveltejs/kit';
/**@type {import("mongodb").Collection<import("bson").Document>}*/
let Product
const client = new MongoClient("mongodb://localhost:27017")
try{
    const database = client.db('example')
    Product = database.collection('products')  
}catch(e){
    console.log(e)
    throw error(500, 'MongoClient connect fail');
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const s = url.searchParams
    let id = s.get("id")??""
    let op = s.get("operation")??""
    let name = s.get("name")??"Unknown product"
    let category = s.get("category")??"drink"
    let price = Number(s.get("price")??0)
    let tags = (s.get("tags")??"").split(",").map(e => e.trim())
    let p = {name,category,price,tags}
    let message=""
    
    switch(op){
        case "update":
            const u = await Product.updateOne({_id:new ObjectId(id)}, { $set: p });
            message=`Update ${u.upsertedId}`
            break
        case "delete": 
            const d = await Product.deleteOne({_id:new ObjectId(id)});
            console.log(`Delete$ ${d.deletedCount}, id=${id}` )
            throw redirect(303, url.pathname)//avoid reload and delete again
        case "create":
            const c = await Product.insertOne(p)
            message="Created "+c.insertedId
            //console.log(c)
            break
    }
    //regex search name of product (*search text*)
    const filter = (op=="search" && name!= "")?
        {name:{ $regex: '.*' + name + '.*' }}:{}
    const pros = await Product.find(filter).toArray()
    //fix unserialize objectID
    const products =  JSON.parse(JSON.stringify(pros))
    return {products,message}
}