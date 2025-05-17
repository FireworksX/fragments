import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'

interface PageHeadingProps extends PropsWithChildren {
  actions?: ReactNode | ReactNode[]
  className?: string
  description?: string
}

export const PageHeading: FC<PageHeadingProps> = ({ className, children, description, actions }) => (
  <Container className={cn(styles.root, className)} data-testid='PageHeading'>
    <div>
      {children && <h1 className={styles.title}>{children}</h1>}
      {description && <p className={styles.description}>{description}</p>}
    </div>

    {actions && <div className={styles.actions}>{actions}</div>}
  </Container>
)
