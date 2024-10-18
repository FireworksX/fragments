import { gql } from '@/__generated__'

export const CURRENT_USER = gql(/* GraphQL */ `
  query CurrentProfile {
    profile {
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
