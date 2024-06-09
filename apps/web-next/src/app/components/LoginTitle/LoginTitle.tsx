import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface LoginTitleProps extends PropsWithChildren {
  className?: string
}

export const LoginTitle: FC<LoginTitleProps> = ({ className, children }) => (
  <h1 className={cn(styles.root, className)} data-testid='LoginTitle'>
    {children}
  </h1>
)
