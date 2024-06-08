import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Avatar from '@/app/components/Avatar/Avatar'

interface BreadcrumbProjectProps {
  className?: string
}

export const BreadcrumbProject: FC<BreadcrumbProjectProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Avatar size={20} />
      Scores24
    </div>
  )
}
