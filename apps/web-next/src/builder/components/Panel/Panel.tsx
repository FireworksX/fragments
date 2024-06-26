import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface BuilderPanelProps extends PropsWithChildren {
  title?: string
  aside?: ReactNode
  className?: string
  bodyClassName?: string
}

const Panel: FC<BuilderPanelProps> = ({ className, bodyClassName, children, title, aside }) => {
  return (
    <div className={cn(styles.root, className)}>
      {title && (
        <div className={styles.head}>
          <div className={styles.title}>{title}</div>
          {aside}
        </div>
      )}
      <div className={cn(styles.body, bodyClassName)}>{children}</div>
    </div>
  )
}

export default Panel
