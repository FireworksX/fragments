import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Avatar from '@/app/components/Avatar/Avatar'

interface BreadcrumbProjectProps {
  className?: string
}

export const BreadcrumbFragment: FC<BreadcrumbProjectProps> = ({ className }) => {
  return <div className={cn(styles.root, className)}>name</div>
}
