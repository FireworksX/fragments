import { gql } from '@/__generated__'

export const PROJECT_DIRECTORY_FRAGMENT = gql(/* GraphQL */ `
  fragment Directory on ProjectDirectoryGet {
    id
    parentId
    name
    hasSubdirectories
    directories {
      id
      parentId
      name
    }
    fragments {
      id
      name
    }
  }
`)

export const PROJECT_DIRECTORY = gql(/* GraphQL */ `
  query ProjectDirectory($projectSlug: Int!, $directoryId: Int) {
    directory(projectId: $projectSlug, directoryId: $directoryId) {
      id
      parentId
      name
      hasSubdirectories
      directories {
        id
        parentId
        name
      }
      fragments {
        id
        name
      }
    }
  }
`)
