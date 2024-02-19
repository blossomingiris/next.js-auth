import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'XR Auth | Create an Account',
}

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="h-full flex items-center justify-center flex-col">
      {children}
    </section>
  )
}
