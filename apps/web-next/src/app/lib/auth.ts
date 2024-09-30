import { jwtDecode } from 'jwt-decode'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import axiosLib from 'axios'
import { axios } from '@/shared/api/axios'
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.NEXTAUTH_JWT_AGE!) || 1209600
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        const response = await axios
          .post('/auth/login', {
            email: credentials.email,
            password: credentials.password
          })
          .catch(e => {
            console.log(e)
          })

        if (!response?.data?.user) {
          throw new Error('User not found.')
        }

        return {
          ...response.data.user,
          accessToken: response.data.access_token
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        if (session.type === 'MANUAL') {
          const { data } = await axios.get('/auth/profile')
          return { ...token, ...data }
        }

        return { ...token, ...session }
      }

      if (user) {
        return { ...token, ...user }
      }

      const { exp: accessTokenExpires } = jwtDecode(token.accessToken)

      if (!accessTokenExpires) {
        return token
      }

      const currentUnixTimestamp = Math.floor(Date.now() / 1000)
      const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires
      if (accessTokenHasExpired) {
        return await refreshAccessToken(token)
      }

      return token
    },
    async session({ session, token }) {
      if (token.error) {
        throw new Error('Refresh token has expired')
      }

      session.accessToken = token.accessToken
      session.user.name = token.name || ''
      session.user.email = token.email || ''
      session.user.email_verified_at = token.email_verified_at

      return session
    }
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetchClient({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/refresh',
      token: token.accessToken
    })

    if (!response.ok) throw response

    const refreshedAccessToken: { access_token: string } = await response.json()
    const { exp } = jwtDecode(refreshedAccessToken.access_token)

    return {
      ...token,
      accessToken: refreshedAccessToken.access_token,
      exp
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
