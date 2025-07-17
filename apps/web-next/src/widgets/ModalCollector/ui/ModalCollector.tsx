import { createContext, FC, PropsWithChildren, ReactNode } from 'react'
import styles from './styles.module.css'
import { ModalStore, useModalStore } from '@/widgets/ModalCollector/hooks/useModalStore'
import { modalNames } from '@/shared/data'
import { Modal } from '@/shared/ui/Modal'

export interface ModalCollectorProps extends PropsWithChildren {
  className?: string
  modals: Partial<Record<keyof typeof modalNames, ReactNode>>
}

export const ModalStoreContext = createContext<ModalStore | null>(null)

export const ModalCollector: FC<ModalCollectorProps> = ({ className, children, modals }) => {
  const modalStore = useModalStore()

  const ModalNode = modalStore?.currentModal?.name ? modals?.[modalStore?.currentModal?.name] : null

  return (
    <ModalStoreContext.Provider value={modalStore}>
      {children}

      <Modal className={styles.modal} isOpen={!!ModalNode}>
        {ModalNode}
      </Modal>
    </ModalStoreContext.Provider>
  )
}
