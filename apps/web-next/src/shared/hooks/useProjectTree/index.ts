import { useMutation, useQuery } from '@apollo/client'
import { PROJECT_TREE } from './lib/projectTree'
import { DELETE_PROJECT_DIRECTORY, DELETE_PROJECT_TREE_ITEM } from './lib/deleteProjectDirectory'
import { UPDATE_PROJECT_DIRECTORY, UPDATE_PROJECT_TREE_ITEM } from './lib/updateProjectDirectory'
import { CREATE_PROJECT_DIRECTORY, CREATE_PROJECT_TREE_ITEM } from './lib/createProjectDirectory'
import { useProject } from '@/shared/hooks/useProject'
import { CREATE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectTree/lib/createProjectFragment'
import { UPDATE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectTree/lib/updateProjectFragment'

export const useProjectTree = () => {
  const { projectSlug } = useProject()

  const { data } = useQuery(PROJECT_TREE, {
    variables: {
      projectSlug
    }
  })
  const projectTree = data?.directory

  const [createProjectDirectory] = useMutation(CREATE_PROJECT_DIRECTORY)
  const [updateProjectDirectory] = useMutation(UPDATE_PROJECT_DIRECTORY)
  const [deleteProjectDirectory] = useMutation(DELETE_PROJECT_DIRECTORY)

  const [createProjectFragment] = useMutation(CREATE_PROJECT_FRAGMENT)
  const [updateProjectFragment] = useMutation(UPDATE_PROJECT_FRAGMENT)
  // const [deleteProjectDirectory] = useMutation(DELETE_PROJECT_DIRECTORY)

  return {
    projectSlug,
    projectTree,
    createProjectDirectory,
    updateProjectDirectory,
    deleteProjectDirectory,

    createProjectFragment,
    updateProjectFragment
  }
}
