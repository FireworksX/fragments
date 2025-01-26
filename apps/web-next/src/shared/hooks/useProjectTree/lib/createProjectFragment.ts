import { gql } from '@/__generated__'

export const CREATE_PROJECT_FRAGMENT = gql(/* GraphQL */ `
  mutation CreateProjectFragment($projectSlug: Int!, $name: String!, $parentId: Int) {
    createFragment(fg: { name: $name, projectId: $projectSlug, document: "{}", directoryId: $parentId }) {
      id
      name
    }
  }
`)
