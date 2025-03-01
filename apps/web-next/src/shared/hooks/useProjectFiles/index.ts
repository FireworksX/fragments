import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { PROJECT_DIRECTORY } from './lib/projectDirectory'
import { DELETE_PROJECT_DIRECTORY } from './lib/deleteProjectDirectory'
import { UPDATE_PROJECT_DIRECTORY } from './lib/updateProjectDirectory'
import { CREATE_PROJECT_DIRECTORY } from './lib/createProjectDirectory'
import { useProject } from '@/shared/hooks/useProject'
import { CREATE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectFiles/lib/createProjectFragment'
import { UPDATE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectFiles/lib/updateProjectFragment'
import { useMemo } from 'react'
import { gql } from '@/__generated__'
import { DELETE_PROJECT_FRAGMENT } from '@/shared/hooks/useProjectFiles/lib/deleteProjectFragment'

export const ROOT_DIRECTORY_ID = -1

export const useProjectFiles = () => {
  const { projectSlug, project } = useProject()

  const { data, loading: fetchingProjectDirectory } = useQuery(PROJECT_DIRECTORY, {
    variables: {
      directoryId: project?.rootDirectoryId
    }
  })

  const [createProjectDirectory] = useMutation(CREATE_PROJECT_DIRECTORY)
  const [updateProjectDirectory] = useMutation(UPDATE_PROJECT_DIRECTORY)
  const [deleteProjectDirectory] = useMutation(DELETE_PROJECT_DIRECTORY)

  const [createProjectFragment] = useMutation(CREATE_PROJECT_FRAGMENT)
  const [updateProjectFragment] = useMutation(UPDATE_PROJECT_FRAGMENT)
  const [deleteProjectFragment] = useMutation(DELETE_PROJECT_FRAGMENT)

  return {
    projectSlug,
    rootDirectoryId: project?.rootDirectoryId,
    directories: data?.directory ?? [],
    fetchingProjectDirectory,

    createProjectDirectory,
    updateProjectDirectory,
    deleteProjectDirectory,

    createProjectFragment,
    updateProjectFragment,
    deleteProjectFragment
  }
}
