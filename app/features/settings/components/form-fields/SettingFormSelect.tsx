import { UserRole } from '@prisma/client'
import { Control } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form'
import { FormMessage } from '@/components/ui/FormMessage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

type SettingsFormSelectProps = {
  name: 'role'
  placeholder: string
  label: string
  control: Control<{
    role: UserRole
    name?: string | undefined
    isTwoFactorEnabled?: boolean | undefined
    email?: string | undefined
    password?: string | undefined
    confirm_password?: string | undefined
  }>
}

export default function SettingsFormSelect(props: SettingsFormSelectProps) {
  const { name, label, placeholder, control } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white">
              <SelectItem value={UserRole.ADMINISTRATOR}>
                Administrator
              </SelectItem>
              <SelectItem value={UserRole.USER}>User</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
