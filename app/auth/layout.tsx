export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="w-[90vw] mx-auto relative h-full flex justify-center items-center">
      {children}
    </section>
  )
}
