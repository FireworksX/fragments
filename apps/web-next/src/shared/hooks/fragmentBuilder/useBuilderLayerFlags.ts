import { LinkKey } from '@graph-state/core'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { removeChildren } from '@fragmentsx/render-core'

export const useBuilderLayerFlags = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const layerInfo = useLayerInfo(layerKey)
  const [visible, setVisible] = useLayerValue('visible', layerKey)
  const [layerMode, setLayerMode] = useLayerValue('layerMode', layerKey)
  // const [layerDirection, setLayerDirection] = useLayerValue('layerDirection', layerKey)

  // const layerInfo = {}
  // const visible = true
  const hasLayout = layerMode === definition.layerMode?.flex
  const canRemove = !layerInfo.isBreakpoint ? !layerInfo?.isPrimary : true
  const canWrap = layerInfo.type !== definition.nodes.Breakpoint
  const canDuplicate = layerInfo.type !== definition.nodes.Fragment
  const canRemoveWrapper = layerInfo.type === definition.nodes.Frame && layerInfo.layer?.children?.length > 0

  const remove = () => removeChildren(documentManager, layerKey)

  const toggleVisible = () => setVisible(!visible)
  const wrapFrame = () => documentManager.createWrapper(layerKey)
  const removeWrapper = () => documentManager.removeWrapper(layerKey)

  return {
    type: layerInfo.type,
    isVisible: layerInfo.type !== definition.nodes.Fragment ? visible : true,
    layerDirection: '',
    layerMode: '',
    hasLayout,
    canRemove,
    remove,
    toggleVisible,
    wrapFrame,
    canWrap,
    removeWrapper,
    canRemoveWrapper,
    canDuplicate
  }
}
