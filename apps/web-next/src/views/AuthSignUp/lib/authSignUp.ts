import { gql } from '@/__generated__'

export const AUTH_SIGN_UP = gql(/* Graphql */ `
  mutation AuthSignUp ($email: String!, $password: String!, $firstName: String!, $lastName: String) {
    signup (email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      accessToken
      refreshToken
    }
  }
`)
