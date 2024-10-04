import { FC, useContext, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields } from '@graph-state/react'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { Button } from '@/shared/ui/Button'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'
import { modalStore } from '@/shared/store/modal.store'

interface CreateCustomBreakpointProps {
  className?: string
}

export interface CreateCustomBreakpointContext {
  onAdd?: (name: string, width: number) => void
}

const NAME = 'createCustomBreakpoint'

const CreateCustomBreakpoint: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const [modal] = useGraph(modalStore)
  const [name, setName] = useState('')
  const [width, setWidth] = useState(0)

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal?.name === NAME}>
      <ModalContainer
        title='Custom Breakpoint'
        description='Add a new custom Breakpoint. If you wish to update it, simply change its width.'
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button stretched onClick={() => modal?.onAdd(name, width)}>
              Add
            </Button>
          </>
        }
      >
        <div className={styles.body}>
          <InputText placeholder='Name' value={name} autoFocus onChange={setName} />
          <InputNumber placeholder='Width' value={width} onChange={setWidth} />
        </div>
      </ModalContainer>
    </Modal>
  )
}

export default CreateCustomBreakpoint
