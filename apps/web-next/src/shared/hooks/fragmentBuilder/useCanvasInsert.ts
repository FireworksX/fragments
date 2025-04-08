import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraphEffect } from '@graph-state/react'
import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'
import { useBuilderDocumentMethods } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentMethods'
import { useDndMonitor } from '@dnd-kit/core'
import { DragEndEvent } from '@dnd-kit/core/dist/types/events'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import { draggableNodes, droppableAreas } from '@/shared/data'

export const useCanvasInsert = () => {
  const { builderManager } = use(BuilderContext)
  const { createInstance } = useBuilderCreator()

  useDndMonitor({
    onDragEnd(event: DragEndEvent) {
      if (
        event?.over?.data?.current?.area === droppableAreas.builderCanvasNode &&
        event?.active?.data?.current?.type === draggableNodes.fragmentProjectItem
      ) {
        const layerKey = event?.over?.data?.current?.layerKey
        const fragmentId = event?.active?.data?.current?.id
        createInstance(layerKey, { fragment: +fragmentId })
      }
    }
  })
}
