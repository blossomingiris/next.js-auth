export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="h-full flex items-center justify-center flex-col p-5">
      {children}
    </section>
  )
}
