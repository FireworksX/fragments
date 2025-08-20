import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { DisplayNumber } from '@/shared/ui/DisplayNumber'

interface ChartTooltipProps {
  label: string
  points: {
    label: string
    value: number
    color: string
  }[]
  className?: string
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ className, points, label }) => {
  if (!points) return null

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.label}>{label}</div>
      {points.map((point, index) => (
        <div className={styles.row} key={index}>
          <div className={styles.group}>
            <div className={styles.dot} style={{ background: point.color }} />
            {point.label}
          </div>

          <DisplayNumber className={styles.value}>{point.value}</DisplayNumber>
        </div>
      ))}
    </div>
  )
}
