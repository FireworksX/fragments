import React, { FC, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderLayerCell } from '@/builder/views/BuilderEditable/widgets/BuilderLayers/components/BuilderLayerCell/BuilderLayerCell'
import { useBuilderLayers } from '@/builder/views/BuilderEditable/widgets/BuilderLayers/hooks/useBuilderLayers'
import { BuilderLayerSortingCell } from '@/builder/views/BuilderEditable/widgets/BuilderLayers/components/BuilderLayerSortingCell/BuilderLayerSortingCell'
import dynamic from 'next/dynamic'

interface BuilderLayersProps {
  className?: string
}

const LayerComponent = React.forwardRef((props, ref) => {
  return (
    <BuilderLayerSortingCell {...props} ref={ref}>
      <BuilderLayerCell
        layerKey={props.item.id}
        collapsed={props.collapsed}
        isLast={props.isLast}
        onCollapse={props.onCollapse}
      />
    </BuilderLayerSortingCell>
  )
})

const SortableTree = dynamic(() => import('dnd-kit-sortable-tree').then(m => m.SortableTree), { ssr: false })

const BuilderLayers: FC<BuilderLayersProps> = ({ className }) => {
  const { items, handleChangeItems } = useBuilderLayers()

  return (
    <div className={cn(styles.root, className)}>
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
        TreeItemComponent={LayerComponent}
      />
    </div>
  )
}

export default BuilderLayers
