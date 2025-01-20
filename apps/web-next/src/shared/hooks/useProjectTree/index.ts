import { useMutation, useQuery } from '@apollo/client'
import { PROJECT_TREE } from './lib/projectTree'
import { DELETE_PROJECT_TREE_ITEM } from './lib/deleteProjectTreeItem'
import { UPDATE_PROJECT_TREE_ITEM } from './lib/updateProjectTreeItem'
import { CREATE_PROJECT_TREE_ITEM } from './lib/createProjectTreeItem'
import { useProject } from '@/shared/hooks/useProject'

export const useProjectTree = () => {
  const { projectSlug } = useProject()

  const { data } = useQuery(PROJECT_TREE, {
    variables: {
      projectSlug
    }
  })
  const projectTree = data?.projectItem

  const [createProjectTreeItem] = useMutation(CREATE_PROJECT_TREE_ITEM)
  const [updateProjectTreeItem] = useMutation(UPDATE_PROJECT_TREE_ITEM)
  const [deleteProjectTreeItem] = useMutation(DELETE_PROJECT_TREE_ITEM)

  return {
    projectSlug,
    projectTree,
    createProjectTreeItem,
    updateProjectTreeItem,
    deleteProjectTreeItem
  }
}
