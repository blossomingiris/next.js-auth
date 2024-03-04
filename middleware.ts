import NextAuth from 'next-auth'

import authConfig from './auth.config'
import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  routePaths,
} from './routes/routes'

const { auth } = NextAuth(authConfig)

// @ts-expect-error: check https://github.com/nextauthjs/next-auth/issues/7569
export default auth(req => {
  const { nextUrl } = req
  const isUserLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isUserLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
    }
    return null
  }

  if (!isUserLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(routePaths.login, nextUrl))
  }

  return null
})

// 'auth' middleware wont't be invoked on following paths:
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
