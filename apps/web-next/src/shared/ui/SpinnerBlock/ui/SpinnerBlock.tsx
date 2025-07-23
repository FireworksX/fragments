import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Spinner } from '@/shared/ui/Spinner'

interface SpinnerBlockProps {
  className?: string
}

export const SpinnerBlock: FC<SpinnerBlockProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Spinner size={24} color='var(--secondary)' />
    </div>
  )
}
