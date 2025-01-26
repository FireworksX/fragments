import { gql } from '@/__generated__'

export const CREATE_PROJECT_DIRECTORY = gql(/* GraphQL */ `
  mutation CreateProjectDirectory($projectSlug: Int!, $name: String!, $parentId: Int) {
    createDirectory(directory: { projectId: $projectSlug, name: $name, parentId: $parentId }) {
      id
      name
    }
  }
`)
