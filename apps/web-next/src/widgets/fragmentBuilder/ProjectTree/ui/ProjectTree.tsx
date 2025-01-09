import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ProjectTreeItem } from '../widgets/ProjectTreeItem'
import { useProjectTree } from '@/widgets/fragmentBuilder/ProjectTree/hooks/useProjectTree'
import dynamic from 'next/dynamic'
import { ProjectTreeSortableItem } from '@/widgets/fragmentBuilder/ProjectTree/widgets/ProjectTreeSortableItem'

interface ProjectTreeProps {
  className?: string
}

const SortableTree = dynamic(() => import('dnd-kit-sortable-tree').then(m => m.SortableTree), { ssr: false })

const TreeItem = props => {
  return (
    <ProjectTreeSortableItem {...props} selected={props?.item?.selected}>
      <ProjectTreeItem
        ref={props?.item?.ref}
        name={props?.item?.name}
        type={props?.item?.type}
        selected={props?.item?.selected}
        isOpen={!props?.collapsed}
        hasChildren={props?.childCount > 0}
        onCollapse={props?.onCollapse}
        onCreateFolder={props?.item?.onCreateFolder}
        onCreateFragment={props?.item?.onCreateFragment}
        onSelectItem={props?.item?.onSelectItem}
        onOpenItem={props?.item?.onOpenItem}
      />
    </ProjectTreeSortableItem>
  )
}

export const ProjectTree: FC<ProjectTreeProps> = ({ className }) => {
  const { items, handleChangeItems } = useProjectTree()

  return (
    <div className={cn(styles.root, className)} data-testid='ProjectTree'>
      <SortableTree
        sortableProps={{ animateLayoutChanges: () => false }}
        dropAnimation={null}
        indicator={false}
        pointerSensorOptions={{
          activationConstraint: {
            tolerance: 5,
            delay: 250
          }
        }}
        items={items}
        onItemsChanged={(items, reason) => {
          handleChangeItems(items, reason)
        }}
        TreeItemComponent={TreeItem}
      />
    </div>
  )
}
