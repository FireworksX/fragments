import { modalStore } from '@/app/store/modal.store'
import { CreateProjectModalContext } from '@/app/widgets/modals/CreateProjectModal/CreateProjectModal'
import { useMutation } from '@/app/hooks/requests/useMutation'
import { requestType } from '@/app/hooks/requests/requestConfig'
import { useGraph } from '@graph-state/react'
import { useEffect } from 'react'
import { useRequest } from '@/app/hooks/requests/useRequest'

export const useProject = () => {
  const { trigger, isMutating, data } = useMutation(requestType.projectCreate)
  const [, updateModal] = useGraph(modalStore)
  const { data: projectsList, isLoading } = useRequest(requestType.projectList)

  const onCreateProject: CreateProjectModalContext['onCreate'] = async project => {
    await trigger(project)
    modalStore.close()
  }

  useEffect(() => {
    updateModal({
      context: {
        creating: isMutating
      }
    })
  }, [isMutating, updateModal])

  return {
    list: projectsList ?? [],
    handleCreateProject: () => modalStore.open('createProject', { onCreate: onCreateProject })
  }
}
