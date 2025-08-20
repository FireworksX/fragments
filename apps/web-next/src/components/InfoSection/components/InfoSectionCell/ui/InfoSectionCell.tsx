import { ComponentPropsWithoutRef, FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

export interface InfoSectionCellProps extends PropsWithChildren, ComponentPropsWithoutRef<'div'> {
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
  children,
  ...HTMLProps
}) => {
  return (
    <div className={cn(styles.root, className)} {...HTMLProps}>
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
