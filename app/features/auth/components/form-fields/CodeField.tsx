import { useState } from 'react'

import { FieldValues, UseControllerProps } from 'react-hook-form'
import { BsShieldLock } from 'react-icons/bs'

import { cn } from '@/lib/utils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { FormMessage } from '@/components/ui/FormMessage'
import { Input } from '@/components/ui/Input'

interface CodeFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  hasAutoFocus?: boolean
}
export default function CodeField<T extends FieldValues>({
  name,
  control,
  hasAutoFocus,
}: CodeFieldProps<T>) {
  const [isFieldFocused, setIsFieldFocused] = useState(hasAutoFocus)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium capitalize">
            2FA Code
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type="text"
                placeholder="e.g. 123456"
                className="text-base"
                onFocus={() => setIsFieldFocused(true)}
                onBlur={() => setIsFieldFocused(false)}
                autoFocus={hasAutoFocus}
              />
              <BsShieldLock
                className={cn(
                  'absolute right-[9px] text-muted-foreground top-[11px] bg-card',
                  {
                    'text-primary': isFieldFocused,
                  },
                )}
                size={22}
                title="text"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
