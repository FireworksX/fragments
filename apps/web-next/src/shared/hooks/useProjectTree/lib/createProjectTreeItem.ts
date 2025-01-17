import { gql } from '@/__generated__'

export const CREATE_PROJECT_TREE_ITEM = gql(/* GraphQL */ `
  mutation CreateProjectTreeItem($projectSlug: Int!, $name: String!, $type: FileSystemItemType!, $parentId: Int) {
    createProjectItem(projectItem: { projectId: $projectSlug, name: $name, itemType: $type, parentId: $parentId }) {
      id
      name
      itemType
    }
  }
`)
