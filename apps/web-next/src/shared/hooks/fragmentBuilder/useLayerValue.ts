import { useLayerValue as useLayerValueLib, UseLayerValueOptions } from '@fragmentsx/render-suite'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { LinkKey } from '@graph-state/core'

export const useLayerValue = (fieldKey: string, layerKey?: LinkKey, options?: UseLayerValueOptions) => {
  const { selection } = useBuilderSelection()
  const { documentManager } = useBuilderDocument()

  return useLayerValueLib(layerKey ?? selection, fieldKey, documentManager, options)
}
