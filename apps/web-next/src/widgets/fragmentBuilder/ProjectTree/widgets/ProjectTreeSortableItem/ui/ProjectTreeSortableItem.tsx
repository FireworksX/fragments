import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useDraggable } from '@dnd-kit/core'
import { FileSystemItemType } from '@/__generated__/graphql'
import { projectItemType } from '@/widgets/fragmentBuilder/ProjectTree/hooks/useProjectTree'
import { draggableTypes } from '@/shared/store/builderStore/plugins/droppablePlugin'

interface ProjectTreeSortableItemProps extends PropsWithChildren {
  id: string
  type: FileSystemItemType
  className?: string
  selected?: boolean
  deepIndex?: number
  indentationWidth?: number
}

export const ProjectTreeSortableItem: FC<ProjectTreeSortableItemProps> = ({
  id,
  type,
  className,
  deepIndex = 0,
  selected,
  indentationWidth = 20,
  children
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    disabled: type !== projectItemType.fragment,
    data: {
      id,
      type: draggableTypes.fragmentProjectItem,
      area: 'projectTree'
    }
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(styles.root, className, {
        [styles.selected]: selected
      })}
      data-testid='BuilderLayerSortingCell'
      style={{
        paddingLeft: indentationWidth * deepIndex
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}
