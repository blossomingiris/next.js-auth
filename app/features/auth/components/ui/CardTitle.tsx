import React from 'react'

interface CardTitleProps {
  title: string
  description: string
}

export default function CardTitle(props: CardTitleProps) {
  const { title, description } = props
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="text-muted-foreground font-medium text-lg">{description}</p>
    </div>
  )
}
