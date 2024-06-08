'use client'
import { useParams } from 'next/navigation'
import FragmentsLogo from '@/app/svg/fragments-logo.svg'
import Touchable from '@/app/components/Touchable'
import styles from './styles.module.css'
import { BreadcrumbProject } from '@/app/project/widgets/Header/widgets/Breadcrumbs/components/BreadcrumbProject/BreadcrumbProject'
import { BreadcrumbFragment } from '@/app/project/widgets/Header/widgets/Breadcrumbs/components/BreadcrumbFragment/BreadcrumbFragment'

export const Breadcrumbs = () => {
  const { fragmentSlug } = useParams()

  return (
    <div className={styles.root}>
      <Touchable>
        <FragmentsLogo width={24} height={24} />
      </Touchable>
      <div className={styles.delimiter} />
      <BreadcrumbProject />

      {fragmentSlug && (
        <>
          <div className={styles.delimiter} />
          <BreadcrumbFragment />
        </>
      )}
    </div>
  )
}
