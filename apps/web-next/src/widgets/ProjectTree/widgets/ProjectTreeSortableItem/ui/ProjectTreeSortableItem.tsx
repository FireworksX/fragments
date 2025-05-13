import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useDraggable } from '@dnd-kit/core'
import { FileSystemItemType } from '@/__generated__/graphql'
import { projectItemType } from '../../../hooks/useProjectTree'
import { useSearchParam } from '@/shared/hooks/useSearchParams'
import { BUILDER_NODE_KEY } from '@/shared/ui/Link/lib/linkConfig'
import { draggableAreas, draggableNodes } from '@/shared/data'

interface ProjectTreeSortableItemProps extends PropsWithChildren {
  id: string
  type: FileSystemItemType
  className?: string
  selected?: boolean
  deepIndex?: number
  indentationWidth?: number
  ghost?: boolean
}

export const ProjectTreeSortableItem: FC<ProjectTreeSortableItemProps> = ({
  id,
  type,
  className,
  deepIndex = 0,
  indentationWidth = 20,
  children,
  ghost
}) => {
  const [{ [BUILDER_NODE_KEY]: currentFragment }] = useSearchParam([BUILDER_NODE_KEY])
  const isActive = type === projectItemType.fragment && currentFragment == id
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    disabled: type !== projectItemType.fragment,
    data: {
      id,
      type: draggableNodes.fragmentProjectItem,
      area: draggableAreas.projectTree
    }
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(styles.root, className, {
        [styles.selected]: isActive,
        [styles.ghost]: ghost
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
