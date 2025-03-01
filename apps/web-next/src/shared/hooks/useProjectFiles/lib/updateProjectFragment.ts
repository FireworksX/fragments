import { gql } from '@/__generated__'

export const UPDATE_PROJECT_FRAGMENT = gql(/* GraphQL */ `
  mutation UpdateProjectFragment($fragmentId: Int!, $name: String) {
    updateFragment(fg: { id: $fragmentId, name: $name }) {
      id
      name
    }
  }
`)
