import React, { FC, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ProjectTreeItem } from '../widgets/ProjectTreeItem'
import { useProjectTree } from '@/widgets/fragmentBuilder/ProjectTree/hooks/useProjectTree'
import { ProjectTreeSortableItem } from '@/widgets/fragmentBuilder/ProjectTree/widgets/ProjectTreeSortableItem'
import { DragOverlay } from '@dnd-kit/core'
import { Spinner } from '@/shared/ui/Spinner'

interface ProjectTreeProps {
  className?: string
}

export const ProjectTree: FC<ProjectTreeProps> = ({ className }) => {
  const { list, draggableItem, fetching } = useProjectTree()
  const treeRef = useRef(null)

  return (
    <div className={cn(styles.root, className)} ref={treeRef} data-testid='ProjectTree'>
      {fetching && (
        <div className={styles.spinner}>
          <Spinner size={16} color='var(--secondary)' />
        </div>
      )}
      {list.map(item => (
        <ProjectTreeSortableItem
          key={`${item.id}_${item.type}`}
          id={item.id}
          type={item.type}
          deepIndex={item.deepIndex}
          selected={item.selected}
        >
          <ProjectTreeItem
            name={item?.name}
            type={item?.type}
            selected={item?.selected}
            isLoading={item?.isLoading}
            isOpen={!item.collapsed}
            hasChildren={item.hasChildren}
            onCollapse={item.onCollapse}
            onCreateFolder={item?.onCreateFolder}
            onCreateFragment={item?.onCreateFragment}
            onSelectItem={item?.onSelectItem}
            onOpenItem={item?.onOpenItem}
            onRename={item?.onRename}
            onDelete={item?.onDelete}
          />
        </ProjectTreeSortableItem>
      ))}

      <DragOverlay dropAnimation={null}>
        {draggableItem ? (
          <ProjectTreeSortableItem id={draggableItem.id} type={draggableItem.type} deepIndex={draggableItem.deepIndex}>
            <ProjectTreeItem
              name={draggableItem?.name}
              type={draggableItem?.type}
              selected={draggableItem?.selected}
              isLoading={draggableItem?.isLoading}
              isOpen={!draggableItem.collapsed}
              hasChildren={draggableItem.children.length > 0}
              hasActions={false}
            />
          </ProjectTreeSortableItem>
        ) : null}
      </DragOverlay>
    </div>
  )
}
