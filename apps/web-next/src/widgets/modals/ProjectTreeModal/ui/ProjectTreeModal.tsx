import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { useGraph } from '@graph-state/react'
import { modalNames } from '@/shared/data'
import { ProjectTree } from '@/widgets/ProjectTree'
import { useModal } from '@/shared/hooks/useModal'
import { ProjectTreeItem } from '@/widgets/ProjectTree/ui/ProjectTree'

export interface ProjectTreeModalContext {
  onSelect: (item: ProjectTreeItem) => void
}

interface ProjectTreeModalProps {
  className?: string
}

export const ProjectTreeModal: FC<ProjectTreeModalProps> = ({ className }) => {
  const { readContext } = useModal()
  const context = readContext(modalNames.projectTree)

  return (
    <ModalContainer
      title='Project Tree'
      description='Select the fragment you need. You can also organize them into folders or create new ones.'
      width={300}
    >
      <ProjectTree onClick={context.onSelect} />
    </ModalContainer>
  )
}
