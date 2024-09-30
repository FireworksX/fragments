import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface HeaderSubNavCellProps extends PropsWithChildren {
  isActive?: boolean
  className?: string
}

export const HeaderSubNavCell: FC<HeaderSubNavCellProps> = ({ className, isActive, children }) => (
  <div className={cn(styles.root, className, { [styles.active]: isActive })} data-testid='HeaderSubNavCell'>
    {children}
  </div>
)
