import { useGraph } from '@graph-state/react'
import { use, useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'

export const useBuilderSelection = () => {
  const { documentManager } = useBuilderDocument()
  const { canvas, manager: canvasManager } = useBuilderCanvas()

  const [selectionGraph] = useGraph(documentManager, canvas.focusLayer)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : documentManager.keyOfEntity(field)
    canvasManager.setFocus(inputKey)
  }

  return { selection: canvas.focusLayer, selectionGraph: canvas.focusLayer ? selectionGraph : null, select }
}
