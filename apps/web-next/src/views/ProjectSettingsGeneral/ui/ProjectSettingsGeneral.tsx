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

interface ProjectSettingsGeneralProps {
  className?: string
}

export const ProjectSettingsGeneral: FC<ProjectSettingsGeneralProps> = ({ className }) => {
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
      <InfoSection
        header={<InfoSectionHeader title='Project Settings' description='Configure core application settings.' />}
      >
        <InfoSectionCell
          title='Project name'
          description='Customize the name of your application. Used in the dashboard and with Clerk components.'
        >
          <div className={styles.row}>
            <InputText value={localName || project?.name} onChangeValue={setLocalName} />
            <Button disabled={localName.length === 0} loading={isUpdatingProject} onClick={handleSaveRename}>
              Update
            </Button>
          </div>
        </InfoSectionCell>
        <InfoSectionCell title='Project logo' description='You can upload .jpeg, .png, .gif, or .webp files.'>
          <InputText />
        </InfoSectionCell>
      </InfoSection>
    </div>
  )
}
