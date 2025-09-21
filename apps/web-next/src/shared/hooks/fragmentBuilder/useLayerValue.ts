import { useLayerValue as useLayerValueLib, UseLayerValueOptions } from '@fragmentsx/render-suite'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { GraphState, LinkKey } from '@graph-state/core'

interface Options extends UseLayerValueOptions {
  manager?: GraphState
}

export const useLayerValue = (fieldKey: string, layerKey?: LinkKey, options?: Options) => {
  const { selection } = useBuilderSelection()
  const { documentManager } = useBuilderDocument()
  const resultManager = options?.manager ?? documentManager

  return useLayerValueLib(layerKey ?? selection, fieldKey, {
    ...options,
    manager: resultManager
  })
}
