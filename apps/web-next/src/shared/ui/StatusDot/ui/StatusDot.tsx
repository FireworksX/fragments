import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface StatusDotProps {
  className?: string
  status: 'success' | 'error' | 'warning' | 'info'
}

export const StatusDot: FC<StatusDotProps> = ({ status, className }) => {
  return <div className={cn(className, styles.root, styles[status])} />
}
