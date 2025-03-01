import { gql } from '@/__generated__'

export const DELETE_PROJECT_FRAGMENT = gql(/* GraphQL */ `
  mutation DeleteProjectFragment($id: Int!) {
    deleteFragment(fragmentId: $id)
  }
`)
