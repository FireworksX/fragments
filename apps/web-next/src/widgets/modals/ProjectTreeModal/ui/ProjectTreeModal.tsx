import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Modal } from '@/shared/ui/Modal'
import { ModalContainer } from '@/shared/ui/ModalContainer'
import { useGraph } from '@graph-state/react'
import { modalStore } from '@/shared/store/modal.store'
import { modalNames } from '@/shared/data'
import { ProjectTree } from '@/widgets/ProjectTree'
import { useModal } from '@/shared/hooks/useModal'

interface ProjectTreeModalProps {
  className?: string
}

export const ProjectTreeModal: FC<ProjectTreeModalProps> = ({ className }) => {
  const { modal } = useModal()
  const context = modal?.context

  return (
    <Modal className={cn(styles.root, className)} isOpen={modal.name === modalNames.projectTree}>
      <ModalContainer
        title='Project Tree'
        description='Select the fragment you need. You can also organize them into folders or create new ones.'
        onBack={context?.onBack}
        onClose={modalStore.close}
      >
        <ProjectTree onClick={context?.onClick} />
      </ModalContainer>
    </Modal>
  )
}
