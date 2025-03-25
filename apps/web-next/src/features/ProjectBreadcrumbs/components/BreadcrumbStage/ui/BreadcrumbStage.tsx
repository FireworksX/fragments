import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StatusDot } from '@/shared/ui/StatusDot'

interface BreadcrumbStageProps {
  className?: string
}

export const BreadcrumbStage: FC<BreadcrumbStageProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <StatusDot status='success' />
      Production
    </div>
  )
}
