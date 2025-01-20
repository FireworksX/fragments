import { gql } from '@/__generated__'

export const PROJECT_TREE = gql(/* GraphQL */ `
  query ProjectTree($projectSlug: Int!) {
    projectItem(projectId: $projectSlug) {
      id
      name
      itemType
    }
  }
`)
