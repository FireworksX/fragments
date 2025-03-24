import { gql } from '@apollo/client'

export const PROJECT_TREE_DIRECTORY_FRAGMENT = gql`
  fragment DirectoryTreeItem on ProjectDirectoryGet {
    name
    parentId
    hasSubdirectories
    hasFragments
  }
`

export const PROJECT_TREE_FRAGMENT_FRAGMENT = gql`
  fragment FragmentTreeItem on FragmentGet {
    name
  }
`
