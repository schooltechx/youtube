// ก่อนใช้งานให้ ติดตั้ง mongoose(npm) และ mongo (docker) 
// npm install mongoose
// docker-compose up -d mongo
import mongoose from 'mongoose'
import Product from './product'
import { error } from '@sveltejs/kit';
try{
    await mongoose.connect('mongodb://localhost:27017/example')
}catch(e){
    console.log(e)
    throw error(500, 'Connect MongoDB fail');
}
/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const s = url.searchParams
    let id = s.get("id")??""
    let op = s.get("operation")??""
    let name = s.get("name")??"Unknown product"
    let category = s.get("category")??"drink"
    let price = Number(s.get("price")??0)
    let tags = (s.get("tags")??"").split(",")
    let p = {name,category,price,tags}
    let message=""

    switch(op){
        case "update":
            await Product.findByIdAndUpdate(id, { $set: p });
            message=`Product ${id} update`
            break
        case "delete": 
            await Product.findByIdAndDelete(id)
            message=`Product ${id} Deleted`
            break
        case "create":
            const pro = new Product(p)      
            await pro.save();
            message="Product created "+pro.id??""
            break
    }
    //search products have part of string name
    const searchFilter = { $regex: '.*' + name + '.*' }
    const pros = (op=="search" && name!= "")? 
        await Product.find({name:searchFilter}):await Product.find({})
    //fix unserialize objectID
    const products = pros.map((e)=>e.toJSON())
    return {products,message}
}
