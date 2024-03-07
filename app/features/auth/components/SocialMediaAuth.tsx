'use client'

import { social_buttons } from '@/constants/social_buttons'
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes/routes'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/Button'

export default function SocialMediaAuth() {
  const handleSocialProviderClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center w-full gap-4">
      {social_buttons.map(({ label, Icon, provider }) => (
        <Button
          size="lg"
          className="w-full flex gap-x-2 min-w-[170px]"
          variant="custom"
          key={label}
          onClick={() => handleSocialProviderClick(provider)}
        >
          <Icon className="flex-shrink-0" size={26} />
          {label}
        </Button>
      ))}
    </div>
  )
}
