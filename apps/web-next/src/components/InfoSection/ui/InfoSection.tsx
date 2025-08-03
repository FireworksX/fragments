import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Spinner } from '@/shared/ui/Spinner'

interface InfoSectionProps extends PropsWithChildren {
  colorMode?: 'inverse'
  header?: ReactNode
  footer?: ReactNode
  loading?: boolean
  className?: string
  bodyClassName?: string
}

export const InfoSection: FC<InfoSectionProps> = ({
  className,
  bodyClassName,
  colorMode,
  loading,
  header,
  footer,
  children
}) => {
  return (
    <div className={cn(styles.root, styles[colorMode], className)}>
      {header}

      <div className={cn(styles.body, bodyClassName)}>
        {loading ? (
          <div className={styles.loader}>
            <Spinner size={16} color='var(--text-color-accent)' />
          </div>
        ) : (
          children
        )}
      </div>

      {footer}
    </div>
  )
}
