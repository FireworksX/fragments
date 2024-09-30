import { useEffect } from 'react'
import { useGraph } from '@graph-state/react'
import { useParams } from 'next/navigation'
import { useMutation } from '@/shared/hooks/requests/useMutation'
import { modalStore } from '@/shared/store/modal.store'
import { requestType } from '@/shared/hooks/requests/requestConfig'
import { useRequest } from '@/shared/hooks/requests/useRequest'

export const useFragmentsTree = () => {
  const { projectSlug } = useParams()
  const { trigger, isMutating, data } = useMutation(requestType.fragmentsCreate, { projectSlug })
  const [, updateModal] = useGraph(modalStore)
  const { data: fragmentsList } = useRequest(requestType.fragmentsList, { params: { projectSlug } })

  const onCreateFragment: CreateFragmentModalContext['onCreate'] = async fragment => {
    await trigger(fragment)
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
    list: fragmentsList ?? [],
    handleCreateFragment: () => modalStore.open('createFragment', { onCreate: onCreateFragment })
  }
}
