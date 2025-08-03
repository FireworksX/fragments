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
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { Stepper } from '@/shared/ui/Stepper'
import { Slider } from '@/shared/ui/Slider'

interface Goal {
  name: string
  code: string
  min?: number | null
  max?: number | null
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
  const [min, setMin] = useState(currentGoal?.min ?? 0)
  const [max, setMax] = useState(currentGoal?.max ?? 0)

  const handleSubmit = () => {
    context?.onSubmit?.({ name, code, min, max })
    setName('')
    setCode('')
    setMin(0)
    setMax(0)
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
          <Button type='submit' stretched onClick={() => handleSubmit()}>
            {isEdit ? 'Edit' : 'Create'}
          </Button>
        </>
      }
    >
      <form className={styles.body}>
        <Panel>
          <ControlRow title='Name'>
            <ControlRowWide>
              <InputText placeholder='Name' value={name} autoFocus onChangeValue={setName} />
            </ControlRowWide>
          </ControlRow>
          <ControlRow title='Code'>
            <ControlRowWide>
              <InputText placeholder='Code' value={code} onChangeValue={setCode} />
            </ControlRowWide>
          </ControlRow>
          <ControlRow title='Min %'>
            <InputNumber placeholder='Min' min={0} max={100} step={0.01} value={min} onChange={setMin} />
            <Slider min={0} max={100} step={0.01} value={min} onChange={setMin} />
          </ControlRow>
          <ControlRow title='Max %'>
            <InputText placeholder='Max' min={0} max={100} step={0.01} value={max} onChange={setMax} />
            <Slider min={0} max={100} step={0.01} value={max} onChange={setMax} />
          </ControlRow>
        </Panel>
      </form>
    </ModalContainer>
  )
}
