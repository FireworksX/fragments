import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InfoSectionCellProps extends PropsWithChildren {
  title?: string
  description?: string
  className?: string
  before?: ReactNode
  after?: ReactNode
}

export const InfoSectionCell: FC<InfoSectionCellProps> = ({
  className,
  title,
  before,
  after,
  description,
  children
}) => {
  return (
    <div className={cn(styles.root, className)}>
      {(title || description) && (
        <div className={styles.head}>
          {before}
          <div className={styles.center}>
            {title && <div className={styles.title}>{title}</div>}
            {description && <div className={styles.description}>{description}</div>}
          </div>

          {after}
        </div>
      )}

      {children}
    </div>
  )
}
