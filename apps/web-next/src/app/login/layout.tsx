import styles from './styles.module.css'
import { LoginHeader } from '@/app/components/LoginHeader/LoginHeader'
import { LoginFooter } from '@/app/components/LoginFooter/LoginFooter'

export default function ({ children }) {
  return (
    <div className={styles.layout}>
      <LoginHeader />
      <div className={styles.layoutBody}>{children}</div>
      <LoginFooter />
    </div>
  )
}
