import { routePaths } from '@/routes/routes'

export const links = [
  {
    label: 'My Profile',
    href: routePaths.profile,
  },
  {
    label: 'Administrator',
    href: routePaths.admin,
  },
  {
    label: 'Settings',
    href: routePaths.settings,
  },
] as const
