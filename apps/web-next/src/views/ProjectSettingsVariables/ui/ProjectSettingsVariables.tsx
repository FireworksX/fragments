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
import { ScopeVariables } from '@/widgets/ScopeVariables'

interface ProjectSettingsVariablesProps {
  className?: string
}

export const ProjectSettingsVariables: FC<ProjectSettingsVariablesProps> = ({ className }) => {
  const { properties, updateProperties } = useProject()

  return (
    <div className={cn(styles.root, className)}>
      <ScopeVariables loading={false} properties={properties} onChange={updateProperties} />
    </div>
  )
}
