import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import './globals.css'

const urbanist = Urbanist({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.className} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#9feef6] to-[#A1C4FD] text-foreground`}
      >
        {children}
      </body>
    </html>
  )
}
