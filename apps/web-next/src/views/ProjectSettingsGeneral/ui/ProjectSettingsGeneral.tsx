'use client'
import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSection } from '@/components/InfoSection'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { InputText } from '@/shared/ui/InputText'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { useProject } from '@/shared/hooks/useProject'
import { Button } from '@/shared/ui/Button'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { useUploadFile } from '@/shared/hooks/useUploadFile'
import { useUpdateProjectMutation } from '@/shared/api/project/mutaion/UpdateProject.generated'
import { ProjectWhiteList } from '@/views/ProjectSettingsGeneral/widgets/ProjectWhiteList'
import { PageHeading } from '@/shared/ui/PageHeading/PageHeading'

interface ProjectSettingsGeneralProps {
  className?: string
}

export const ProjectSettingsGeneral: FC<ProjectSettingsGeneralProps> = ({ className }) => {
  const { project, loading, projectSlug } = useProject()
  const [localName, setLocalName] = useState('')
  const { loading: uploadLogoLoading, onUpload } = useUploadFile(+projectSlug, 'projectLogo')

  const [updateProject, { loading: isUpdatingProject }] = useUpdateProjectMutation()

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
        loading={loading}
        header={<InfoSectionHeader title='Project Settings' description='Configure core application settings.' />}
      >
        <InfoSectionCell
          title='Project name'
          description='Customize the name of your application. Used in the dashboard and with Clerk components.'
        >
          <div className={styles.row}>
            <InputText classNameInput={styles.input} value={localName || project?.name} onChangeValue={setLocalName} />
            <Button disabled={localName.length === 0} loading={isUpdatingProject} onClick={handleSaveRename}>
              Update
            </Button>
          </div>
        </InfoSectionCell>
        <InfoSectionCell
          title='Project logo'
          description='You can upload .jpeg, .png, .gif, or .webp files.'
          before={<CommonLogo size={60} src={project?.logo?.publicPath} withRadius />}
          after={
            <Button loading={uploadLogoLoading}>
              <label className={styles.uploadLabel}>
                <input
                  className={styles.uploadInput}
                  type='file'
                  accept='.jpg,.png,.gif'
                  onChange={({ target: { files } }) => onUpload(files[0])}
                />
              </label>
              Upload logo
            </Button>
          }
        />
      </InfoSection>

      <ProjectWhiteList />
    </div>
  )
}
