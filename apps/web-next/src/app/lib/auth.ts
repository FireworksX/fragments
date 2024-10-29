import { jwtDecode } from 'jwt-decode'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import axiosLib from 'axios'
import { axios } from '@/shared/api/axios'
import { getClient, query } from '@/shared/api/ApolloRSCClient'
import { AUTH_LOGIN } from '@/app/queries/authLogin'
import { AUTH_SIGN_IN } from '@/shared/queries/authSignIn'
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
        console.log(credentials)
        try {
          const { data, errors } = await getClient().mutate({
            mutation: AUTH_SIGN_IN,
            variables: { email: credentials.email, password: credentials.password }
          })

          if (errors) return null

          return data?.login
        } catch (e) {
          console.log(e)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log(token, user)
      // if (trigger === 'update') {
      //   if (session.type === 'MANUAL') {
      //     const { data } = await axios.get('/auth/profile')
      //     return { ...token, ...data }
      //   }
      //
      //   return { ...token, ...session }
      // }

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
      console.log(session, token)
      if (token.error) {
        throw new Error('Refresh token has expired')
      }

      session.user = token.user
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken

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
