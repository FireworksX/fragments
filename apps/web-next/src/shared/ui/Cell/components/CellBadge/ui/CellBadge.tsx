import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface CellBadgeProps extends PropsWithChildren {
  className?: string
}

export const CellBadge: FC<CellBadgeProps> = ({ className, children }) => {
  return <div className={cn(styles.root, className)}>{children}</div>
}
