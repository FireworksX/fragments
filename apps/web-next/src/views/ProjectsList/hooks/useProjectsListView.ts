import { useEffect } from 'react'
import { useGraph } from '@graph-state/react'
import { requestType } from '@/shared/hooks/requests/requestConfig'
import { useRequest } from '@/shared/hooks/requests/useRequest'
import { modalStore } from '@/shared/store/modal.store'
import { getSession } from 'next-auth/react'
import { modalNames } from '@/shared/data'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_PROJECT } from '@/views/ProjectsList/lib/createProject'
import { PROJECTS_LIST } from '@/views/ProjectsList/lib/projectsList'

export const useProjectsListView = () => {
  const [, updateModal] = useGraph(modalStore, modalStore.key)
  const [executeCreateProject, createProjectData] = useMutation(CREATE_PROJECT)
  const { data } = useQuery(PROJECTS_LIST)

  const onCreateProject: CreateProjectModalContext['onCreate'] = async project => {
    await executeCreateProject({
      variables: {
        name: project.name
      }
    })
    modalStore.close()
  }

  useEffect(() => {
    updateModal({
      context: {
        creating: createProjectData.loading
      }
    })
  }, [createProjectData.loading, updateModal])

  return {
    list: data?.project ?? [],
    handleCreateProject: () => modalStore.open(modalNames.createProject, { onCreate: onCreateProject }),
    createLoading: createProjectData.loading
  }
}