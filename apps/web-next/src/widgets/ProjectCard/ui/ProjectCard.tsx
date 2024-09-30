import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import MoreHorizontal from '@/shared/icons/more-horizontal.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'

interface ProjectCardProps {
  name: string
  updatedAt: string
  logo?: string
  className?: string
}

export const ProjectCard: FC<ProjectCardProps> = ({ className, name, logo, updatedAt }) => (
  <div className={cn(styles.root, className)} data-testid='ProjectCard'>
    <div className={styles.head}>
      <Avatar firstName={name} src={logo} size={34} uniqueId={name} className={styles.logo} />
      <div className={styles.metaInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.updatedAt}>updated 2d ago</div>
      </div>
      <div className={styles.actions}>
        <Button mode='tertiary-secondary'>
          <MoreHorizontal width={20} height={20} />
        </Button>
      </div>
    </div>
  </div>
)
