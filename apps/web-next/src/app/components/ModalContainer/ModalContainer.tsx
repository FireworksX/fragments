import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ModalContainerProps extends PropsWithChildren {
  title?: string
  description?: ReactNode
  footer?: ReactNode | ReactNode[]
  className?: string
  bodyClassName?: string
}

const ModalContainer: FC<ModalContainerProps> = ({
  className,
  bodyClassName,
  footer,
  description,
  title,
  children
}) => {
  return (
    <div className={cn(styles.root, className)}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={cn(styles.body, bodyClassName)}>{children}</div>
      {description && <div className={styles.description}>{description}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

export default ModalContainer
