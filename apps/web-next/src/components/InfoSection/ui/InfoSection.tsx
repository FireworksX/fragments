import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface InfoSectionProps extends PropsWithChildren {
  header?: ReactNode
  className?: string
}

export const InfoSection: FC<InfoSectionProps> = ({ className, header, children }) => {
  return (
    <div className={cn(styles.root, className)}>
      {header}
      <div className={styles.body}>{children}</div>
    </div>
  )
}
