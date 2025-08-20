import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Trend } from '@/__generated__/types'
import { ChipTrend } from '@/shared/ui/ChipTrend'

interface GoalsConversionInfoProps {
  goals: {
    goalId: number
    goalName: string
    trend: Trend
    currentStatistic: {
      conversion: number
    }
    prevStatistic: {
      conversion: number
    }
  }[]
  className?: string
}

export const GoalsConversionInfo: FC<GoalsConversionInfoProps> = ({ className, goals }) => {
  return (
    <div className={cn(styles.root, className)}>
      Goal Conversion for 24 hour
      <div className={styles.body}>
        {goals.map(goal => (
          <div key={goal.goalId} className={styles.row}>
            <div className={styles.name}>{goal.goalName}</div>
            <ChipTrend className={styles.chip} trend={goal.trend}>
              {goal.currentStatistic.conversion}%
            </ChipTrend>
          </div>
        ))}
      </div>
    </div>
  )
}
