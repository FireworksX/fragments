'use client'
import styles from './styles.module.css'
import { FC, PropsWithChildren } from 'react'
import { ProjectHeader } from '@/widgets/ProjectHeader'
import { SessionProvider } from 'next-auth/react'

export const ProjectLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <div className={styles.page}>
        <ProjectHeader />
        {children}
      </div>
    </SessionProvider>
  )
}
