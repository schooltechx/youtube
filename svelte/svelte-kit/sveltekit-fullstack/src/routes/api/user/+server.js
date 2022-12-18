import { getUsers,createUser } from './user';
import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return json(getUsers());
  } 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try{
        const u = await request.json();
        const user = createUser(u)
        if(user)
          return json(user,{status:201})
        return json({msg:"Create user fail. name or email may not valid"},{status:400});
    }catch(e){
        console.log("Create User fail please see logs")
        console.log(e)
    }
    return json({msg:"Unknown error, Json may not valid"},{status:500})

}