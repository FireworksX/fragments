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
  withPaddingBottom?: boolean
  withBorderBottom?: boolean
}

const Panel: FC<BuilderPanelProps> = animated(
  ({ className, hasBody = true, bodyClassName, children, title, aside, withPaddingBottom, withBorderBottom }) => {
    return (
      <div
        className={cn(styles.root, className, {
          [styles.withBorderBottom]: withBorderBottom
        })}
      >
        {title && (
          <div className={styles.head}>
            <div className={styles.title}>{title}</div>
            {aside}
          </div>
        )}
        {hasBody && (
          <div
            className={cn(styles.body, bodyClassName, {
              [styles.withPaddingBottom]: withPaddingBottom
            })}
          >
            {children}
          </div>
        )}
      </div>
    )
  }
)

export default Panel