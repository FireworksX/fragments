import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'

interface ProjectCardCreatePlaceholderProps {
  className?: string
  onClick?: () => void
}

export const ProjectCardCreatePlaceholder: FC<ProjectCardCreatePlaceholderProps> = ({ className, onClick }) => (
  <Touchable
    TagName='button'
    className={cn(styles.root, className)}
    data-testid='ProjectCardCreatePlaceholder'
    onClick={() => onClick?.()}
  >
    Create New Project
  </Touchable>
)
