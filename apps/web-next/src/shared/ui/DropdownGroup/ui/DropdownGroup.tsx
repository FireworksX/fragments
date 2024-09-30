import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface DropdownGroupProps extends PropsWithChildren {
  minWidth?: number
  className?: string
}

const DropdownGroup: FC<DropdownGroupProps> = ({ className, children, minWidth }) => {
  return (
    <div className={cn(styles.root, className)} style={{ minWidth }}>
      {children}
    </div>
  )
}

export default DropdownGroup
