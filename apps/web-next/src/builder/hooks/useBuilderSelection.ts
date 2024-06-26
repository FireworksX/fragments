import { useGraph } from '@graph-state/react'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'

export const useBuilderSelection = () => {
  const { documentManager } = useContext(BuilderContext)
  const { focus, setFocusNode } = useBuilderManager()
  const [selectionGraph] = useGraph(documentManager, focus)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : documentManager.keyOfEntity(field)
    setFocusNode(inputKey)
  }

  return { selection: focus, selectionGraph, select }
}
