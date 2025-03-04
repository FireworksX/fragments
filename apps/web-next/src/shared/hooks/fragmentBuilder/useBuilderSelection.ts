import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { isRootLayer } from '@fragments/renderer-editor'
import { useEffect } from 'react'

export const useBuilderSelection = a => {
  const { documentManager } = useBuilderDocument()
  const { canvas, manager: canvasManager } = useBuilderCanvas()
  const selectionLayerKey = canvas.focusLayer
  const selectionGraph = documentManager.resolve(selectionLayerKey)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : documentManager.keyOfEntity(field)
    canvasManager.setFocus(inputKey)
  }

  return {
    selection: selectionLayerKey,
    selectionGraph: selectionLayerKey ? selectionGraph : null,
    isBreakpoint: selectionGraph?.isBreakpoint,
    isRootLayer: isRootLayer(documentManager, selectionLayerKey),
    select
  }
}
