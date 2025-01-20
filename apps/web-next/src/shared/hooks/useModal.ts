import { useGraph } from '@graph-state/react'
import { modalStore } from '@/shared/store/modal.store'

export const useModal = () => {
  const [modal] = useGraph(modalStore, modalStore.key)

  return {
    modal,
    openModal: modalStore.open,
    closeModal: modalStore.close,
    updateContext: modalStore.updateContext
  }
}
