import React, { createContext, FC, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ProjectTreeItem } from '../widgets/ProjectTreeItem'
import { useProjectTree } from '../hooks/useProjectTree'
import { ProjectTreeSortableItem } from '../widgets/ProjectTreeSortableItem'
import { Spinner } from '@/shared/ui/Spinner'

interface ProjectTreeProps {
  className?: string
  onClick?: (item: unknown) => void
}

export const ProjectTreeContext = createContext({
  openedIds: [],
  toggleIsOpen: (id: number, flag?: boolean) => undefined
})

export const ProjectTree: FC<ProjectTreeProps> = ({ className, onClick }) => {
  const { list, fetching, openedIds, toggleIsOpen } = useProjectTree()
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
            <ProjectTreeItem id={item.id} type={item.type} onClick={() => onClick(item)} />
          </ProjectTreeSortableItem>
        ))}

        {/*<DragOverlay dropAnimation={null}>*/}
        {/*  {draggableItem ? (*/}
        {/*    <ProjectTreeSortableItem*/}
        {/*      id={draggableItem.id}*/}
        {/*      type={draggableItem.type}*/}
        {/*      deepIndex={draggableItem.deepIndex}*/}
        {/*    >*/}
        {/*      /!*<ProjectTreeItem*!/*/}
        {/*      /!*  name={draggableItem?.name}*!/*/}
        {/*      /!*  type={draggableItem?.type}*!/*/}
        {/*      /!*  selected={draggableItem?.selected}*!/*/}
        {/*      /!*  isLoading={draggableItem?.isLoading}*!/*/}
        {/*      /!*  isOpen={!draggableItem.collapsed}*!/*/}
        {/*      /!*  hasChildren={draggableItem.children.length > 0}*!/*/}
        {/*      /!*  hasActions={false}*!/*/}
        {/*      /*/
        /*/}
        {/*    </ProjectTreeSortableItem>*/}
        {/*  ) : null}*/}
        {/*</DragOverlay>*/}
      </div>
    </ProjectTreeContext>
  )
}
