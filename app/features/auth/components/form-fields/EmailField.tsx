import { useState } from 'react'

import { FieldValues, UseControllerProps } from 'react-hook-form'
import { LuMail } from 'react-icons/lu'

import { cn } from '@/lib/utils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { FormMessage } from '@/components/ui/FormMessage'
import { Input } from '@/components/ui/Input'

interface EmailFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  hasAutoFocus?: boolean
}
export default function EmailField<T extends FieldValues>({
  name,
  control,
  hasAutoFocus,
}: EmailFieldProps<T>) {
  const [isFieldFocused, setIsFieldFocused] = useState(hasAutoFocus)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium capitalize">
            {name}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={name}
                placeholder="e.g. jane.doe@example.com"
                className="text-base"
                onFocus={() => setIsFieldFocused(true)}
                onBlur={() => setIsFieldFocused(false)}
                autoFocus={hasAutoFocus}
              />
              <LuMail
                className={cn(
                  'absolute right-[9px] text-muted-foreground top-[11px] bg-card',
                  {
                    'text-primary': isFieldFocused,
                  },
                )}
                size={22}
                title="email"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
