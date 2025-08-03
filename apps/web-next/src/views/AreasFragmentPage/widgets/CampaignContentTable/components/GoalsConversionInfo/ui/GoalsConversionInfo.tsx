import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Chip } from '@/shared/ui/Chip'

interface GoalsConversionInfoProps {
  className?: string
}

export const GoalsConversionInfo: FC<GoalsConversionInfoProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      Goal Conversion for 24 hour
      <div className={styles.body}>
        <div className={styles.row}>
          Body click
          <Chip className={styles.chip} mode='success'>
            1.3%
          </Chip>
        </div>
        <div className={styles.row}>
          Body click
          <Chip className={styles.chip} mode='success'>
            1.3%
          </Chip>
        </div>
        <div className={styles.row}>
          Body click
          <Chip className={styles.chip} mode='success'>
            1.3%
          </Chip>
        </div>
        <div className={styles.row}>
          Body click
          <Chip className={styles.chip} mode='success'>
            1.3%
          </Chip>
        </div>
      </div>
    </div>
  )
}
