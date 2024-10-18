'use client'
import dynamic from 'next/dynamic'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Link } from '@/shared/ui/Link/ui/Link'
import { Touchable } from '@/shared/ui/Touchable'
import { ProjectCard } from '@/widgets/ProjectCard'
import { useProjectsListView } from '@/views/ProjectsList/hooks/useProjectsListView'
import { CreateProjectModal } from '@/widgets/modals/CreateProjectModal'

export const CampaignsListPage = () => {
  const { list, handleCreateProject } = useProjectsListView()

  return (
    <div>
      <Container className={styles.body} withVertical mode='hug'>
        {list.map(project => (
          <Link key={project.name} type='project' projectSlug={project.id}>
            <Touchable>
              <ProjectCard name={project.name} logo={project.logo?.public_path} updatedAt={project.updated_at} />
            </Touchable>
          </Link>
        ))}
        <Touchable
          TagName='button'
          className={styles.createProject}
          data-testid='ProjectCardCreatePlaceholder'
          onClick={handleCreateProject}
        >
          Create New Project
        </Touchable>
      </Container>

      <CreateProjectModal />
    </div>
  )
}
