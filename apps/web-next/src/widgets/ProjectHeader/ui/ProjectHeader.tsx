import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { ProjectBreadcrumbs } from '@/features/ProjectBreadcrumbs'
import { HeaderNav } from '@/features/HeaderNav'
import { CurrentProfileTarget } from '@/features/CurrentProfileTarget'
import { FeedbackForm } from '@/features/FeedbackForm'

export const ProjectHeader: FC = () => {
  return (
    <header className={styles.root}>
      <Container className={styles.container}>
        <ProjectBreadcrumbs />
        <HeaderNav currentUserNode={<CurrentProfileTarget />} feedbackFormNode={<FeedbackForm />} />
      </Container>
    </header>
  )
}
