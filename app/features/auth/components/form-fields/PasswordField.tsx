import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { FieldValues, UseControllerProps } from 'react-hook-form'
import { LuEye, LuEyeOff, LuLock } from 'react-icons/lu'

import { cn } from '@/lib/utils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { RenderIf } from '@/components/ui/RenderIf'

interface PasswordFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  switchIcon: boolean
  setSwitchIcon: Dispatch<SetStateAction<boolean>>
  handlePasswordValidationChange?: (value: string) => void
  setIsPasswordComplexityVisible?: Dispatch<SetStateAction<boolean>>
}

export default function PasswordField<T extends FieldValues>({
  name,
  control,
  setSwitchIcon,
  switchIcon,
  handlePasswordValidationChange,
  setIsPasswordComplexityVisible,
}: PasswordFieldProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredPassword = e.target.value
    setSwitchIcon(enteredPassword.length > 0)
    handlePasswordValidationChange &&
      handlePasswordValidationChange(enteredPassword)
  }

  const handlePasswordVisibilityClick = () => {
    setIsPasswordVisible(prev => !prev)
  }

  const iconClass = 'absolute right-[9px] text-muted-foreground top-[11px]'
  const iconSize = 22

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                className="text-base w-full"
                onChange={e => {
                  handlePasswordChange(e)
                  field.onChange(e)
                  setIsPasswordComplexityVisible &&
                    setIsPasswordComplexityVisible(true)
                }}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {
                  setIsPasswordFocused(false)
                  setIsPasswordComplexityVisible &&
                    setIsPasswordComplexityVisible(false)
                }}
              />
              <RenderIf isTrue={switchIcon}>
                <RenderIf isTrue={isPasswordVisible}>
                  <LuEye
                    className={cn(
                      'cursor-pointer absolute right-[9px] text-muted-foreground top-[11px]',
                      {
                        'text-primary': isPasswordFocused,
                      },
                    )}
                    size={22}
                    title="Toggle password visibility"
                    onClick={handlePasswordVisibilityClick}
                  />
                </RenderIf>
                <RenderIf isTrue={!isPasswordVisible}>
                  <LuEyeOff
                    className={cn('cursor-pointer', iconClass, {
                      'text-primary': isPasswordFocused,
                    })}
                    size={iconSize}
                    title="Toggle password visibility"
                    onClick={handlePasswordVisibilityClick}
                  />
                </RenderIf>
              </RenderIf>
              <RenderIf isTrue={!switchIcon}>
                <LuLock
                  className={cn(iconClass, {
                    'text-primary': isPasswordFocused,
                  })}
                  size={iconSize}
                  title="password"
                />
              </RenderIf>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
