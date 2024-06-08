import styles from './styles.module.css'
import { Header } from '@/app/project/widgets/Header/Header'

export default function Layout({ children }) {
  return (
    <div className={styles.page}>
      <Header />
      {children}
    </div>
  )
}
