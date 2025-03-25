import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InfoSectionCellProps extends PropsWithChildren {
  title?: string
  description?: string
  className?: string
}

export const InfoSectionCell: FC<InfoSectionCellProps> = ({ className, title, description, children }) => {
  return (
    <div className={cn(styles.root, className)}>
      {title && <div className={styles.title}>{title}</div>}
      {description && <div className={styles.description}>{description}</div>}
      {children}
    </div>
  )
}
