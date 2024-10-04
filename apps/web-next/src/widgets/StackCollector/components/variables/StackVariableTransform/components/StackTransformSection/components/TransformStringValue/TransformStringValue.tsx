import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TransformStringValueProps {
  className?: string
}

export const TransformStringValue: FC<TransformStringValueProps> = ({ className }) => (
  <div className={cn(styles.root, className)} data-testid='TransformStringValue'>
    <h1>TransformStringValue component</h1>
  </div>
)
