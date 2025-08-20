'use client'
import { FC, useMemo, useState } from 'react'
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
import { useGoalsStatisticsQuery } from '@/views/GoalsGeneral/queries/GoalsStatistics.generated'
import { CompareInterval, useDateCompare } from '@/shared/hooks/useDateCompare'
import { useGoalsGeneral } from '@/views/GoalsGeneral/hooks/useGoalsGeneral'

interface GoalsGeneralProps {
  className?: string
}

const GoalsGeneral: FC<GoalsGeneralProps> = ({ className }) => {
  const { loadingCreate, handleCreateGoal, period, removeGoal, handleEditGoal, loading, list, setPeriod } =
    useGoalsGeneral()

  return (
    <Container mode='hug' className={cn(styles.root, className)}>
      <PageHeading
        description='A catalog of your project goals.'
        actions={
          <Button loading={loadingCreate} icon={<CreateIcon />} onClick={handleCreateGoal}>
            Create Goal
          </Button>
        }
      >
        Goals
      </PageHeading>

      <div className={styles.header}>
        <PeriodSelector period={period} onChange={setPeriod} />
      </div>

      <div className={styles.body}>
        {loading && <SpinnerBlock />}
        {list.map(goal => (
          <GoalCard
            key={goal.id}
            id={goal.id}
            name={goal.name}
            code={goal.code}
            min={goal.min}
            max={goal.max}
            statistic={goal.statistic}
            onEdit={() => handleEditGoal(goal)}
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
