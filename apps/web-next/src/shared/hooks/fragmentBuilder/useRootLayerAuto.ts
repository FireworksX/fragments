import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { isRootLayer } from '@fragmentsx/render-core'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useRootLayerAuto = () => {
  const { selection } = useBuilderSelection()
  const { documentManager } = useBuilderDocument()
  const fragmentLayer = documentManager?.resolve(documentManager?.$fragment?.root)
  const rootLayerLink = fragmentLayer?.children?.find(child => isRootLayer(documentManager, child))

  const [widthType] = useLayerValue('widthType', rootLayerLink)

  return {
    canCreateBreakpoint: widthType !== definition.sizing.Hug,
    canHugContent: rootLayerLink === selection ? fragmentLayer?.children?.length === 1 : true
  }
}
