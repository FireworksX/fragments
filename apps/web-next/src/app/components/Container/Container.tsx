import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ContainerProps extends PropsWithChildren {
  className?: string
}

export const Container: FC<ContainerProps> = ({ className, children }) => (
  <div className={cn(styles.root, className)} data-testid='Container'>
    {children}
  </div>
)
