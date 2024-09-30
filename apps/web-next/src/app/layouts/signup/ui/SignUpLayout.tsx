import { FC, PropsWithChildren } from 'react'
import { AuthHeader } from '@/widgets/AuthHeader'
import styles from './styles.module.css'

export const SignUpLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.layout}>
    <AuthHeader withoutSignUp />
    <div className={styles.layoutBody}>{children}</div>
  </div>
)
