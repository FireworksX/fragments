import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const authRoutes = ['/project']
const verifyRoutes = ['/request-email-verification', '/verify-email']
const guestRoutes = ['/forgot-password', '/login', '/password-reset', '/register']

export async function authMiddleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isIndexpage = request.nextUrl.pathname === '/'
  const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  const isVerifyRoute = verifyRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  const isGuestRoute = guestRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  if (!token && (isAuthRoute || isVerifyRoute)) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href)
    return NextResponse.redirect(redirectUrl)
  }

  if (token) {
    // if (!token.email_verified_at && !isVerifyRoute) {
    //   return NextResponse.redirect(new URL('/request-email-verification', request.url))
    // }

    if (isIndexpage || isGuestRoute || isVerifyRoute) {
      return NextResponse.redirect(new URL('/project', request.url))
    }
  }
}
