
import { getUser,updateUser,deleteUser } from '../user';
import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    let user = getUser(Number(params.id))
    if(user)
        return json(user)
    return json({msg:"User Not found"},{status:404});
  } 
/** @type {import('./$types').RequestHandler} */
export async function PUT({ request,params }) {
    try{
        let id = Number(params.id)
        const u = await request.json();
        const user = updateUser(u,id)
        if(user)
          return json(user)
        return json({msg:"Update user fail. name or email may not valid"},{status:400});
    }catch(e){
        console.log("Update User fail please see logs")
        console.log(e)
    }
    return json({msg:"Unknown error, Json may not valid"},{status:500})
}
/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    let user = deleteUser(Number(params.id))
    if(user)
        return json({msg:"User Deleted"})
    return json({msg:"Deleted user fail"},{status:404})
  }