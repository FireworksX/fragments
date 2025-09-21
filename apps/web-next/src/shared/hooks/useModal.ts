import { useGraph } from '@graph-state/react'
import { useContext } from 'react'
import { ModalStoreContext } from '@/widgets/ModalCollector/ui/ModalCollector'

export const useModal = () => {
  const modalStore = useContext(ModalStoreContext)

  return modalStore!
}
