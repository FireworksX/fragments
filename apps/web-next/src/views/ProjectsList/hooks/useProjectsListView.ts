import { useEffect } from 'react'
import { useGraph } from '@graph-state/react'
import { useMutation } from '@/shared/hooks/requests/useMutation'
import { requestType } from '@/shared/hooks/requests/requestConfig'
import { useRequest } from '@/shared/hooks/requests/useRequest'
import { modalStore } from '@/shared/store/modal.store'

export const useProjectsListView = () => {
  const { trigger, isMutating, data } = useMutation(requestType.projectCreate)
  const [, updateModal] = useGraph(modalStore)
  const { data: projectsList, isLoading } = useRequest(requestType.projectList)

  const onCreateProject: CreateProjectModalContext['onCreate'] = async project => {
    await trigger(project)
    modalStore.close()
  }

  // useEffect(() => {
  //   updateModal({
  //     context: {
  //       creating: isMutating
  //     }
  //   })
  // }, [isMutating, updateModal])

  return {
    list: projectsList ?? [],
    handleCreateProject: () => modalStore.open('createProject', { onCreate: onCreateProject })
  }
}
