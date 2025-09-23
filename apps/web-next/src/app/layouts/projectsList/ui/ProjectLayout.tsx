'use client'
import styles from './styles.module.css'
import { FC, PropsWithChildren } from 'react'
import { ProjectHeader } from '@/widgets/ProjectHeader'
import { SessionProvider } from 'next-auth/react'
import { useProject } from '@/shared/hooks/useProject'

export const ProjectLayout: FC<PropsWithChildren> = ({ children }) => {
  const { project } = useProject()

  return (
    <SessionProvider>
      <div className={styles.page}>
        <ProjectHeader />
        {children}
      </div>
    </SessionProvider>
  )
}
