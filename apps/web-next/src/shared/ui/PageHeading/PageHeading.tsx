import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/app/components/Container/Container'

interface PageHeadingProps extends PropsWithChildren {
  actions?: ReactNode | ReactNode[]
  className?: string
}

export const PageHeading: FC<PageHeadingProps> = ({ className, children, actions }) => (
  <Container className={cn(styles.root, className)} data-testid='PageHeading'>
    {children && <h1 className={styles.title}>{children}</h1>}
    {actions && <div className={styles.actions}>{actions}</div>}
  </Container>
)
