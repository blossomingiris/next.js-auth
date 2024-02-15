import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'XR Auth | Log in to account',
}

export default function LoginLayout({
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
