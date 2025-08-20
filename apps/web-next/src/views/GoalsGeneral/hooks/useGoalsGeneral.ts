import { useModal } from '@/shared/hooks/useModal'
import { useProject } from '@/shared/hooks/useProject'
import { useGoalsListQuery } from '@/shared/api/goals/GoalsList.generated'
import { useMemo, useState } from 'react'
import { CompareInterval, useDateCompare } from '@/shared/hooks/useDateCompare'
import { useGoalsStatisticsQuery } from '@/views/GoalsGeneral/queries/GoalsStatistics.generated'
import { useCreateGoalMutation } from '@/shared/api/goals/CreateGoal.generated'
import { useUpdateGoalMutation } from '@/shared/api/goals/UpdateGoal.generated'
import { useDeleteGoalMutation } from '@/shared/api/goals/DeleteGoal.generated'
import { modalNames } from '@/shared/data'
import { GoalCardProps } from '@/views/GoalsGeneral/components/GoalCard/ui/GoalCard'
import { buildChartDataWithCompare } from '@/shared/utils/charts/buildChartDataWithCompare'
import dayjs from '@/shared/lib/dayjs'
import { Detalization } from '@/__generated__/types'

const today = [
  {
    __typename: 'DetalizationGraphPoint',
    time: '2025-08-05T08:00:00',
    value: {
      __typename: 'Value',
      conversion: 50,
      achieved: 4,
      views: 10
    }
  },
  {
    __typename: 'DetalizationGraphPoint',
    time: '2025-08-05T12:00:00',
    value: {
      __typename: 'Value',
      conversion: 120,
      achieved: 10,
      views: 18
    }
  },
  {
    __typename: 'DetalizationGraphPoint',
    time: '2025-08-05T16:00:00',
    value: {
      __typename: 'Value',
      conversion: 300,
      achieved: 25,
      views: 30
    }
  },
  {
    __typename: 'DetalizationGraphPoint',
    time: '2025-08-05T20:00:00',
    value: {
      __typename: 'Value',
      conversion: 70,
      achieved: 5,
      views: 12
    }
  }
]

const yeartodat = [
  {
    __typename: 'DetalizationGraphPoint',
    time: '2025-08-04T08:00:00',
    value: {
      __typename: 'Value',
      conversion: 40,
      achieved: 3,
      views: 9
    }
  },
  {
    __typename: 'DetalizationGraphPoint',
    time: '2025-08-04T9:10:00',
    value: {
      __typename: 'Value',
      conversion: 49,
      achieved: 8,
      views: 15
    }
  },
  {
    __typename: 'DetalizationGraphPoint',
    time: '2025-08-04T17:30:00',
    value: {
      __typename: 'Value',
      conversion: 214,
      achieved: 20,
      views: 25
    }
  },
  {
    __typename: 'DetalizationGraphPoint',
    time: '2025-08-04T20:50:00',
    value: {
      __typename: 'Value',
      conversion: 114,
      achieved: 6,
      views: 13
    }
  }
]

export const useGoalsGeneral = () => {
  const { open, close } = useModal()
  const { projectSlug } = useProject()
  const { data, loading } = useGoalsListQuery({
    variables: {
      projectSlug
    }
  })

  const [period, setPeriod] = useState<CompareInterval>('today')
  const dateCompare = useDateCompare(period)

  const { data: goalsStatistic } = useGoalsStatisticsQuery({
    variables: {
      goalsId: data?.projectGoals?.map(el => el.id) ?? [],
      ...dateCompare
    },
    skip: !data?.projectGoals?.length
  })

  const resultGoals = useMemo(() => {
    return (data?.projectGoals ?? []).map(goal => {
      const goalStatistic = goalsStatistic?.goalStatistic?.find(el => el.goalId === goal.id)

      const statistic: GoalCardProps['statistic'] = {
        conversion: goalStatistic?.currentStatistic?.conversion,
        views: goalStatistic?.currentStatistic?.views,
        achieved: goalStatistic?.currentStatistic?.achieved,
        points: buildChartDataWithCompare({
          current: {
            from: dayjs(dateCompare.fromTs).valueOf(),
            to: dayjs(dateCompare.toTs).valueOf(),
            points: (goalStatistic?.currentGroupByDate.points ?? []).map(point => ({
              time: dayjs(point.time).valueOf(),
              value: point.value?.conversion
            })),
            detalization: Detalization.Hour
          },
          prev: {
            from: dayjs(dateCompare.prevFromTs).valueOf(),
            to: dayjs(dateCompare.prevToTs).valueOf(),
            points: (goalStatistic?.prevGroupByDate.points ?? []).map(point => ({
              time: dayjs(point.time).valueOf(),
              value: point.value?.conversion
            }))
          }
        })
      }

      return {
        ...goal,
        statistic
      }
    })
  }, [data?.projectGoals, dateCompare, goalsStatistic?.goalStatistic])

  console.log(resultGoals)

  const [createGoal, { loading: loadingCreate }] = useCreateGoalMutation()
  const [updateGoal] = useUpdateGoalMutation()
  const [removeGoal] = useDeleteGoalMutation()

  const handleCreateGoal = () => {
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

  const handleEditGoal = goal => {
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

  return {
    loading,
    period,
    setPeriod,
    loadingCreate,
    updateGoal,
    removeGoal,
    handleCreateGoal,
    handleEditGoal,
    list: resultGoals
  }
}
