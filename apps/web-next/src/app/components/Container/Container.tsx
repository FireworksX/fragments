import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ContainerProps extends PropsWithChildren {
  mode?: 'hug'
  withVertical?: boolean
  className?: string
}

export const Container: FC<ContainerProps> = ({ className, children, mode = 'default', withVertical }) => (
  <div
    className={cn(styles.root, className, styles[mode], {
      [styles.withVertical]: withVertical
    })}
    data-testid='Container'
  >
    {children}
  </div>
)
