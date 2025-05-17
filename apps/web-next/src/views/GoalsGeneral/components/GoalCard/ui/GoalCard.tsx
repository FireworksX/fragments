import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import EditIcon from '@/shared/icons/next/pencil.svg'
import { ContentEditable } from '@/shared/ui/ContentEditable'

interface GoalCardProps {
  className?: string
  onEdit?: (options: { name?: string; code?: string }) => void
}

export const GoalCard: FC<GoalCardProps> = ({ className, onEdit }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.info}>
        <div className={styles.infoBody}>
          <div className={styles.title}>
            1.
            <ContentEditable
              className={styles.editable}
              value='Шапка матча: клик на кэф'
              onSubmit={name => onEdit?.({ name })}
            />
          </div>

          <div className={styles.goalCode}>
            Code:{' '}
            <ContentEditable
              className={styles.editable}
              value='match-header-odd-click'
              onSubmit={code => onEdit?.({ code })}
            />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <div className={cn(styles.rowName, styles.accent)}>Конверсия</div>
            <div className={styles.rowValue}>0,46%</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowName}>Достижения цели</div>
            <div className={styles.rowValue}>45 083</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowName}>Целевые визиты</div>
            <div className={styles.rowValue}>39 167</div>
          </div>
        </div>
      </div>
    </div>
  )
}
