import { FC, PropsWithChildren, useContext } from 'react'
import ModalComp from 'react-modal'
// todo: fsd
import { modalStore } from '@/app/store/modal.store'

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
