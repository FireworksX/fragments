import { gql } from '@/__generated__'

export const authLogin = () =>
  gql(/* Graphql */ `
    mutation AuthLogin($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
        refreshToken
      }
    }
`)
