import { ComponentRef, FC, PropsWithChildren, use, ForwardedRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ProjectTreeSortableItemProps extends PropsWithChildren {
  className?: string
  selected?: boolean
  deepIndex?: number
  indentationWidth?: number
}

export const ProjectTreeSortableItem: FC<ProjectTreeSortableItemProps> = ({
  className,
  deepIndex = 0,
  selected,
  indentationWidth = 20,
  children
}) => {
  return (
    <div
      className={cn(styles.root, className, {
        [styles.selected]: selected
      })}
      data-testid='BuilderLayerSortingCell'
      style={{
        paddingLeft: indentationWidth * deepIndex
      }}
    >
      {children}
    </div>
  )
}
