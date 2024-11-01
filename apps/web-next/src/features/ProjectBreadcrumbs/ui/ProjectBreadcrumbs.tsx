'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import FragmentsLogo from '@/shared/icons/next/logo.svg'
import { useParams } from 'next/navigation'
import { Link } from '@/shared/ui/Link/ui/Link'
import { Touchable } from '@/shared/ui/Touchable'
import { BreadcrumbProject } from '@/features/ProjectBreadcrumbs/ui/BreadcrumbProject/BreadcrumbProject'
import { BreadcrumbFragment } from '@/features/ProjectBreadcrumbs/ui/BreadcrumbFragment/BreadcrumbFragment'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '@/shared/queries/currentUser'
import { useProjectBreadcrumbs } from '@/features/ProjectBreadcrumbs/hooks/useProjectBreadcrumbs'

export const ProjectBreadcrumbs: FC = () => {
  const { project } = useProjectBreadcrumbs()

  // const { project: projectDetail } = useProjectDetail()

  return (
    <div className={styles.root}>
      <Link type='projectsList'>
        <Touchable>
          <FragmentsLogo className={styles.logo} width={24} height={24} />
        </Touchable>
      </Link>

      {project && (
        <>
          <div className={styles.delimiter} />
          <BreadcrumbProject name={project.name} logo={project?.logo?.public_path} />
        </>
      )}

      {/*{fragmentSlug && (*/}
      {/*  <>*/}
      {/*    <div className={styles.delimiter} />*/}
      {/*    <BreadcrumbFragment />*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  )
}
