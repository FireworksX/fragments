import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InfoSectionHeaderProps {
  title?: string
  description?: string
  className?: string
}

export const InfoSectionHeader: FC<InfoSectionHeaderProps> = ({ className, title, description }) => {
  return (
    <div className={cn(styles.root, className)}>
      {title && <div className={styles.title}>{title}</div>}
      {description && <div className={styles.description}>{description}</div>}
    </div>
  )
}
