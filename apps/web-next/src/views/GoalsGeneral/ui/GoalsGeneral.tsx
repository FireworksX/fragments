'use client'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useProject } from '@/shared/hooks/useProject'
import { Button } from '@/shared/ui/Button'
import CreateIcon from '@/shared/icons/next/plus.svg'
import { PageHeading } from '@/shared/ui/PageHeading/PageHeading'
import { Container } from '@/shared/ui/Container'
import { GoalCard } from '@/views/GoalsGeneral/components/GoalCard'
import { GoalViewModal } from '@/widgets/modals/GoalViewModal'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'
import { useGoalsListQuery } from '@/shared/api/goals/GoalsList.generated'
import { useCreateGoalMutation } from '@/shared/api/goals/CreateGoal.generated'
import { useUpdateGoalMutation } from '@/shared/api/goals/UpdateGoal.generated'
import { useDeleteGoalMutation } from '@/shared/api/goals/DeleteGoal.generated'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { SpinnerBlock } from '@/shared/ui/SpinnerBlock'
import { PeriodSelector } from '@/shared/ui/PeriodSelector'
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useGoalsStatisticsQuery } from '@/views/GoalsGeneral/queries/GoalsStatistics.generated'

interface GoalsGeneralProps {
  className?: string
}

const graphData = [
  { time: '10:00', value: 80, value2: 30 },
  { time: '11:00', value: 90, value2: 41 },
  { time: '12:00', value: 110, value2: 60 },
  { time: '13:00', value: 100, value2: 56 },
  { time: '14:00', value: 70, value2: 33 },
  { time: '15:00', value: 95, value2: 70 }
]

const GoalsGeneral: FC<GoalsGeneralProps> = ({ className }) => {
  const { open, close } = useModal()
  const { project, projectSlug } = useProject()
  const { data, loading } = useGoalsListQuery({
    variables: {
      projectSlug
    }
  })
  const goals = data?.projectGoals ?? []

  const { data: sss } = useGoalsStatisticsQuery({
    variables: {
      goalId: 12
    }
  })

  console.log(sss)

  const [createGoal, { loading: loadingCreate }] = useCreateGoalMutation()
  const [updateGoal] = useUpdateGoalMutation()
  const [removeGoal] = useDeleteGoalMutation()

  return (
    <Container mode='hug' className={cn(styles.root, className)}>
      <PageHeading
        description='A catalog of your project goals.'
        actions={
          <Button
            loading={loadingCreate}
            icon={<CreateIcon />}
            onClick={() =>
              open(modalNames.goalView, {
                onSubmit: goal => {
                  close()
                  createGoal({
                    variables: {
                      projectSlug,
                      ...goal
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

      <div className={styles.header}>
        <PeriodSelector period='today' />
      </div>

      <div className={styles.body}>
        {loading && <SpinnerBlock />}
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            id={goal.id}
            name={goal.name}
            code={goal.code}
            min={goal.min}
            max={goal.max}
            onEdit={() =>
              open(modalNames.goalView, {
                currentGoal: goal,
                onSubmit: nextGoal => {
                  close()

                  updateGoal({
                    variables: {
                      goalId: goal.id,
                      ...nextGoal
                    }
                  })
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

export default withModalCollector(GoalsGeneral, {
  [modalNames.goalView]: <GoalViewModal />
})
