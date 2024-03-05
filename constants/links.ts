import { routePaths } from '@/routes/routes'

export const links = [
  {
    label: 'My Profile',
    href: routePaths.profile,
  },
  {
    label: 'Admin',
    href: routePaths.admin,
  },
  {
    label: 'Settings',
    href: routePaths.settings,
  },
] as const
