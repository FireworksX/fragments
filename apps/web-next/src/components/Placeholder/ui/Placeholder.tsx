import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface PlaceholderProps {
  title?: string
  description?: string
  actions?: ReactNode
  icon?: ReactNode
  className?: string
  stretched?: boolean
}

export const Placeholder: FC<PlaceholderProps> = ({ className, stretched, icon, actions, title, description }) => {
  return (
    <div className={cn(styles.root, className, { [styles.stretched]: stretched })}>
      {icon}
      <div className={styles.titleGroup}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>

      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
