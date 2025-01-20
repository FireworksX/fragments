import { gql } from '@/__generated__'

export const DELETE_PROJECT_TREE_ITEM = gql(/* GraphQL */ `
  mutation DeleteProjectTreeItem($projectItemId: Int!) {
    deleteProjectItem(projectItemId: $projectItemId)
  }
`)
