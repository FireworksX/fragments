import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useGraph } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useLayerValue = (fieldKey: string) => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [layerData, updateLayerData] = useGraph(documentManager, selection)

  return [layerData?.[fieldKey], value => updateLayerData({ [fieldKey]: value })]
}
