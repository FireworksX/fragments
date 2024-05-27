import { FC, useContext, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Modal from '@/app/components/Modal/Modal'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import ModalContainer from '@/app/components/ModalContainer/ModalContainer'
import { ModalContext } from '@/app/builder/widgets/Builder/ModalContext'

interface CreateComponentModalProps {
  className?: string
}

export interface CreateComponentContext {
  onCreate?: (name: string) => void
}

const NAME = 'createComponent'

const CreateComponentModal: FC<CreateComponentModalProps> = ({ className }) => {
  const { close, name: modalName, context } = useContext(ModalContext)
  const [name, setName] = useState('')

  return (
    <Modal className={cn(styles.root, className)} isOpen={name === NAME}>
      <ModalContainer
        title='Create Component'
        description='Components can be edited in their own canvas. Double-click on any instance to add visual variants and interactions.'
        footer={
          <>
            <Button mode='secondary' stretched onClick={close}>
              Cancel
            </Button>
            <Button stretched onClick={() => context?.onCreate(name)}>
              Create
            </Button>
          </>
        }
      >
        <InputText value={name} onChange={setName} />
      </ModalContainer>
    </Modal>
  )
}

export default CreateComponentModal
