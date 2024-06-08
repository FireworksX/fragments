import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface TemplateNameProps {
  className?: string
}

export const TemplateName: FC<TemplateNameProps> = ({ className }) => (
  <div className={cn(styles.root, className)} data-testid='TemplateName'>
    <h1>TemplateName component</h1>
  </div>
)
