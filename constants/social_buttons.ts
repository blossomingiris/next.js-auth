import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export const social_buttons = [
  {
    label: 'Continue with Google',
    Icon: FcGoogle,
    provider: 'google',
  },
  {
    label: 'Continue with Github',
    Icon: FaGithub,
    provider: 'github',
  },
] as const
