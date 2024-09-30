import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Link } from '@/shared/ui/Link/ui/Link'

interface LoginFooterProps {
  className?: string
}

export const AuthFooter: FC<LoginFooterProps> = ({ className }) => (
  <div className={cn(styles.root, className)} data-testid='LoginFooter'>
    <Link className={styles.link} type='signup'>
      Don't have an account? Sign Up
    </Link>
  </div>
)
