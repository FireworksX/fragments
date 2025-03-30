import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StatusDot } from '@/shared/ui/StatusDot'

interface StatusBadgeProps {
  className?: string
  status: 'success' | 'error' | 'warning' | 'info'
}

export const StatusBadge: FC<StatusBadgeProps> = ({ className, status }) => {
  return (
    <div className={cn(styles.root, className, styles[status])}>
      <StatusDot status={status} />
      {
        {
          success: 'live',
          error: 'stop',
          warning: 'pause',
          info: 'info'
        }[status]
      }
    </div>
  )
}
