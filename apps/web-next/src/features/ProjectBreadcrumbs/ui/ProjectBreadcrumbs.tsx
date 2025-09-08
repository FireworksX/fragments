'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import FragmentsLogo from '@/shared/icons/next/logo.svg'
import { Link } from '@/shared/ui/Link/ui/Link'
import { Touchable } from '@/shared/ui/Touchable'
import { BreadcrumbProject } from '../components/BreadcrumbProject'
import { useProjectBreadcrumbs } from '../hooks/useProjectBreadcrumbs'
import { Spinner } from '@/shared/ui/Spinner'
import { BreadcrumbStage } from '@/features/ProjectBreadcrumbs/components/BreadcrumbStage'

export const ProjectBreadcrumbs: FC = () => {
  const { homeProject, project, loading, list } = useProjectBreadcrumbs()

  // const { project: projectDetail } = useProjectDetail()

  return (
    <div className={styles.root}>
      <Link type='project' projectSlug={homeProject?.id}>
        <Touchable>
          <FragmentsLogo className={styles.logo} width={24} height={24} />
        </Touchable>
      </Link>

      {(loading || project) && (
        <>
          <div className={styles.delimiter} />
          {loading && <Spinner size={14} color='var(--text-color-accent)' />}
          {project && <BreadcrumbProject projects={list} currentProject={project?.id} />}
        </>
      )}

      {/*<div className={styles.delimiter} />*/}
      {/*{project && <BreadcrumbStage />}*/}

      {/*{fragmentSlug && (*/}
      {/*  <>*/}
      {/*    <div className={styles.delimiter} />*/}
      {/*    <BreadcrumbFragment />*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  )
}
