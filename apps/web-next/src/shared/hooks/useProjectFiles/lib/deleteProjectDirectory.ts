import { gql } from '@/__generated__'

export const DELETE_PROJECT_DIRECTORY = gql(/* GraphQL */ `
  mutation DeleteProjectDirectory($id: Int!) {
    deleteDirectory(directoryId: $id)
  }
`)
