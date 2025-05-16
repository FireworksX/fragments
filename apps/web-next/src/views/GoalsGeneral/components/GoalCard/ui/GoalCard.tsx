import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import EditIcon from '@/shared/icons/next/pencil.svg'

interface GoalCardProps {
  className?: string
  onEdit?: () => void
}

export const GoalCard: FC<GoalCardProps> = ({ className, onEdit }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.info}>
        <div className={styles.infoBody}>
          <div className={styles.title}>
            1. Шапка матча: клик на кэф
            <Button className={styles.editButton} mode='tertiary' icon={<EditIcon />} />
          </div>

          <div className={styles.goalCode}>Code: match-header-odd-click</div>
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
