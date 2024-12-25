import { useGraph } from '@graph-state/react'
import { use, useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'

export const useBuilderSelection = () => {
  const { documentManager, canvasManager } = use(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const [selectionGraph] = useGraph(documentManager, canvas.focusLayer)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : documentManager.keyOfEntity(field)
    canvasManager.setFocus(inputKey)
  }

  return { selection: canvas.focusLayer, selectionGraph: canvas.focusLayer ? selectionGraph : null, select }
}
