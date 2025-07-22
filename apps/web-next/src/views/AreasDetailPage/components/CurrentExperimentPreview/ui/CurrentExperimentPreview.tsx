import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Spinner } from '@/shared/ui/Spinner'
import UsersIcon from '@/shared/icons/next/users.svg'
import ClockIcon from '@/shared/icons/next/clock.svg'
import { Button } from '@/shared/ui/Button'

interface CurrentExperimentPreviewProps {
  className?: string
}

export const CurrentExperimentPreview: FC<CurrentExperimentPreviewProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.head}>Active Experiment</div>
      <div className={styles.body}>
        <div className={styles.progressValue}>
          <Spinner size={16} color='var(--secondary)' />
          32.41%
        </div>
        <div className={styles.progress}>
          <div className={styles.progressInner} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Processed</div>
        <div className={styles.sectionRow}>
          <div className={styles.sectionLabel}>
            <UsersIcon width={12} height={12} />
            Customers
          </div>

          <span className={styles.sectionValue}>23.11%</span>
        </div>
        <div className={styles.sectionRow}>
          <div className={styles.sectionLabel}>
            <ClockIcon />
            Duration
          </div>

          <span className={styles.sectionValue}>41.66%</span>
        </div>
      </div>

      <Button size='large' mode='outline'>
        Review Experiment
      </Button>
    </div>
  )
}
