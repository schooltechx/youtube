import { invalid } from '@sveltejs/kit'
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
/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request}) => {
        let message = ""
        const values = await request.formData();
        const name = values.get('name')?.toString()??""
        const email = values.get('email')?.toString()??""
        //const id = Number(values.get('id'))
        if(email==""||name==""){
            message = "Require Name and Email"
            return invalid(400, { message, missing: true })
        }
        const data = {email,name}
        try{
            await prisma.user.create({data})
        }catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                message=e.message
              }else{
                message='Create or Update user fail '
              }
              await prisma.$disconnect()
              console.log(message)
              return invalid(500, { message, incorrect: true });


        }
        await prisma.$disconnect()
        message="Create user success"
        return {message, success: true };
    
    },
    update: async ({ request}) => {
        let message = ""
        const values = await request.formData();
        const name = values.get('name')?.toString()??""
        const email = values.get('email')?.toString()??""
        const id = Number(values.get('id'))
        if(email==""||name==""||id<1){
            message = "Require ID Name and Email"
            return invalid(400, { message, missing: true })
        }
        const data = {email,name}
        try{
            await prisma.user.update({where:{id:id},data})
        }catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                message=e.message + " "+ id
              }else{
                message='Create or Update user fail '+id
              }
              await prisma.$disconnect()
              console.log(message)
              return invalid(500, { message, incorrect: true });

                  
        }
        await prisma.$disconnect()
        message="Update user success"
        return {message, success: true };
      }
  };
