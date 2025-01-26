import { gql } from '@/__generated__'

export const PROJECT_TREE = gql(/* GraphQL */ `
  query ProjectTree($projectSlug: Int!) {
    directory(projectId: $projectSlug) {
      id
      name
      directories {
        id
        name
      }
      fragments {
        id
        name
      }
    }
  }
`)
