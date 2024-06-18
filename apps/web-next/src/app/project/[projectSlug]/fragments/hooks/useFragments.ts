import { modalStore } from '@/app/store/modal.store'
import { CreateFragmentModalContext } from '@/app/widgets/modals/CreateFragmentModal/CreateFragmentModal'
import { useMutation } from '@/app/hooks/requests/useMutation'
import { requestType } from '@/app/hooks/requests/requestConfig'
import { useGraph } from '@graph-state/react'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRequest } from '@/app/hooks/requests/useRequest'

export const useFragments = () => {
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
