import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'

interface HeaderSubNavProps extends PropsWithChildren {
  className?: string
}

export const HeaderSubNav: FC<HeaderSubNavProps> = ({ className, children }) => (
  <div className={cn(styles.root, className)} data-testid='HeaderSubNav'>
    <Container className={styles.body}>{children}</Container>
  </div>
)
