
import { error, redirect } from '@sveltejs/kit';
import { PrismaClient, Prisma  } from '@prisma/client'
const prisma = new PrismaClient()
/** @typedef {{id:string,name:string,price:number,category:string,tags:string}[]} Products */
/** @type {Products}*/
const emptyProduct = []
/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const s = url.searchParams
    let id = s.get("id")?.toString()??""
    let op = s.get("operation")?.toString()??""
    let name = s.get("name")?.toString()??"Unknown product"
    let category = s.get("category")??"drink"
    let price = Number(s.get("price")??0)
    let tags = String(s.get("tags")).trim()
    let data = {name,category,price,tags}
    let message=""

    try {
        switch (op) {
            case "update":
                await prisma.product.update({ where: { id:id},data})
                message = `Product ${id} update`
                break
            case "delete":
                await prisma.product.delete({ where: { id:id } })
                message = `Product ${id} deleted`
                break
            case "create":
                await prisma.product.create({data})
                message = `Product created`
                break
        }
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e.message)
        } else {
            console.log("Something Wrong")
            console.log(e)
        }
        message = op+" Fail, check console logs"
        return { products:emptyProduct, message }

    }
    if(op=="delete") //avoid reload and delete again
        throw redirect(303, url.pathname)

    try{   
        const p = (op=="search"&&name!="")?
            await prisma.product.findMany({where:{name:{contains:name}}}):
            await prisma.product.findMany()
        await prisma.$disconnect()
        return { products:p, message }

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("Prisma Error found")
            console.log(e.message)
        } else {
            console.log("Something Wrong at findMany ")
            console.log(e)
        }
        message = "findMany() Fail, check console logs"
        return { products:emptyProduct, message }
    }
}