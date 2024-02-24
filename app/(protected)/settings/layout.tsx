export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="h-full w-full flex flex-col gap-10 items-center justify-center relative">
      {children}
    </section>
  )
}
