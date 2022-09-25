import mongoose from 'mongoose'
import Product from './product'
import { error, redirect } from '@sveltejs/kit';
try{
    await mongoose.connect('mongodb://localhost:27017/example')
}catch(e){
    console.log(e)
    throw error(500, 'Mongoose connect fail');
}
/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const s = url.searchParams
    let id = s.get("id")??"unknown"
    let op = s.get("operation")??""
    let name = s.get("name")??"Unknown product"
    let category = s.get("category")??"drink"
    let price = Number(s.get("price")??0)
    let tags = (s.get("tags")??"").split(",").map(e => e.trim())
    let p = {name,category,price,tags}
    let message=""

    switch(op){
        case "update":
            await Product.findByIdAndUpdate(id, { $set: p });
            message=`Updated ${id} update`
            break
        case "delete": 
            await Product.findByIdAndDelete(id)
            console.log(`Delete$ id=${id}` )
            throw redirect(303, url.pathname)//avoid reload and delete again
        case "create":
            const pro = new Product(p)    
            await pro.save();
            message="Created "+pro._id
            break
    }
    //search reegex match(search) part of name
    const filter = (op=="search" && name!= "")?
        {name:{ $regex: '.*' + name + '.*' }}:{}

    const pros = await Product.find(filter)
    const products =  JSON.parse(JSON.stringify(pros))
    return {products,message}
}