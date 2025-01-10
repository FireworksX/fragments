import { useGraph } from '@graph-state/react'
import { use, useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useBuilderSelection = () => {
  const { canvasManager } = use(BuilderContext)
  const { documentManager } = useBuilderDocument()

  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const [selectionGraph] = useGraph(documentManager, canvas.focusLayer)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : documentManager.keyOfEntity(field)
    canvasManager.setFocus(inputKey)
  }

  return { selection: canvas.focusLayer, selectionGraph: canvas.focusLayer ? selectionGraph : null, select }
}
