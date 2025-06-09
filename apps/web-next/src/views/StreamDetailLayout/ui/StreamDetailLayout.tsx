'use client'
import cn from 'classnames'
import styles from './styles.module.css'
import { StreamHeader } from '@/views/StreamDetailLayout/widgets/StreamHeader'

export const StreamDetailLayout = ({ children }) => {
  return (
    <div className={cn(styles.root)}>
      <StreamHeader className={styles.header} />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
