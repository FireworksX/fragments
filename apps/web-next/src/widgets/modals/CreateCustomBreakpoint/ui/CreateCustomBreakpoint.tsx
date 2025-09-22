import { FC, useContext, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, useGraphFields } from '@graph-state/react'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { Button } from '@/shared/ui/Button'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'
import { modalNames } from '@/shared/data'
import { useModal } from '@/shared/hooks/useModal'

interface CreateCustomBreakpointProps {
  className?: string
}

export interface CreateCustomBreakpointContext {
  onAdd?: (name: string, width: number) => void
}

const CreateCustomBreakpoint: FC<CreateCustomBreakpointProps> = ({ className }) => {
  const { readContext, close } = useModal()
  const [name, setName] = useState('')
  const [width, setWidth] = useState(0)
  const context = readContext(modalNames.createCustomBreakpoint)

  return (
    <ModalContainer
      width={300}
      title='Custom Breakpoint'
      description='Add a new custom Breakpoint. If you wish to update it, simply change its width.'
      footer={
        <>
          <Button mode='secondary' stretched onClick={close}>
            Cancel
          </Button>
          <Button stretched onClick={() => context?.onAdd?.(name, width)}>
            Add
          </Button>
        </>
      }
    >
      <div className={styles.body}>
        <InputText placeholder='Name' value={name} autoFocus onChangeValue={setName} />
        <InputNumber placeholder='Width' zeroIsEmpty value={width} onChange={setWidth} />
      </div>
    </ModalContainer>
  )
}

export default CreateCustomBreakpoint
