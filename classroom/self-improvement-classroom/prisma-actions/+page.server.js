import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//import { fail } from '@sveltejs/kit';
let title="test"
let content=""
/** @type {import('./$types').PageServerLoad} */
export async function load(){
    const posts = await prisma.post.findMany()
    return{posts}   
}
/** @type {import('./$types').Action} */
const create = async ({  request }) => {
    const fdata = await request.formData();
    title = fdata.get('title')?.toString()??"";
    content = fdata.get('content')?.toString()??"";
    let data ={title,content}
    const post = await prisma.post.create({data})
      console.log(post)
    return { success: true,msg:"created" };
}
/** @type {import('./$types').Action} */
const update = async ({  request }) => {
    const data = await request.formData();
    title = data.get('title')?.toString()??"";
    return { success: true,msg:"Updated" };
}
/** @type {import('./$types').Action} */
const del = async ({  request }) => {
    const data = await request.formData();
    title = data.get('title')?.toString()??"";
    return { success: true,msg:"Deleted" };
}
/** @type {import('./$types').Actions} */
export const actions = { create, update,del }