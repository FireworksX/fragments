import { use, useCallback, useEffect } from 'react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { isRootLayer } from '@fragmentsx/render-core'
import { pick } from '@fragmentsx/utils'
import { useGraphEffect } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useUpdateEffect } from 'react-use'

export const useBuilderSelection = () => {
  const { documentManager } = useBuilderDocument()
  const { canvas, manager: canvasManager } = useBuilderCanvas(data => pick(data, 'focusLayer'))
  const selectionLayerKey = canvas.focusLayer
  const selectionGraph = documentManager?.resolve(selectionLayerKey)

  const select = useCallback(
    (field: any) => {
      const inputKey = typeof field === 'string' ? field : documentManager?.keyOfEntity(field)
      canvasManager.setFocus(inputKey)
    },
    [canvasManager, documentManager]
  )

  useUpdateEffect(() => {
    if (!selectionGraph) {
      select(null)
    }
  }, [selectionGraph])

  return {
    selection: selectionLayerKey,
    selectionGraph: selectionLayerKey ? selectionGraph : null,
    isBreakpoint: selectionGraph?.isBreakpoint,
    isRootLayer: isRootLayer(documentManager, selectionLayerKey),
    select
  }
}
