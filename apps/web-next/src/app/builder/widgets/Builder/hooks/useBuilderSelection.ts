import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBuilderSelection = () => {
  const { graphState } = useContext(BuilderContext)

  const [documentNode] = useGraph(graphState, graphState.documentNode)
  const selection = documentNode.selection?.[0]
  const [selectionGraph] = useGraph(graphState, selection)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : graphState.keyOfEntity(field)

    if (inputKey !== selection) {
      graphState.resolve(graphState.documentNode).setSelection(field)
    }
  }

  return { selection, selectionGraph, select }
}
