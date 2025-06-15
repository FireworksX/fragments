'use client'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSection } from '@/components/InfoSection'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { InputText } from '@/shared/ui/InputText'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { useProject } from '@/shared/hooks/useProject'
import { useUpdateProjectInfoMutation } from '@/views/ProjectSettingsGeneral/queries/UpdateProjectInfo.generated'
import { Button } from '@/shared/ui/Button'
import CheckIcon from '@/shared/icons/next/check.svg'
import { Table } from '@/shared/ui/Table'
import { TableRow } from '@/shared/ui/Table/components/TableRow'
import { TableHeader } from '@/shared/ui/Table/components/TableHeader'
import { times } from '@fragmentsx/utils'
import { PageHeading } from '@/shared/ui/PageHeading/PageHeading'
import { TableCell } from '@/shared/ui/Table/components/TableCell'

interface UsersGeneralProps {
  className?: string
}

export const UsersGeneral: FC<UsersGeneralProps> = ({ className }) => {
  const { project, projectSlug } = useProject()
  const [localName, setLocalName] = useState('')

  const [updateProject, { loading: isUpdatingProject }] = useUpdateProjectInfoMutation()

  const handleSaveRename = () => {
    if (localName !== project?.name) {
      updateProject({
        variables: {
          projectSlug,
          name: localName
        }
      })
      setLocalName('')
    }
  }

  return (
    <div className={cn(styles.root, className)}>
      <PageHeading description='A catalog of identified persons, groups, and your created cohorts.'>Users</PageHeading>
      <Table
        header={
          <TableHeader>
            <div>ID</div>
            <div>First Visit</div>
            <div>Last Visit</div>
            <div>Goals</div>
            <div>Experiments</div>
          </TableHeader>
        }
      >
        {times(30).map(() => (
          <TableRow>
            <TableCell>Hr32v2fe</TableCell>
            <TableCell>11.07.2024</TableCell>
            <TableCell>15.05.2025</TableCell>
            <TableCell>Fired 6 goals</TableCell>
            <TableCell>10 experiment</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  )
}
