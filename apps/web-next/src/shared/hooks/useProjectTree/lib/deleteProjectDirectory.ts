import { gql } from '@/__generated__'

export const DELETE_PROJECT_DIRECTORY = gql(/* GraphQL */ `
  mutation DeleteProjectDirectory($directoryId: Int!) {
    deleteDirectory(directoryId: $directoryId)
  }
`)
