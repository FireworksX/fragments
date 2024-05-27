import { FC, PropsWithChildren, useContext } from 'react'
import ModalComp from 'react-modal'
import { modalStore } from '@/app/stories/modal.store'

interface ModalProps extends PropsWithChildren {
  isOpen?: boolean
  className?: string
}

const Modal: FC<ModalProps> = ({ className, children, isOpen = false }) => {
  return (
    <ModalComp
      className={className}
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName='modalOverlay'
      onRequestClose={modalStore.close}
    >
      {children}
    </ModalComp>
  )
}

export default Modal
