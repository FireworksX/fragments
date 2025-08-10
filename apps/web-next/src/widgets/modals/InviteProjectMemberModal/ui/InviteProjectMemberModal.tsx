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
import { Select } from '@/shared/ui/Select'

interface Member {
  email: string
  role: unknown
}

export interface InviteProjectMemberContext {
  onSubmit: (member: Member) => void
}

interface InviteProjectMemberModalProps {
  className?: string
}

export const InviteProjectMemberModal: FC<InviteProjectMemberModalProps> = ({ className }) => {
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
      title='Invite member'
      footer={
        <>
          <Button mode='secondary' stretched onClick={modalStore.close}>
            Cancel
          </Button>
          <Button type='submit' stretched onClick={() => handleSubmit()}>
            Invite
          </Button>
        </>
      }
    >
      <form className={styles.body}>
        <Panel>
          <ControlRow title='E-mail'>
            <ControlRowWide>
              <InputText placeholder='E-mail' type='email' value={name} autoFocus onChangeValue={setName} />
            </ControlRowWide>
          </ControlRow>
          <ControlRow title='Role'>
            <ControlRowWide>
              <Select value={'guest'}>
                <option>guest</option>
              </Select>
            </ControlRowWide>
          </ControlRow>
        </Panel>
      </form>
    </ModalContainer>
  )
}
