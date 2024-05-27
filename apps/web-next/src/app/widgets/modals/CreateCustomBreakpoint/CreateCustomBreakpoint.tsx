import { FC, useContext, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Modal from '@/app/components/Modal/Modal'
import ModalContainer from '@/app/components/ModalContainer/ModalContainer'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import { ModalContext } from '@/app/builder/widgets/Builder/ModalContext'
import { useGraph, useGraphFields } from '@graph-state/react'
import { MODAL_TYPE, modalStore } from '@/app/stories/modal.store'

interface CreateCustomBreakpointProps {
  className?: string
}

export interface CreateCustomBreakpointContext {
  onAdd?: (name: string, width: number) => void
}

const NAME = 'createCustomBreakpoint'

const CreateCustomBreakpoint: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const [modal] = useGraph(modalStore, `${MODAL_TYPE}:${NAME}`)
  const [name, setName] = useState('')
  const [width, setWidth] = useState(0)

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal}>
      <ModalContainer
        title='Custom Breakpoint'
        description='Add a new custom Breakpoint. If you wish to update it, simply change its width.'
        footer={
          <>
            <Button mode='secondary' stretched onClick={close}>
              Cancel
            </Button>
            <Button stretched onClick={() => modal?.onAdd(name, width)}>
              Add
            </Button>
          </>
        }
      >
        <div className={styles.body}>
          <InputText placeholder='Name' value={name} onChange={setName} />
          <InputNumber placeholder='Width' value={width} onChange={setWidth} />
        </div>
      </ModalContainer>
    </Modal>
  )
}

export default CreateCustomBreakpoint
