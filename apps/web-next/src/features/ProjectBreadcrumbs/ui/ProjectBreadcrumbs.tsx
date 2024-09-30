'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import FragmentsLogo from '@/shared/icons/fragments-logo.svg'
import { useParams } from 'next/navigation'
import { Link } from '@/shared/ui/Link/ui/Link'
import { Touchable } from '@/shared/ui/Touchable'
import { BreadcrumbProject } from '@/features/ProjectBreadcrumbs/ui/BreadcrumbProject/BreadcrumbProject'
import { BreadcrumbFragment } from '@/features/ProjectBreadcrumbs/ui/BreadcrumbFragment/BreadcrumbFragment'

export const ProjectBreadcrumbs: FC = () => {
  const { fragmentSlug, projectSlug } = useParams()
  // const { project: projectDetail } = useProjectDetail()

  return (
    <div className={styles.root}>
      <Link type='projectsList'>
        <Touchable>
          <FragmentsLogo width={24} height={24} />
        </Touchable>
      </Link>

      {/*{projectDetail && (*/}
      {/*  <>*/}
      {/*    <div className={styles.delimiter} />*/}
      {/*    <BreadcrumbProject name={projectDetail.name} logo={projectDetail.logo.public_path} />*/}
      {/*  </>*/}
      {/*)}*/}

      {fragmentSlug && (
        <>
          <div className={styles.delimiter} />
          <BreadcrumbFragment />
        </>
      )}
    </div>
  )
}
