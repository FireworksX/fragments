import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Avatar } from '@/shared/ui/Avatar'
import { Touchable } from '@/shared/ui/Touchable'
import { Link } from '@/shared/ui/Link'

interface BreadcrumbProjectProps {
  name: string
  logo?: string
  className?: string
}

export const BreadcrumbProject: FC<BreadcrumbProjectProps> = ({ className, name, logo }) => {
  return (
    <Link type='project'>
      <Touchable className={cn(styles.root, className)}>
        <Avatar uniqueId={name} firstName={name} size={20} src={logo} />
        {name}
      </Touchable>
    </Link>
  )
}
