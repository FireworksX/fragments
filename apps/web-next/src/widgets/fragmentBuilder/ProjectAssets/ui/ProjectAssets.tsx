import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Panel } from '@/shared/ui/Panel'

interface ProjectAssetsProps {
  className?: string
}

export const ProjectAssets: FC<ProjectAssetsProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Panel title='External Libraries'></Panel>
    </div>
  )
}
