import { PrismaClient, Prisma } from '@prisma/client'
import { fail } from '@sveltejs/kit'
const prisma = new PrismaClient()
let msg = ""
let success = true

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const users = await prisma.user.findMany()
    await prisma.$disconnect()
    return { users };
}
/** @type {import('./$types').Action} */
const create = async ({ request }) => {
    const fdata = await request.formData()
    const email = String(fdata.get('email'))
    const name = String(fdata.get('name'))
    const data = { name, email }
    try {
        await prisma.user.create({ data })
    } catch (e) {
        success = false
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            msg = `${e.code}:${e.message} `
            return fail(400, { success, msg })
        }
        msg = "Create Fail " //none prisma error
        return fail(400, { success, msg })
    }
    await prisma.$disconnect()
    msg = `Created ${email} ${name} `
    return { success, msg }
}
/** @type {import('./$types').Action} */
const update = async ({ request }) => {
    const fdata = await request.formData()
    const email = String(fdata.get('email'))
    const name = String(fdata.get('name'))
    const id = Number(fdata.get('id'))
    const data = { name, email }
    await prisma.user.update({ where: { id: id }, data })
    await prisma.$disconnect()
    msg = `Updated ${email} ${name} `
    return { success, msg }
}
/** @type {import('./$types').Action} */
const del = async ({ request }) => {
    const fdata = await request.formData()
    const id = Number(fdata.get('id'))
    await prisma.user.delete({ where: { id: id } })
    await prisma.$disconnect()
    msg = `Delete ${id}`
    return { success, msg }
}
/** @type {import('./$types').Actions} */
export const actions = { create, update, del }