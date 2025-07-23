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
import { useModal } from '@/shared/hooks/useModal'

interface Goal {
  name: string
  code: string
}

export interface GoalViewModalContext {
  currentGoal?: Goal
  onSubmit: (goal: Goal) => void
}

interface GoalViewModalProps {
  className?: string
}

export const GoalViewModal: FC<GoalViewModalProps> = ({ className }) => {
  const { readContext } = useModal()
  const context = readContext(modalNames.goalView)
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
    <ModalContainer
      width={300}
      title={isEdit ? 'Goal View' : 'Create Goal'}
      footer={
        <>
          <Button mode='secondary' stretched onClick={modalStore.close}>
            Cancel
          </Button>
          <Button type='submit' stretched onClick={() => handleSubmit({ name, code })}>
            {isEdit ? 'Edit' : 'Create'}
          </Button>
        </>
      }
    >
      <form className={styles.body}>
        <InputText placeholder='Name' value={name} autoFocus onChangeValue={setName} />
        <InputText placeholder='Code' value={code} onChangeValue={setCode} />
      </form>
    </ModalContainer>
  )
}
