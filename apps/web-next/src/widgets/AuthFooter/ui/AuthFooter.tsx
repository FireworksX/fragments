import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Link } from '@/shared/ui/Link/ui/Link'

interface LoginFooterProps {
  mode?: 'signUp' | 'login'
  className?: string
}

export const AuthFooter: FC<LoginFooterProps> = ({ className, mode }) => (
  <div className={cn(styles.root, className)} data-testid='LoginFooter'>
    {mode === 'signUp' ? (
      <Link className={styles.link} type='login'>
        Already have an account? Login
      </Link>
    ) : (
      <Link className={styles.link} type='signup'>
        Don't have an account? Sign Up
      </Link>
    )}
  </div>
)
