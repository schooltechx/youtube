import { invalid, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { Action, Actions, PageServerLoad } from './$types'

import { db } from '$lib/database'

export const load: PageServerLoad = async ({locals}) => {
  if (locals.user) {
    throw redirect(302, '../profile')
  }
}

const login: Action = async ({ cookies, request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    return invalid(400, { invalid: true })
  }

  const user = await db.user.findUnique({ where: { username } })

  if (!user) {
    return invalid(400, { credentials: true })
  }

  const userPassword = await bcrypt.compare(password, user.passwordHash)

  if (!userPassword) {
    return invalid(400, { credentials: true })
  }

  // regenerate new token after re login
  const authenticatedUser = await db.user.update({
    where: { username: user.username },
    data: { userAuthToken: crypto.randomUUID() },
  })

  cookies.set('session', authenticatedUser.userAuthToken, {
    path: '/',
    // server side cookie. can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    sameSite: 'strict',
    // only sent over HTTPS in production
    secure: process.env.NODE_ENV === 'production',
    // one month
    maxAge: 60 * 60 * 24 * 30,
  })

  // redirect the user
  throw redirect(302, '/')
}

export const actions: Actions = { login }
