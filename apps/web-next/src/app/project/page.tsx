'use client'

import styles from './styles.module.css'
import { Container } from '@/app/components/Container/Container'
import { ProjectCard } from '@/app/project/components/ProjectCard/ProjectCard'
import { ProjectCardCreatePlaceholder } from '@/app/project/components/ProjectCardCreatePlaceholder/ProjectCardCreatePlaceholder'
import { Link } from '@/app/widgets/Link/Link'
import CreateProjectModal from '@/app/widgets/modals/CreateProjectModal/CreateProjectModal'
import { useGraph } from '@graph-state/react'
import { modalStore } from '@/app/store/modal.store'
import Touchable from '@/app/components/Touchable'
import { useProject } from '@/app/project/hooks/useProject'

export default function () {
  const { list, handleCreateProject } = useProject()

  return (
    <div className={styles.page}>
      <Container className={styles.body} withVertical mode='hug'>
        {list.map(project => (
          <Link key={project.name} type='project' projectSlug={project.id}>
            <Touchable>
              <ProjectCard name={project.name} logo={project.logo?.public_path} updatedAt={project.updated_at} />
            </Touchable>
          </Link>
        ))}
        <ProjectCardCreatePlaceholder onClick={handleCreateProject} />
      </Container>

      <CreateProjectModal />
    </div>
  )
}
