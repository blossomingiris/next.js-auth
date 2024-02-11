import React from 'react'

import { motion } from 'framer-motion'

import { animation, validation } from '@/lib/animations'
import { cn } from '@/lib/utils'

import { useFormField } from './Form'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <motion.div {...animation(validation)}>
      <p
        ref={ref}
        id={formMessageId}
        className={cn('text-[0.8rem] font-medium text-destructive', className)}
        {...props}
      >
        {body}
      </p>
    </motion.div>
  )
})
FormMessage.displayName = 'FormMessage'

export { FormMessage, useFormField }
