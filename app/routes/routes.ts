export const routePaths = {
  home: '/',
  login: '/auth/login',
  createAccount: '/auth/signup',
  forgotPassword: '/auth/forgot-password',
  authVerification: '/auth/new-verification',
  authError: '/auth/error',
  resetPassword: '/auth/reset-password',
  newPassword: '/auth/new-password',
  settings: 'settings',
}
/**
 * An array of routes that do not require authentication.
 * @type — {string[]}
 */

export const publicRoutes: string[] = [
  routePaths.home,
  routePaths.authVerification,
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in user to '/settings.
 * @type — {string[]}
 */
export const authRoutes: string[] = [
  routePaths.login,
  routePaths.createAccount,
  routePaths.authError,
  routePaths.resetPassword,
  routePaths.newPassword,
]

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix will be used for API authentication purposes.
 * @type — {string}
 */
export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT_URL = '/settings'
