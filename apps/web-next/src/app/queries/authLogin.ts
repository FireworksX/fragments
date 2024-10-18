import { gql } from '@/__generated__'

export const AUTH_LOGIN = gql(`
  mutation AuthLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`)
