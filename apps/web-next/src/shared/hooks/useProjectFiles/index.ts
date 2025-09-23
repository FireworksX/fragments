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
import { useDuplicateProjectFragmentMutation } from '@/shared/hooks/useProjectFiles/queries/DuplicateProjectFragment.generated'

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

  const [duplicateProjectFragment, { loading: duplicateFragmentLoading }] = useDuplicateProjectFragmentMutation()
  const [createProjectFragment, { loading: createFragmentLoading }] = useCreateProjectFragmentMutation()
  const [updateProjectFragment, { loading: updateFragmentLoading }] = useUpdateProjectFragmentMutation()
  const [deleteProjectFragment, { loading: deleteFragmentLoading }] = useDeleteProjectFragmentMutation()

  const proxyCreateProjectFragment = useCallback(
    async ({
      variables,
      templateId
    }: {
      variables: Pick<CreateProjectFragmentMutationVariables, 'name' | 'parentId'>
      templateId?: number | null
    }) => {
      const name = !!variables?.name?.length ? variables?.name : 'Untitled'

      if (templateId) {
        const result = await duplicateProjectFragment({
          variables: {
            projectSlug,
            name,
            parentId: variables?.parentId ?? project?.rootDirectoryId,
            id: templateId
          }
        })

        return result.data?.cloneFragment
      }

      const result = await createProjectFragment({
        variables: {
          name,
          projectSlug,
          parentId: variables?.parentId ?? project?.rootDirectoryId,
          document: getEmptyFragment(generateId())
        }
      })

      return result.data?.createFragment
    },
    [createProjectFragment, project]
  )

  return {
    projectSlug,

    loading: {
      createFragmentLoading,
      updateFragmentLoading,
      deleteFragmentLoading,
      duplicateFragmentLoading
    },

    rootDirectoryId: project?.rootDirectoryId,
    directories: data?.directory ?? [],
    fetchingProjectDirectory,

    createProjectDirectory,
    updateProjectDirectory,
    deleteProjectDirectory,

    createProjectFragment: proxyCreateProjectFragment,
    updateProjectFragment,
    duplicateProjectFragment,
    deleteProjectFragment
  }
}
