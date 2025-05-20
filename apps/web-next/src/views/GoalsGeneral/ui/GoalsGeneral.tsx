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
import { useGoalsListQuery } from '@/views/GoalsGeneral/queries/GoalsList.generated'
import { useCreateGoalMutation } from '@/views/GoalsGeneral/queries/CreateGoal.generated'
import { useUpdateGoalMutation } from '@/views/GoalsGeneral/queries/UpdateGoal.generated'
import { useDeleteGoalMutation } from '@/views/GoalsGeneral/queries/DeleteGoal.generated'

interface GoalsGeneralProps {
  className?: string
}

export const GoalsGeneral: FC<GoalsGeneralProps> = ({ className }) => {
  const { openModal, closeModal } = useModal()
  const { project, projectSlug } = useProject()
  const { data } = useGoalsListQuery({
    variables: {
      projectSlug
    }
  })
  const goals = data?.projectGoals ?? []

  const [createGoal, { loading: loadingCreate }] = useCreateGoalMutation()
  const [updateGoal] = useUpdateGoalMutation()
  const [removeGoal] = useDeleteGoalMutation()

  return (
    <Container mode='hug' className={cn(styles.root, className)}>
      <GoalViewModal />
      <PageHeading
        description='A catalog of your project goals.'
        actions={
          <Button
            loading={loadingCreate}
            icon={<CreateIcon />}
            onClick={() =>
              openModal(modalNames.goalView, {
                onSubmit: goal => {
                  closeModal()
                  createGoal({
                    variables: {
                      projectSlug,
                      name: goal.name,
                      code: goal.code
                    }
                  })
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

      <div className={styles.body}>
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            id={goal.id}
            name={goal.name}
            code={goal.code}
            onEdit={updatedGoal =>
              updateGoal({
                variables: {
                  goalId: goal.id,
                  ...updatedGoal
                }
              })
            }
            onRemove={() =>
              removeGoal({
                variables: {
                  id: goal.id
                }
              })
            }
          ></GoalCard>
        ))}
      </div>
    </Container>
  )
}
