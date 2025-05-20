import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { useGraph } from '@graph-state/react'
import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { ProjectTree } from '@/widgets/ProjectTree'
import { Button } from '@/shared/ui/Button'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'

interface GoalViewModalProps {
  className?: string
}

export const GoalViewModal: FC<GoalViewModalProps> = ({ className }) => {
  const [modal] = useGraph(modalStore, modalStore.key)
  const context = modal?.context
  const currentGoal = context?.currentGoal
  const isEdit = !!currentGoal
  const [name, setName] = useState(currentGoal?.name ?? '')
  const [code, setCode] = useState(currentGoal?.code ?? '')

  const handleSubmit = ({ name, code }) => {
    context?.onSubmit?.({ name, code })
    setName('')
    setCode('')
  }

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal.name === modalNames.goalView}>
      <ModalContainer
        title={isEdit ? 'Goal View' : 'Create Goal'}
        footer={
          <>
            <Button mode='secondary' stretched onClick={modalStore.close}>
              Cancel
            </Button>
            <Button stretched onClick={() => handleSubmit({ name, code })}>
              {isEdit ? 'Edit' : 'Create'}
            </Button>
          </>
        }
      >
        <div className={styles.body}>
          <InputText placeholder='Name' value={name} autoFocus onChangeValue={setName} />
          <InputText placeholder='Code' value={code} onChangeValue={setCode} />
        </div>
      </ModalContainer>
    </Modal>
  )
}
