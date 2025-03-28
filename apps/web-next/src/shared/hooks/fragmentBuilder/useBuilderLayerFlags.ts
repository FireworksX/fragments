import { LinkKey } from '@graph-state/core'
import { definition } from '@fragments/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { removeChildren } from '@fragments/render-core'

export const useBuilderLayerFlags = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  // const layerInfo = useLayerInfo(layerKey)
  const [visible, setVisible, layerInfo] = useLayerValue('visible', layerKey)
  // const [layerMode, setLayerMode] = useLayerValue('layerMode', layerKey)
  // const [layerDirection, setLayerDirection] = useLayerValue('layerDirection', layerKey)

  // const layerInfo = {}
  // const visible = true
  const hasLayout = false //layerMode === defLayerMode?.flex
  const canRemove = false //layerInfo.type === nodes.Breakpoint ? !layerInfo?.isPrimary : true
  const canWrap = false //layerInfo.type !== nodes.Breakpoint
  const canDuplicate = false //layerInfo.type !== nodes.Fragment
  const canRemoveWrapper = false //layerInfo.type === nodes.Frame && layerInfo.layer?.children?.length > 0

  const remove = () => removeChildren(documentManager, layerKey)

  const toggleVisible = () => setVisible(!visible)
  const wrapFrame = () => documentManager.createWrapper(layerKey)
  const removeWrapper = () => documentManager.removeWrapper(layerKey)

  return {
    type: layerInfo._type,
    isVisible: layerInfo._type !== definition.nodes.Fragment ? visible : true,
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
