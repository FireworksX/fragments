import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import EditIcon from '@/shared/icons/next/pencil.svg'
import { GoalCardChart } from '@/views/GoalsGeneral/components/GoalCardChart'
import { GoalCardChartProps } from '@/views/GoalsGeneral/components/GoalCardChart/ui/GoalCardChart'

export interface GoalCardProps {
  id: number
  name: string
  code: string
  min?: number | null
  max?: number | null
  statistic?: {
    points: GoalCardChartProps['points']
    conversion: number
    achieved: number
    views: number
  }
  className?: string
  onEdit?: () => void
  onRemove?: () => void
}

export const GoalCard: FC<GoalCardProps> = ({ className, id, statistic, min, max, name, code, onEdit, onRemove }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.info}>
        <div className={styles.infoBody}>
          <div className={styles.infoBodyInner}>
            <div className={styles.title}>
              {id}.<div className={styles.editable}>{name}</div>
            </div>

            <div className={styles.goalCode}>
              Code: <div className={styles.editable}>{code}</div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button mode='outline' icon={<EditIcon />} onClick={() => onEdit?.()} />
            <Button mode='danger-outline' icon={<RemoveIcon />} onClick={() => onRemove?.()} />
          </div>
        </div>

        {statistic && (
          <div className={styles.body}>
            <div className={styles.row}>
              <div className={cn(styles.rowName, styles.accent)}>Конверсия</div>
              <div className={styles.rowValue}>{statistic.conversion}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowName}>Достижения цели</div>
              <div className={styles.rowValue}>{statistic.achieved}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowName}>Целевые визиты</div>
              <div className={styles.rowValue}>{statistic.views}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowName}>Min/max %</div>
              {!min && !max && (
                <Button className={styles.rowButton} mode='tertiary' size='small' onClick={onEdit}>
                  Set min/max
                </Button>
              )}
              {!min && !!max && (
                <div className={styles.rowValue}>
                  <Button className={styles.rowButton} mode='tertiary' size='small' onClick={onEdit}>
                    Set min
                  </Button>{' '}
                  / {max}
                </div>
              )}
              {min && !max && (
                <div className={styles.rowValue}>
                  {min} /{' '}
                  <Button className={styles.rowButton} mode='tertiary' size='small' onClick={onEdit}>
                    Set max
                  </Button>
                </div>
              )}
              {!!min && !!max && (
                <div className={styles.rowValue}>
                  {min} / {max}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {statistic?.points && <GoalCardChart points={statistic.points} min={min} max={max} />}
    </div>
  )
}
