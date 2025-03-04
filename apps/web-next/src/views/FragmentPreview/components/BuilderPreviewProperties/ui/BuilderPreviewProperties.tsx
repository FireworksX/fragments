import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface BuilderPreviewPropertiesProps {
  className?: string
}

export const BuilderPreviewProperties: FC<BuilderPreviewPropertiesProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.title}>Properties</div>
      <div className={styles.list}>
        <div>dff</div>
        <div>dff</div>
        <div>dff</div>
        <div>dff</div>
        <div>dff</div>
      </div>
    </div>
  )
}
