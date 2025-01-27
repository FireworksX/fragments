import { gql } from '@/__generated__'

export const PROJECT_DIRECTORY = gql(/* GraphQL */ `
  query ProjectDirectory($projectSlug: Int!, $directoryId: Int) {
    directory(projectId: $projectSlug, directoryId: $directoryId) {
      id
      name
      empty
      parentId
      fragments {
        id
        name
      }
    }
  }
`)
