import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Touchable } from '@/shared/ui/Touchable'
import CaretLeftIcon from '@/shared/icons/caret-left.svg'

interface ModalContainerProps extends PropsWithChildren {
  title?: string
  titleLegend?: string
  description?: ReactNode
  footer?: ReactNode | ReactNode[]
  className?: string
  bodyClassName?: string
  onBack?(): void
}

const ModalContainer: FC<ModalContainerProps> = ({
  className,
  bodyClassName,
  footer,
  description,
  title,
  titleLegend,
  children,
  onBack
}) => {
  return (
    <div className={cn(styles.root, className)}>
      {title && (
        <div className={styles.title}>
          {!!onBack && (
            <Touchable className={styles.backAction} onClick={onBack}>
              <CaretLeftIcon />
            </Touchable>
          )}
          {title}
          {titleLegend && (
            <>
              <div className={styles.titleLegendDelimiter} />
              <div className={styles.titleLegend}>{titleLegend}</div>
            </>
          )}
        </div>
      )}
      <div className={cn(styles.body, bodyClassName)}>{children}</div>
      {description && <div className={styles.description}>{description}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

export default ModalContainer
