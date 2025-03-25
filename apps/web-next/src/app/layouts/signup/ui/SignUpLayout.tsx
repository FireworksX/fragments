import { FC, PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { AuthFooter } from '@/widgets/AuthFooter'

export const SignUpLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.layout}>
    <div className={styles.layoutBody}>{children}</div>
    <AuthFooter mode='signUp' />
  </div>
)
