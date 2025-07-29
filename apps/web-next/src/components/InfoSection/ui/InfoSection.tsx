import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Spinner } from '@/shared/ui/Spinner'

interface InfoSectionProps extends PropsWithChildren {
  header?: ReactNode
  footer?: ReactNode
  loading?: boolean
  className?: string
}

export const InfoSection: FC<InfoSectionProps> = ({ className, loading, header, footer, children }) => {
  return (
    <div className={cn(styles.root, className)}>
      {header}

      <div className={styles.body}>
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
