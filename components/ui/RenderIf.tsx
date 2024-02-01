import React, { ReactNode } from 'react'

type RenderIfProps = {
  isTrue: boolean
  children: ReactNode
}

export const RenderIf = ({ isTrue, children }: RenderIfProps) => {
  return isTrue ? <>{children}</> : null
}
