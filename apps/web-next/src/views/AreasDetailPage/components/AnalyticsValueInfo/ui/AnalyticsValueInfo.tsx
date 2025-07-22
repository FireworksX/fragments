import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import UpIcon from '@/shared/icons/next/arrow-up.svg'

interface AnalyticsValueInfoProps extends PropsWithChildren {
  title: string
  trend?: number
  dynamic?: string
  className?: string
}

export const AnalyticsValueInfo: FC<AnalyticsValueInfoProps> = ({ className, trend, title, dynamic, children }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.head}>
        {title}
        <span className={styles.trend}>
          <UpIcon width={10} height={10} />
          {trend}%
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.value}>{children}</div>
        <div className={styles.footer}>
          {dynamic} <span className={styles.span}>vs last week</span>
        </div>
      </div>
    </div>
  )
}
