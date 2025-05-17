'use client'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useProject } from '@/shared/hooks/useProject'
import { useUpdateProjectInfoMutation } from '@/views/ProjectSettingsGeneral/queries/UpdateProjectInfo.generated'
import { Button } from '@/shared/ui/Button'
import CreateIcon from '@/shared/icons/next/plus.svg'
import { PageHeading } from '@/shared/ui/PageHeading/PageHeading'
import { Container } from '@/shared/ui/Container'
import { GoalCard } from '@/views/GoalsGeneral/components/GoalCard'
import { GoalViewModal } from '@/widgets/modals/GoalViewModal'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'

interface GoalsGeneralProps {
  className?: string
}

export const GoalsGeneral: FC<GoalsGeneralProps> = ({ className }) => {
  const { openModal } = useModal()
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
    <Container mode='hug' className={cn(styles.root, className)}>
      <GoalViewModal />
      <PageHeading
        description='A catalog of your project goals.'
        actions={
          <Button
            icon={<CreateIcon />}
            onClick={() =>
              openModal(modalNames.goalView, {
                onSubmit: goal => {
                  console.log(goal)
                }
              })
            }
          >
            Create Goal
          </Button>
        }
      >
        Goals
      </PageHeading>

      <GoalCard></GoalCard>
    </Container>
  )
}
