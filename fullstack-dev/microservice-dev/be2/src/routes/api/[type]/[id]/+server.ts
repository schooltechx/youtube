import type {RequestHandler,RequestEvent } from './$types'
import {json} from '@sveltejs/kit'
let r = Math.floor(Math.random() * 100)

export const GET: RequestHandler = async ({ params }: RequestEvent) => {
    return json(`Hello Backend 2 ${params.type}:${params.id}:${r}`)
}