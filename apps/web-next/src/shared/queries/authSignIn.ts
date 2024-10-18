import { gql } from '@/__generated__'

export const AUTH_SIGN_IN = gql(/* GraphQL */ `
  mutation AuthSignIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        firstName
        lastName
      }
      accessToken
      refreshToken
    }
  }
`)
