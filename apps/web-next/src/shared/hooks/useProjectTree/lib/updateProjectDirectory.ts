import { gql } from '@/__generated__'

export const UPDATE_PROJECT_DIRECTORY = gql(/* GraphQL */ `
  mutation UpdateProjectDirectory($directoryId: Int!, $name: String) {
    updateDirectory(directory: { id: $directoryId, name: $name }) {
      id
      name
    }
  }
`)
