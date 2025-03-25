import { FC, PropsWithChildren } from 'react'
import { AuthFooter } from '@/widgets/AuthFooter'
import styles from './styles.module.css'

export const LoginLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.layout}>
    <div className={styles.layoutBody}>{children}</div>
    <AuthFooter />
  </div>
)
