import styles from './styles.module.css'
import { FC, PropsWithChildren } from 'react'
import { ProjectHeader } from '@/widgets/ProjectHeader'

export const ProjectLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.page}>
      <ProjectHeader />
      {children}
    </div>
  )
}
