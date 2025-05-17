import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TabItemBadgeProps extends PropsWithChildren {
  mode?: 'success'
  className?: string
}

export const TabItemBadge: FC<TabItemBadgeProps> = ({ className, mode = '', children }) => {
  return <div className={cn(styles.root, className, styles[mode])}>{children}</div>
}
