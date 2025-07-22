import { useGoalsListQuery } from '@/shared/api/goals/GoalsList.generated'
import { useProject } from '@/shared/hooks/useProject'

export const useStackGoals = () => {
  const { projectSlug } = useProject()
  const { data } = useGoalsListQuery({
    variables: {
      projectSlug
    }
  })
  const list = data?.projectGoals ?? []

  return {
    list
  }
}
