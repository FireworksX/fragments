import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Touchable } from '@/shared/ui/Touchable'
import CaretLeftIcon from '@/shared/icons/next/arrow-left.svg'
import CloseIcon from '@/shared/icons/next/close.svg'
import { useModal } from '@/shared/hooks/useModal'

interface ModalContainerProps extends PropsWithChildren {
  title?: string
  titleLegend?: string
  description?: ReactNode
  footer?: ReactNode | ReactNode[]
  width?: number
  className?: string
  bodyClassName?: string
  onBack?: () => void
  onClose?: () => void
}

const ModalContainer: FC<ModalContainerProps> = ({
  className,
  bodyClassName,
  footer,
  width,
  description,
  title,
  titleLegend,
  children
}) => {
  const { prevModal, goPrev, close } = useModal()

  return (
    <div className={cn(styles.root, className)} style={{ width }}>
      {title && (
        <div className={styles.title}>
          {!!prevModal && (
            <Touchable className={styles.backAction} onClick={goPrev}>
              <CaretLeftIcon />
            </Touchable>
          )}
          <div className={styles.titleContent}>{title}</div>
          {titleLegend && (
            <>
              <div className={styles.titleLegendDelimiter} />
              <div className={styles.titleLegend}>{titleLegend}</div>
            </>
          )}

          <Touchable className={styles.backAction} onClick={close}>
            <CloseIcon />
          </Touchable>
        </div>
      )}
      <div className={cn(styles.body, bodyClassName)}>{children}</div>
      {description && <div className={styles.description}>{description}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

export default ModalContainer
