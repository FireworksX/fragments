import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Spinner } from '@/shared/ui/Spinner'

interface SpinnerBlockProps {
  className?: string
  size?: number
}

export const SpinnerBlock: FC<SpinnerBlockProps> = ({ className, size = 24 }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Spinner size={size} color='var(--secondary)' />
    </div>
  )
}
