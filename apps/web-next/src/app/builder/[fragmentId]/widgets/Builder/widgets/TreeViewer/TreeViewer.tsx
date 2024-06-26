import React, { FC } from 'react'
import * as Styled from './styles'
import { useTreeViewer } from './hooks/useTreeViewer'
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useStore } from '@nanostores/react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TreeViewerDrag from './widgets/TreeViewerDrag/TreeViewerDrag'
import TreeViewerCell from './widgets/TreeViewerCell/TreeViewerCell'
import { createPortal } from 'react-dom'
import isBrowser from '@/app/utils/isBrowser'

interface TreeViewerProps {
  rootLayerKey: string[]
  className?: string
}

const TreeViewer: FC<TreeViewerProps> = ({ className, rootLayerKey }) => {
  const { openMap, toggleOpen } = useTreeViewer()
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 3
      }
    })
  )

  const {
    list,
    keys,
    overlayModifiers,
    overlayDropAnimation,
    activeKey,
    overKey,
    activeItem,
    projected,
    handleDragStart,
    handleDragOver,
    handleDragMove,
    handleDragEnd,
    toggleCollapse
  } = useTreeViewer(rootLayerKey)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={keys} strategy={verticalListSortingStrategy}>
        <div className={className}>
          {list.map(cell => (
            <TreeViewerDrag
              key={cell._id}
              layerKey={cell.key}
              depth={cell.key === activeKey && projected ? projected.depth : cell.depth}
              indicator={!!(cell.key === activeKey && projected)}
            >
              <TreeViewerCell
                layerKey={cell.key}
                toggleCollapse={toggleCollapse}
                collapsed={cell.collapsed}
                partialSelection={cell.partialSelection}
                selected={cell.selected}
                nextSelected={cell.nextSelected}
                prevSelected={cell.prevSelected}
                handleClick={cell.handleClick}
              />
            </TreeViewerDrag>
          ))}

          {isBrowser &&
            createPortal(
              <DragOverlay dropAnimation={overlayDropAnimation} modifiers={overlayModifiers}>
                {activeKey && activeItem ? null : null}
              </DragOverlay>,
              document.body
            )}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default TreeViewer
