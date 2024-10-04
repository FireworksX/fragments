import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated, SpringValue } from '@react-spring/web'

interface BuilderPanelProps extends PropsWithChildren {
  title?: string
  aside?: ReactNode
  className?: string
  bodyClassName?: string
  hasBody?: SpringValue<boolean> | boolean
}

const Panel: FC<BuilderPanelProps> = animated(
  ({ className, hasBody = true, bodyClassName, children, title, aside }) => {
    return (
      <div className={cn(styles.root, className)}>
        {title && (
          <div className={styles.head}>
            <div className={styles.title}>{title}</div>
            {aside}
          </div>
        )}
        {hasBody && <div className={cn(styles.body, bodyClassName)}>{children}</div>}
      </div>
    )
  }
)

export default Panel
