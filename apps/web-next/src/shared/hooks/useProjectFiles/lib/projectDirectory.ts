import { gql } from '@/__generated__'

export const PROJECT_DIRECTORY = gql(/* GraphQL */ `
  query ProjectDirectory($directoryId: Int!) {
    directory(directoryId: $directoryId) {
      id
      parentId
      name
      hasSubdirectories
      hasFragments
      fragments {
        id
        name
      }
    }
  }
`)
