import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface SpinnerProps {
  size?: number
  color?: string
  className?: string
}

export const Spinner: FC<SpinnerProps> = ({ className, color = 'var(--background-secondary)', size = 24 }) => (
  <div
    className={cn(styles.root, className)}
    style={{
      '--size': `${size}px`,
      '--color': color
    }}
  >
    <div className={styles.container}>
      {[...new Array(12)].map((_, index) => (
        <span className={styles.cell} key={`spinner-${index}`}></span>
      ))}
    </div>
  </div>
)
