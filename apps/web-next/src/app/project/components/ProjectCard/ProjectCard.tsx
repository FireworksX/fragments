import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CommonLogo from '@/app/components/CommonLogo/CommonLogo'
import MoreHorizontal from '@/app/svg/more-horizontal.svg'
import Button from '@/app/components/Button'
import Avatar from '@/app/components/Avatar/Avatar'

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
