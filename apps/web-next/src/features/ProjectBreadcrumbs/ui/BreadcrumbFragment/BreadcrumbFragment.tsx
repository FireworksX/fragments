import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface BreadcrumbProjectProps {
  className?: string
}

export const BreadcrumbFragment: FC<BreadcrumbProjectProps> = ({ className }) => {
  return <div className={cn(styles.root, className)}>name</div>
}
