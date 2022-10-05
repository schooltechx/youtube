
import { db } from '$lib/database'
/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/test')) {
    return new Response('Test hook response');
  }
  // get cookies from browser
  const session = event.cookies.get('session')

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }
  //https://kit.svelte.dev/docs/hooks#server-hooks-handle
  // find the user based on the session
  const user = await db.user.findUnique({
    where: { userAuthToken: session },
    select: { username: true, role: true },
  })

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role.name,
    }
  }

  // load page as normal
  return await resolve(event)
}
