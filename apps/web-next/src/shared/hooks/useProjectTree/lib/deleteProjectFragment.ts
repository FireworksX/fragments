import { gql } from '@/__generated__'

export const DELETE_PROJECT_FRAGMENT = gql(/* GraphQL */ `
  mutation DeleteProjectFragment($fragmentId: Int!) {
    deleteFragment(fragmentId: $fragmentId)
  }
`)
