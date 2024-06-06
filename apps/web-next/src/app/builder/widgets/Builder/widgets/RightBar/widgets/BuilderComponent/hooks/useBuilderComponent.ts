import { useBuilderAssetsComponents } from '@/app/builder/widgets/Builder/widgets/Assets/hooks/useBuilderAssetsComponents'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useGraph, useGraphStack } from '@graph-state/react'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

export const useBuilderComponent = () => {
  const { graphState } = useContext(BuilderContext)
  const { open } = useBuilderAssetsComponents()
  const { selection, selectionGraph } = useBuilderSelection()
  const [mainComponent] = useGraph(graphState, graphState.getKey(selectionGraph?.mainComponent))
  const variantsValues = useGraphStack(graphState, mainComponent?.children ?? [])
  // const layerInvoker = useLayerInvoker(selection)

  return {
    selectionGraph,
    label: mainComponent?.name,
    handleEdit: () => open(graphState.keyOfEntity(mainComponent)),
    variants: {
      list: variantsValues,
      value: selectionGraph?.variant,
      onChange: (variantKey: EntityKey) => {
        selectionGraph.setVariant(variantKey)
        // statex.mutate({ ...componentValue, variant })
      }
    }
  }
}
