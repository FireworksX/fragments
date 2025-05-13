import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Spinner } from '@/shared/ui/Spinner'

interface ToastInsertingProps {
  className?: string
}

export const ToastInserting: FC<ToastInsertingProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Spinner size={14} color='var(--text-color)' />
      <div>Inserting...</div>
    </div>
  )
}
