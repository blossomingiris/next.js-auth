import React from 'react'

import { LuLoader2 } from 'react-icons/lu'

import { Button } from '@/components/ui/Button'

type FormSubmitButtonProps = {
  hasSpinner: boolean
  label: string
}

export default function FormSubmitButton(props: FormSubmitButtonProps) {
  const { hasSpinner, label } = props

  return (
    <Button
      className="w-full font-semibold mt-3 text-lg active:scale-95 transition-all duration-200"
      size="lg"
      disabled={hasSpinner}
    >
      {label}
      {hasSpinner && <LuLoader2 size={22} className="ml-2 animate-spin" />}
    </Button>
  )
}
