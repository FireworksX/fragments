import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface DemoProps {
  className?: string
}

export const Demo: FC<DemoProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.header} />
      <div className={styles.content}>
        <div className={styles.left} />
        <div className={styles.center} />
        <div className={styles.right} />
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}
