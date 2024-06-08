import { FragmentsNav } from '@/app/project/[projectSlug]/fragments/components/FragmentsNav/FragmentsNav'
import { Container } from '@/app/components/Container/Container'
import styles from './styles.module.css'
import { FragmentCard } from '@/app/project/[projectSlug]/fragments/components/FragmentCard/FragmentCard'

export default function () {
  return (
    <div className={styles.root}>
      <FragmentsNav />
      <Container>
        <ul className={styles.body}>
          <FragmentCard />
        </ul>
      </Container>
    </div>
  )
}
