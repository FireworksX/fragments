import { useGraph } from '@graph-state/react'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

export const useBuilderSelection = () => {
  const { graphState } = useContext(BuilderContext)
  const [{ selection }] = useGraph(graphState)
  const firstLink = selection[0]
  const [selectionGraph] = useGraph(graphState, firstLink)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : graphState.keyOfEntity(field)
    graphState.setSelection(inputKey)
  }

  return { selection: firstLink, selectionGraph, select }
}
