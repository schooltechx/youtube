
import * as webpush from 'web-push'
import vapidKeys  from './keys.json'
import {json} from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET(){
    return new Response(vapidKeys.publicKey)
}

/** @type {import('./$types').RequestHandler} */
export async function POST({request}){
    try{
        webpush.setVapidDetails(
            'mailto:schooltechx@gmail.com',
            vapidKeys.publicKey,
            vapidKeys.privateKey
          )
          const {sub,msg} = await request.json()
          console.log("Get send",sub,msg)
          webpush.sendNotification(sub,JSON.stringify(msg))
    }catch(e){
        console.error(e)
        return json({message:"Send Noti fail"},{status:400})
    }
    return json({},{status:201})
}

/**
 * This code not in youtube tutorial. 
 * Use Postman with POST method to use this API.
 * Example for creating public/private key from code and save to json
 * 
 */
import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
/** @type {import('./$types').RequestHandler} */
export async function PUT() {
    try {
        const codepath = path.dirname(fileURLToPath(import.meta.url))
        const filepath = path.join(codepath, 'keys.json')
        const keys = webpush.generateVAPIDKeys()
        console.log("Write file ", filepath)
        writeFile(filepath, JSON.stringify(keys, null, 2))
        return json({ publicKey: keys.publicKey })
    } catch (e) {
        console.log("Write JSON fail", e)
        return json({ message: "Write JSON fail" }, { status: 500 })
    }
}

