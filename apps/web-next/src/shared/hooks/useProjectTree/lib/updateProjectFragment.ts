import { gql } from '@/__generated__'

export const UPDATE_PROJECT_FRAGMENT = gql(/* GraphQL */ `
  mutation UpdateProjectFragment($fragmentId: Int!, $name: String, $projectId: Int!) {
    updateFragment(fg: { id: $fragmentId, projectId: $projectId, name: $name }) {
      id
      name
    }
  }
`)
