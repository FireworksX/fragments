import { useGraph } from '@graph-state/react'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'

export const useBuilderSelection = () => {
  const { documentManager } = useContext(BuilderContext)
  const { focus, updateParams } = useBuilderManager()
  const [selectionGraph] = useGraph(documentManager, focus)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : documentManager.keyOfEntity(field)
    updateParams({ focus: inputKey })
  }

  return { selection: focus, selectionGraph, select }
}
