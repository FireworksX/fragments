import { withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { authMiddleware } from '@/middleware/authMiddleware'

export default withAuth(
  async (...args) => {
    return await authMiddleware(...args)
  },
  {
    callbacks: {
      async authorized() {
        return true
      }
    }
  }
)

export const config = { matcher: ['/project/:path*'] }
