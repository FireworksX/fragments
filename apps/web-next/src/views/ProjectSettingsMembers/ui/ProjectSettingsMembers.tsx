'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSection } from '@/components/InfoSection'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { useProject } from '@/shared/hooks/useProject'
import { Table } from '@/shared/ui/Table'
import { TableHeader } from '@/shared/ui/Table/components/TableHeader'
import { TableRow } from '@/shared/ui/Table/components/TableRow'
import { TableCell } from '@/shared/ui/Table/components/TableCell'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { Select } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { useProjectMembersQuery } from '@/shared/api/project/query/ProjectMembers.generated'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { modalNames } from '@/shared/data'
import { InviteProjectMemberModal } from '@/widgets/modals/InviteProjectMemberModal'
import { useModal } from '@/shared/hooks/useModal'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'
import { capitalize } from '@/shared/utils/capitalize'
import { useInviteProjectMemberMutation } from '@/shared/api/project/mutaion/InviteProjectMember.generated'

interface ProjectSettingsMembersProps {
  className?: string
}

const ProjectSettingsMembersBase: FC<ProjectSettingsMembersProps> = ({ className }) => {
  const { open: openModal, close: closeModal } = useModal()
  const { project, loading, projectSlug } = useProject()

  const [handleInviteMember, { loading: loadingInvite }] = useInviteProjectMemberMutation()

  const { data: membersData, refetch } = useProjectMembersQuery({
    variables: {
      projectId: projectSlug
    }
  })
  const members = membersData?.project?.at(0)?.members ?? []

  const openInviteModal = async () => {
    openModal(modalNames.inviteMember, {
      onSubmit: async member => {
        closeModal()
        await handleInviteMember({
          variables: {
            projectSlug,
            role: member.role,
            email: member.email
          }
        })

        refetch()
      }
    })
  }

  return (
    <div className={cn(styles.root, className)}>
      <InfoSection
        loading={loading}
        header={
          <InfoSectionHeader
            title='Project Members'
            description='Manage and view your coworkers and guests'
            aside={
              <Button loading={loadingInvite} icon={<PlusIcon />} onClick={openInviteModal}>
                Invite
              </Button>
            }
          />
        }
      >
        {members.map(member => (
          <InfoSectionCell className={styles.row}>
            <CommonLogo size={30} withRadius src={member.logo?.publicPath} />
            <div className={styles.userName}>{[member.firstName, member.lastName].join(' ')}</div>
            <div className={styles.userEmail}>{member.email}</div>
            <div>
              <SelectMimicry disabled>{capitalize(member.role.toLowerCase())}</SelectMimicry>
            </div>
            <div>
              <Button mode='danger-outline' icon={<RemoveIcon />} />
            </div>
          </InfoSectionCell>
        ))}
      </InfoSection>
    </div>
  )
}

export const ProjectSettingsMembers = withModalCollector(ProjectSettingsMembersBase, {
  [modalNames.inviteMember]: <InviteProjectMemberModal />
})
