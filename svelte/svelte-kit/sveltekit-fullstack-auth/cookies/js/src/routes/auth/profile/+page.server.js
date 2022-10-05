import { redirect } from '@sveltejs/kit'
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
  // redirect user if not logged in
  if (!locals.user) {
    throw redirect(302, '/')
  }
}
