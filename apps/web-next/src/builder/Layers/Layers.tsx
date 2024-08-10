import React, { FC, useContext, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SortableTree } from 'dnd-kit-sortable-tree'
import { BuilderLayerCell } from '@/builder/Layers/components/BuilderLayerCell/BuilderLayerCell'
import { useBuilderLayers } from '@/builder/Layers/hooks/useBuilderLayers'
import { BuilderLayerSortingCell } from '@/builder/Layers/components/BuilderLayerSortingCell/BuilderLayerSortingCell'

interface BuilderLayersProps {
  className?: string
}

const Layers: FC<BuilderLayersProps> = ({ className }) => {
  const { items, handleChangeItems } = useBuilderLayers()

  return (
    <div className={cn(styles.root, className)}>
      <SortableTree
        sortableProps={{ animateLayoutChanges: () => false }}
        dropAnimation={null}
        indicator={false}
        items={items}
        onItemsChanged={(items, reason) => {
          handleChangeItems(items, reason)
        }}
        TreeItemComponent={React.forwardRef((props, ref) => (
          <BuilderLayerSortingCell {...props} ref={ref}>
            <BuilderLayerCell
              layerKey={props.item.id}
              collapsed={props.collapsed}
              isLast={props.isLast}
              onCollapse={props.onCollapse}
            />
          </BuilderLayerSortingCell>
        ))}
      />
    </div>
  )
}

export default Layers
