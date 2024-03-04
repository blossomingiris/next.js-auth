export const routePaths = {
  home: '/',
  login: '/auth/login',
  createAccount: '/auth/signup',
  forgotPassword: '/auth/forgot-password',
  authVerification: '/auth/new-verification',
  authError: '/auth/error',
  resetPassword: '/auth/reset-password',
  newPassword: '/auth/new-password',
  profile: '/profile',
  settings: '/settings',
  admin: '/admin',
}
/**
 * An array of routes that do not require authentication.
 * @type — {string[]}
 */

export const publicRoutes: string[] = [routePaths.authVerification]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in user to '/profile.
 * @type — {string[]}
 */
export const authRoutes: string[] = [
  routePaths.home,
  routePaths.login,
  routePaths.createAccount,
  routePaths.authError,
  routePaths.resetPassword,
  routePaths.newPassword,
  routePaths.home,
]

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix will be used for API authentication purposes.
 * @type — {string}
 */
export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT_URL = '/profile'
