import { redirect } from '@sveltejs/kit'
export const csr = false;
/** @type {import('./$types').PageServerLoad} */
export const load = async ({cookies}) => {
  cookies.set('session', '', {
    path: '/',
    expires: new Date(0),
  })
  throw redirect(302, '/')
}
/** @type {import('./$types').Actions} */
export const actions = {
  default({ cookies }) {
    // eat the cookie
    cookies.set('session', '', {
      path: '/',
      expires: new Date(0),
    })

    // redirect the user
    throw redirect(302, '/')
  },
}
