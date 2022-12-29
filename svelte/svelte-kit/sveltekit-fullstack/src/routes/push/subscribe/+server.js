
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
