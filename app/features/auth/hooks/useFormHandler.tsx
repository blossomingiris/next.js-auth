'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'

export function useFormHandler<T>(
  zodSchema: ZodType<any, any, any>,
  onSubmit: (values: T) => Promise<void>,
) {
  const [isPending, startTransition] = useTransition()
  const [hasError, setHasError] = useState<string | undefined>('')
  const [hasSuccess, setHasSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {} as T,
  })

  const onFormSubmit = async (values: T) => {
    setHasError('')
    setHasSuccess('')
    startTransition(async () => {
      try {
        await onSubmit(values)
        setHasSuccess('Form submitted successfully.')
      } catch (error) {
        setHasError(error as string)
      }
    })
    form.reset()
  }

  return {
    form,
    setHasError,
    setHasSuccess,
    hasSuccess,
    isPending,
    hasError,
    onFormSubmit,
  }
}
