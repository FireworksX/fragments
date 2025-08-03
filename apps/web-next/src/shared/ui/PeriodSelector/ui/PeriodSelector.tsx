'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'

type Period = 'today' | 'yesterday' | 'week' | 'month' | 'year'

interface PeriodSelectorProps extends PropsWithChildren {
  className?: string
  period: Period
  onChange?: (value: Period) => void
}

export const PeriodSelector: FC<PeriodSelectorProps> = ({ className, children, period, onChange }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.group}>
        <Button mode={period === 'today' ? 'primary' : 'secondary'} onClick={() => onChange?.('today')}>
          Today
        </Button>
        <Button mode={period === 'yesterday' ? 'primary' : 'secondary'} onClick={() => onChange?.('yesterday')}>
          Yesterday
        </Button>
        <Button mode={period === 'week' ? 'primary' : 'secondary'} onClick={() => onChange?.('week')}>
          Week
        </Button>
        <Button mode={period === 'month' ? 'primary' : 'secondary'} onClick={() => onChange?.('month')}>
          Month
        </Button>
        <Button mode={period === 'year' ? 'primary' : 'secondary'} onClick={() => onChange?.('year')}>
          Year
        </Button>
      </div>

      {children}
    </div>
  )
}
