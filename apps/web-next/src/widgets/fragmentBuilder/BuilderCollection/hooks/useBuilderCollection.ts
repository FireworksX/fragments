import { definition } from '@fragmentsx/definition'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useGraphStack } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useBuilderCollection = () => {
  const { documentManager } = useBuilderDocument()
  const [source, setSource] = useLayerValue('source')
  const { properties } = useFragmentProperties()
  const propertiesGraphs = useGraphStack(documentManager, properties)
  const sources = (propertiesGraphs ?? [])?.filter(graph => graph?.type === definition.variableType.Array)

  return {
    source: {
      sources,
      value: source,
      onChange: setSource
    }
  }
}
