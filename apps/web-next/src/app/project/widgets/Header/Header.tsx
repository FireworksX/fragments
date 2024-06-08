import styles from './styles.module.css'
import { Breadcrumbs } from '@/app/project/widgets/Header/widgets/Breadcrumbs/Breadcrumbs'
import { HeaderNav } from '@/app/project/widgets/Header/widgets/HeaderNav/HeaderNav'
import { Container } from '@/app/components/Container/Container'

export const Header = () => {
  return (
    <header className={styles.root}>
      <Container className={styles.container}>
        <Breadcrumbs />
        <HeaderNav />
      </Container>
    </header>
  )
}
