import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { getUserByEmail } from './lib/db/getUserByCondition'
import { validation } from './lib/validation'

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      //@ts-expect-error ts next-auth issues
      async authorize(credentials) {
        const validatedFields = validation.login.safeParse(credentials)
        if (validatedFields.success) {
          const { email } = validatedFields.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) return null
          return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
