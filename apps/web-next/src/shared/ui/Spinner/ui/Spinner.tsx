import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface SpinnerProps {
  size?: number
  className?: string
}

export const Spinner: FC<SpinnerProps> = ({ className, size = 24 }) => (
  <div
    className={cn(styles.root, className)}
    style={{
      '--size': `${size}px`
    }}
  >
    <div className={styles.container}>
      {[...new Array(12)].map((_, index) => (
        <span className={styles.cell} key={`spinner-${index}`}></span>
      ))}
    </div>
  </div>
)
