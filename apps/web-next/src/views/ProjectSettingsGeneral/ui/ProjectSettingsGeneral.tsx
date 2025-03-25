import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSection } from '@/components/InfoSection'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { InputText } from '@/shared/ui/InputText'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'

interface ProjectSettingsGeneralProps {
  className?: string
}

export const ProjectSettingsGeneral: FC<ProjectSettingsGeneralProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <InfoSection
        header={<InfoSectionHeader title='Project Settings' description='Configure core application settings.' />}
      >
        <InfoSectionCell
          title='Project name'
          description='Customize the name of your application. Used in the dashboard and with Clerk components.'
        >
          <InputText />
        </InfoSectionCell>
        <InfoSectionCell title='Project logo' description='You can upload .jpeg, .png, .gif, or .webp files.'>
          <InputText />
        </InfoSectionCell>
      </InfoSection>
    </div>
  )
}
