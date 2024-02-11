import { useState } from 'react'

import { UseFormReturn } from 'react-hook-form'
import { LuUser } from 'react-icons/lu'

import { cn } from '@/lib/utils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { FormMessage } from '@/components/ui/FormMessage'
import { Input } from '@/components/ui/Input'

type NameFieldProps = {
  name: 'password' | 'email' | 'firstName' | 'lastName'
  placeholder: string
  label: string
  hasAutoFocus?: boolean
  form: UseFormReturn<
    {
      password: string
      email: string
      firstName: string
      lastName: string
    },
    any,
    undefined
  >
}

export default function NameField(props: NameFieldProps) {
  const { form, name, placeholder, label, hasAutoFocus = false } = props
  const [isNameFocused, setIsNameFocused] = useState(hasAutoFocus)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type="text"
                placeholder={placeholder}
                className="text-base"
                autoFocus={hasAutoFocus}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
              />
              <LuUser
                className={cn(
                  'absolute right-[9px] text-muted-foreground top-[11px] ml-2 bg-card',
                  {
                    'text-primary': isNameFocused,
                  },
                )}
                size={22}
                title={label}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
