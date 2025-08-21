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
import { RoleGet } from '@/graphql/types'
import { capitalize } from '@/shared/utils/capitalize'
import { UserRole } from '@/__generated__/types'

interface Member {
  email: string
  role: UserRole
}

export interface InviteProjectMemberContext {
  onSubmit: (member: Member) => void
}

interface InviteProjectMemberModalProps {
  className?: string
}

export const InviteProjectMemberModal: FC<InviteProjectMemberModalProps> = ({ className }) => {
  const { readContext } = useModal()
  const context = readContext(modalNames.inviteMember)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>(UserRole.Manager)

  const handleSubmit = () => {
    context?.onSubmit?.({ email, role })
    setEmail('')
    setRole(UserRole.Manager)
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
              <InputText placeholder='E-mail' type='email' value={email} autoFocus onChangeValue={setEmail} />
            </ControlRowWide>
          </ControlRow>
          <ControlRow title='Role'>
            <ControlRowWide>
              <Select value={role} onChange={setRole}>
                {Object.values(UserRole)
                  .filter(role => role !== UserRole.Owner)
                  .map(role => (
                    <option value={role}>{capitalize(role.toLowerCase())}</option>
                  ))}
              </Select>
            </ControlRowWide>
          </ControlRow>
        </Panel>
      </form>
    </ModalContainer>
  )
}
