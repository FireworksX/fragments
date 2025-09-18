import React, { createContext, FC, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ProjectTreeItem } from '../widgets/ProjectTreeItem'
import { projectItemType, useProjectTree } from '../hooks/useProjectTree'
import { ProjectTreeSortableItem } from '../widgets/ProjectTreeSortableItem'
import { Spinner } from '@/shared/ui/Spinner'
import { DragOverlay } from '@dnd-kit/core'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { modalNames } from '@/shared/data'
import { CreateNewFragment } from '@/widgets/modals/CreateNewFragment'

export interface ProjectTreeItem {
  id: number
  type: keyof typeof projectItemType
}

interface ProjectTreeProps {
  className?: string
  draggable?: boolean
  onClick?: (item: ProjectTreeItem) => void
}

export const ProjectTreeContext = createContext({
  openedIds: [],
  toggleIsOpen: (id: number, flag?: boolean) => undefined
})

const ProjectTreeInternal: FC<ProjectTreeProps> = ({ className, draggable, onClick }) => {
  const { list, draggableItem, fetching, openedIds, toggleIsOpen } = useProjectTree()
  const treeRef = useRef(null)

  return (
    <ProjectTreeContext value={{ openedIds, toggleIsOpen }}>
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
          >
            <ProjectTreeItem id={item.id} type={item.type} parentId={item.parentId} onClick={() => onClick(item)} />
          </ProjectTreeSortableItem>
        ))}

        <DragOverlay dropAnimation={null}>
          {draggableItem ? (
            <ProjectTreeSortableItem
              id={draggableItem.id}
              type={draggableItem.type}
              deepIndex={draggableItem.deepIndex}
              ghost
            >
              <ProjectTreeItem id={draggableItem.id} type={draggableItem?.type} />
            </ProjectTreeSortableItem>
          ) : null}
        </DragOverlay>
      </div>
    </ProjectTreeContext>
  )
}

export const ProjectTree = withModalCollector(ProjectTreeInternal, {
  [modalNames.createFragment]: <CreateNewFragment />
})
