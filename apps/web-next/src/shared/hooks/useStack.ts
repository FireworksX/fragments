import { useContext } from 'react'
import { ModalStoreContext } from '@/widgets/ModalCollector/ui/ModalCollector'
import { StackStoreContext } from '@/widgets/StackCollector'

export const useStack = () => {
  const store = useContext(StackStoreContext)
  return store!
}
