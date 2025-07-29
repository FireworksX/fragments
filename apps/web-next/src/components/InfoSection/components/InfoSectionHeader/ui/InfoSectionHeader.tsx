import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InfoSectionHeaderProps {
  title?: string
  description?: string
  aside?: ReactNode
  className?: string
}

export const InfoSectionHeader: FC<InfoSectionHeaderProps> = ({ className, aside, title, description }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>

      {aside}
    </div>
  )
}
