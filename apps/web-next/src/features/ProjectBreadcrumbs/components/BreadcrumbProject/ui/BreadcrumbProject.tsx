import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Avatar } from '@/shared/ui/Avatar'

interface BreadcrumbProjectProps {
  name: string
  logo?: string
  className?: string
}

export const BreadcrumbProject: FC<BreadcrumbProjectProps> = ({ className, name, logo }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Avatar uniqueId={name} firstName={name} size={20} src={logo} />
      {name}
    </div>
  )
}
