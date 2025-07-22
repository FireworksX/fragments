import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { isRootLayer } from '@fragmentsx/render-core'
import { useFragmentManager } from '@fragmentsx/render-suite'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

export const useRootLayerAuto = () => {
  const { currentFragmentId: actualFragmentId } = useBuilder()
  const { selection, selectionGraph } = useBuilderSelection()
  const isInstance = selectionGraph?._type === definition.nodes.Instance
  const { documentManager } = useBuilderDocument()
  const currentFragmentId = isInstance ? documentManager.resolve(selection)?.fragment : actualFragmentId
  const { manager } = useFragmentManager(currentFragmentId)

  const fragmentLayer = manager?.resolve(manager?.$fragment?.root)
  const rootLayerLink = fragmentLayer?.children?.find(child => isRootLayer(manager, child))

  const [widthType] = useLayerValue('widthType', rootLayerLink)

  return {
    canCreateBreakpoint: widthType !== definition.sizing.Hug,
    canHugContent: rootLayerLink === selection || isInstance ? fragmentLayer?.children?.length === 1 : true
  }
}
