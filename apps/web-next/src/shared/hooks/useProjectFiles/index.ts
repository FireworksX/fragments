import { useProject } from '@/shared/hooks/useProject'
import { useCreateProjectDirectoryMutation } from './queries/CreateProjectDirectory.generated'
import { useUpdateProjectDirectoryMutation } from './queries/UpdateProjectDirectory.generated'
import { useDeleteProjectDirectoryMutation } from './queries/DeleteProjectDirectory.generated'
import {
  CreateProjectFragmentMutationVariables,
  useCreateProjectFragmentMutation
} from './queries/CreateProjectFragment.generated'
import { useUpdateProjectFragmentMutation } from './queries/UpdateProjectFragment.generated'
import { useDeleteProjectFragmentMutation } from './queries/DeleteProjectFragment.generated'
import { useProjectDirectoryQuery } from './queries/ProjectDirectory.generated'
import { useCallback } from 'react'
import { getEmptyFragment } from '@/shared/hooks/useProjectFiles/emptyFragment'
import { generateId } from '@fragmentsx/utils'

export const useProjectFiles = () => {
  const { projectSlug, project } = useProject()

  const { data, loading: fetchingProjectDirectory } = useProjectDirectoryQuery({
    variables: {
      directoryId: project?.rootDirectoryId
    }
  })

  const [createProjectDirectory] = useCreateProjectDirectoryMutation()
  const [updateProjectDirectory] = useUpdateProjectDirectoryMutation()
  const [deleteProjectDirectory] = useDeleteProjectDirectoryMutation()

  const [createProjectFragment] = useCreateProjectFragmentMutation()
  const [updateProjectFragment] = useUpdateProjectFragmentMutation()
  const [deleteProjectFragment] = useDeleteProjectFragmentMutation()

  const proxyCreateProjectFragment = useCallback(
    ({ variables }: { variables: Omit<CreateProjectFragmentMutationVariables, 'document'> }) => {
      return createProjectFragment({
        variables: {
          ...variables,
          document: getEmptyFragment(generateId())
        }
      })
    },
    [createProjectFragment]
  )

  return {
    projectSlug,
    rootDirectoryId: project?.rootDirectoryId,
    directories: data?.directory ?? [],
    fetchingProjectDirectory,

    createProjectDirectory,
    updateProjectDirectory,
    deleteProjectDirectory,

    createProjectFragment: proxyCreateProjectFragment,
    updateProjectFragment,
    deleteProjectFragment
  }
}
