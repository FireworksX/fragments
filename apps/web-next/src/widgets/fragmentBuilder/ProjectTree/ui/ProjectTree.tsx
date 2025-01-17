import React, { FC, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ProjectTreeItem } from '../widgets/ProjectTreeItem'
import { useProjectTree } from '@/widgets/fragmentBuilder/ProjectTree/hooks/useProjectTree'
import dynamic from 'next/dynamic'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { ProjectTreeSortableItem } from '@/widgets/fragmentBuilder/ProjectTree/widgets/ProjectTreeSortableItem'

interface ProjectTreeProps {
  className?: string
}

export const ProjectTree: FC<ProjectTreeProps> = ({ className }) => {
  const { list, handleChangeItems } = useProjectTree()
  const treeRef = useRef(null)

  return (
    <div className={cn(styles.root, className)} ref={treeRef} data-testid='ProjectTree'>
      {list.map(item => (
        <ProjectTreeSortableItem key={item.id} deepIndex={item.deepIndex} selected={item.selected}>
          <ProjectTreeItem
            name={item?.name}
            type={item?.type}
            selected={item?.selected}
            isLoading={item?.isLoading}
            isOpen={!item.collapsed}
            hasChildren={item.children.length > 0}
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
    </div>
  )
}
