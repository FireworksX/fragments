import { useGraph } from '@graph-state/react'
import { builderStore } from '@/app/stories/builder.store'

export const useBuilderSelection = () => {
  const [{ selection }] = useGraph(builderStore, builderStore.builderLink)
  const firstLink = selection[0]
  const [selectionGraph] = useGraph(builderStore, firstLink)

  const select = (field: any) => {
    const inputKey = typeof field === 'string' ? field : builderStore.keyOfEntity(field)
    builderStore.setSelection(inputKey)
  }

  return { selection: firstLink, selectionGraph, select }
}
