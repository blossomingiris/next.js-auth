import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'

import './globals.css'

const urbanist = Urbanist({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'XR Auth',
    template: '%s | XR Auth',
  },
  description:
    'A secure Next.js app build with JWT-based session management, 2FA, and RBAC using Prisma ORM, MongoDB, Resend, Tailwind and Framer Motion.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body
        className={`${urbanist.className} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#9feef6] to-[#A1C4FD] text-foreground`}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
