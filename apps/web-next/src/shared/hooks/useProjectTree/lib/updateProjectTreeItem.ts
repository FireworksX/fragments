import { gql } from '@/__generated__'

export const UPDATE_PROJECT_TREE_ITEM = gql(/* GraphQL */ `
  mutation UpdateProjectTreeItem($projectItemId: Int!, $name: String) {
    updateProjectItem(projectItem: { id: $projectItemId, name: $name }) {
      id
      name
    }
  }
`)
