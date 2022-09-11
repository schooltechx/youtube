/* function POST not work with +page.server.js anymore (New update of SvelteKit)
   Please use Form Actions instead
   https://kit.svelte.dev/docs/form-actions
   new version if this code.
   src/routes/actions/+page.server.js
*/
import { PrismaClient,Prisma } from '@prisma/client'
const prisma = new PrismaClient()
/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    let del= Number(url.searchParams.get("del"))
    if(del>0){
        try{
            await prisma.user.delete({where:{id:del}})
        }catch{
            console.log("Delete fail")
        }
    }
    const users = await prisma.user.findMany()
    await prisma.$disconnect()
    return{users}
}

/** @type {import('./$types').Action} */
export async function POST({ request}) {
    const values = await request.formData();
    const name = values.get('name')?.toString()??""
    const email = values.get('email')?.toString()??""
    const id = Number(values.get('id'))
    if(email==""||name==""){
        return{status:400,
        errors:{message:'Require name and email'}}
    }
    const data = {email,name}
    try{
        if(id>0){
            await prisma.user.update({where:{id:id},data})
        }else{
            await prisma.user.create({data})
        }
    }catch(e){
        let msg=""
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          msg=e.message + " "+ id
        }else{
          msg='Create or Update user fail '+id
        }
        await prisma.$disconnect()
        console.log(msg)
        return {
            status: 500,
            errors: {message: msg}
        } 
    }
    await prisma.$disconnect()
    return {location:'/user'}
}
