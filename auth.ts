//enable Edge compatibility for Prisma
import type { Adapter } from '@auth/core/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

import db from '@/lib/db/db'

import { getAccountByUserId } from './lib/db/getAccount'
import { getTwoFactorConfirmationByUserId } from './lib/db/getTwoFactorConfirmationByUserId'
import { getUserById } from './lib/db/getUserByCondition'

declare module 'next-auth' {
  interface User {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  //custom Signin and Error pages
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow user sign in with OAuth without email verification
      if (account?.provider !== 'credentials') return true
      const existingUser = await getUserById(user.id!)
      // Allow user sign in with 2factor code else block log in
      if (existingUser && existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        )
        if (!twoFactorConfirmation) {
          return false
        }
        return true
      }
      // Allow user sign in with verified email else block log in
      if (existingUser && existingUser.emailVerified) {
        return true
      } else {
        return false
      }
    },
    // extend session with token information
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})
