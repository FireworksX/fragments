import { FC, PropsWithChildren, useContext } from 'react'
import ModalComp from 'react-modal'

interface ModalProps extends PropsWithChildren {
  isOpen?: boolean
  className?: string
  onClose?: () => void
}

const Modal: FC<ModalProps> = ({ className, children, isOpen = false, onClose }) => {
  return (
    <ModalComp
      className={className}
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName='modalOverlay'
      onRequestClose={onClose}
    >
      {children}
    </ModalComp>
  )
}

export default Modal
