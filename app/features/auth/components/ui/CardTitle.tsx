import { ReactNode } from 'react'

type CardTitleProps = {
  title: string
  description: string
  children?: ReactNode
}

export default function CardTitle(props: CardTitleProps) {
  const { title, description, children } = props
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center text-center">
      <div className="flex flex-col sm:flex-row justify-center items-center">
        {children}
        <h1 className="text-3xl font-extrabold ">{title}</h1>
      </div>
      <p className="text-muted-foreground font-medium text-lg">{description}</p>
    </div>
  )
}
